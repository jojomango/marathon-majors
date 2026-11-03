# usage: osmmatch.py name   (reads tracks_all.json[name], writes osm_<name>.json)
# Rebuilds a course purely from OpenStreetMap road geometry: fetch roads within
# 60 m of a reference track, snap reference points to the road graph, and join
# them with shortest paths.
import json, sys, math, heapq, urllib.request, urllib.parse, os
def hav(a, b):
    R = 6371.0088
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(h))
name = sys.argv[1]
ref0 = json.load(open('tracks_all.json'))[name]
# densify: long straight segments in the reference would otherwise cut corners
ref = [ref0[0]]
for a, b in zip(ref0, ref0[1:]):
    n = max(1, int(hav(a, b) / 0.04))
    for k in range(1, n + 1):
        ref.append((a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n))
# reference points every 150 m
pts = [ref[0]]; acc = 0
for i in range(1, len(ref)):
    acc += hav(ref[i-1], ref[i])
    if acc >= 0.15: pts.append(ref[i]); acc = 0
pts.append(ref[-1])
cache = f'osm/match_{name}.json'
if not os.path.exists(cache):
    thin = pts
    poly = ','.join(f'{p[0]:.5f},{p[1]:.5f}' for p in thin)
    q = f'[out:json][timeout:180];way["highway"]["highway"!~"footway|cycleway|steps|path|bridleway|track|proposed|construction|platform|corridor"](around:80,{poly});out geom;'
    for url in ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter']:
        try:
            raw = urllib.request.urlopen(urllib.request.Request(url, data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': 'majors-site-research/1.0'}), timeout=240).read()
            json.loads(raw); open(cache, 'wb').write(raw); break
        except Exception as e:
            print('overpass fail', url, e)
els = json.load(open(cache))['elements']
G = {}
def key(p): return (round(p[0], 7), round(p[1], 7))
for w in els:
    g = [key((x['lat'], x['lon'])) for x in w['geometry']]
    for a, b in zip(g, g[1:]):
        d = hav(a, b); G.setdefault(a, {})[b] = d; G.setdefault(b, {})[a] = d
nodes = list(G)
cell = {}
for n in nodes: cell.setdefault((int(n[0] * 1000), int(n[1] * 1000)), []).append(n)
for n in nodes:  # bridge tiny gaps
    if len(G[n]) != 1: continue
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            for m in cell.get((int(n[0]*1000)+dx, int(n[1]*1000)+dy), []):
                if m != n and hav(n, m) < 0.025: G[n][m] = G[m][n] = hav(n, m)
def nearest(p):
    best = None; bd = 9
    cx, cy = int(p[0]*1000), int(p[1]*1000)
    for r in (1, 2, 3):
        for dx in range(-r, r+1):
            for dy in range(-r, r+1):
                for m in cell.get((cx+dx, cy+dy), []):
                    d = hav(m, p)
                    if d < bd: bd, best = d, m
        if best: return best, bd
    return None, 9
def sp(s, t, limit):
    dist = {s: 0}; prev = {}; pq = [(0, s)]
    while pq:
        d, u = heapq.heappop(pq)
        if u == t: break
        if d > dist[u] or d > limit: continue
        for v, w in G[u].items():
            nd = d + w
            if nd < dist.get(v, 1e9): dist[v] = nd; prev[v] = u; heapq.heappush(pq, (nd, v))
    if t not in dist: return None, None
    p = [t]
    while p[-1] != s: p.append(prev[p[-1]])
    return p[::-1], dist[t]
snaps = [nearest(p) for p in pts]
track = []; skipped = 0; jumps = []; streak = 0
j0 = next(i for i, s_ in enumerate(snaps) if s_[0] is not None and s_[1] <= 0.06)
cur = snaps[j0][0]; track.append(cur)
j = j0 + 1
while j < len(snaps):
    tgt, off = snaps[j]
    if tgt is None or off > 0.06:
        if os.environ.get('DBG'): print('  nosnap', j, pts[j], round(off*1000) if tgt else None)
        j += 1; skipped += 1; continue
    straight = hav(cur, tgt)
    path, d = sp(cur, tgt, max(0.6, straight * 2.5))
    if path is None or d > straight * 2.5 + 0.1:
        streak += 1
        if os.environ.get('DBG'): print('  nopath', j, pts[j], 'straight', round(straight,3), 'd', d and round(d,3))
        if streak >= 4:   # stuck: jump straight to this point and carry on
            jumps.append((round(straight, 3), tgt)); track.append(tgt); cur = tgt; streak = 0
        j += 1; skipped += 1; continue
    streak = 0
    track.extend(path[1:]); cur = tgt; j += 1
# remove short loops / spurs (A ... A within 400 m of travel), caused by snapping
# onto the far carriageway or a few metres past a corner
def deloop(t, maxlen=0.4):
    out = []; seen = {}
    cum = [0.0]
    for p in t:
        if p in seen and out:
            i = seen[p]
            if cum[-1] - cum[i] < maxlen:
                for q in out[i+1:]: seen.pop(q, None)
                del out[i+1:]; del cum[i+1:]
                continue
        if out: cum.append(cum[-1] + hav(out[-1], p))
        seen[p] = len(out); out.append(p)
    return out
def despike(t, ratio=0.35):
    # drop points where the path goes out and comes straight back (A->B->A' with A~A')
    changed = True
    while changed:
        changed = False; out = [t[0]]
        for k in range(1, len(t) - 1):
            a, b, c = out[-1], t[k], t[k+1]
            if hav(a, c) < ratio * (hav(a, b) + hav(b, c)) and hav(a, b) < 0.3: changed = True; continue
            out.append(b)
        out.append(t[-1]); t = out
    return t
track = despike(deloop(track))
L = sum(hav(track[k], track[k+1]) for k in range(len(track)-1))
Lr = sum(hav(ref[k], ref[k+1]) for k in range(len(ref)-1))
print('jumps', jumps)
print(f'{name}: ways {len(els)} ref {Lr:.2f} km -> osm {L:.2f} km, points {len(track)}, skipped refs {skipped}/{len(pts)}, end gap {hav(track[-1], ref[-1])*1000:.0f} m')
json.dump(track, open(f'osm_{name}.json', 'w'))
