# usage: namedroute.py config.json out_track.json
# config: {bbox:[s,w,n,e], names:[substr...], exclude:[substr...], waypoints:[[lat,lon],...]}
import json, sys, math, heapq, urllib.request, urllib.parse, os
def hav(a, b):
    R = 6371.0088
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(h))
cfg = json.load(open(sys.argv[1]))
cache = sys.argv[1] + '.osm.json'
if not os.path.exists(cache):
    s, w, n, e = cfg['bbox']
    rx = '|'.join(cfg['names'])
    q = f'[out:json][timeout:120];way["highway"]["highway"!~"motorway|motorway_link|footway|cycleway|steps|service|path|pedestrian"]["name"~"{rx}"]({s},{w},{n},{e});out geom;'
    req = urllib.request.Request(os.environ.get('OVERPASS','https://overpass-api.de/api/interpreter'), data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': 'majors-site-research/1.0'})
    raw = urllib.request.urlopen(req, timeout=180).read()
    json.loads(raw)
    open(cache, 'wb').write(raw)
els = json.load(open(cache))['elements']
G = {}
def key(p): return (round(p[0], 7), round(p[1], 7))
used = 0
for w_ in els:
    nm = w_['tags'].get('name', '')
    if any(x in nm for x in cfg.get('exclude', [])): continue
    used += 1
    pts = [key((g['lat'], g['lon'])) for g in w_['geometry']]
    for a, b in zip(pts, pts[1:]):
        d = hav(a, b)
        G.setdefault(a, {})[b] = d; G.setdefault(b, {})[a] = d
nodes = list(G)
# bridge small gaps: connect dead-end nodes to any node within GAP metres
GAP = cfg.get('gap_m', 40) / 1000
cell = {}
for n_ in nodes: cell.setdefault((int(n_[0] * 500), int(n_[1] * 500)), []).append(n_)
added = 0
for n_ in nodes:
    if len(G[n_]) != 1: continue
    cx, cy = int(n_[0] * 500), int(n_[1] * 500)
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            for m_ in cell.get((cx + dx, cy + dy), []):
                if m_ != n_ and m_ not in G[n_]:
                    d = hav(n_, m_)
                    if d < GAP: G[n_][m_] = d; G[m_][n_] = d; added += 1
print('gap links', added)
def nearest(p): return min(nodes, key=lambda n: hav(n, p))
def sp(src, dst):
    dist = {src: 0}; prev = {}; pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if u == dst: break
        if d > dist[u]: continue
        for v, w in G[u].items():
            nd = d + w
            if nd < dist.get(v, 1e9): dist[v] = nd; prev[v] = u; heapq.heappush(pq, (nd, v))
    if dst not in dist: return None, None
    p = [dst]
    while p[-1] != src: p.append(prev[p[-1]])
    return p[::-1], dist[dst]
track = []; tot = 0; legs = []
snaps = [nearest(tuple(p)) for p in cfg['waypoints']]
for i, (p, s_) in enumerate(zip(cfg['waypoints'], snaps)):
    off = hav(tuple(p), s_)
    if off > 0.12: print(f'  wp {i} snapped {off*1000:.0f} m away')
for i in range(len(snaps) - 1):
    p, d = sp(snaps[i], snaps[i + 1])
    if p is None:
        import urllib.request as U, time
        a, b = cfg['waypoints'][i], cfg['waypoints'][i + 1]
        u = f'https://routing.openstreetmap.de/routed-foot/route/v1/foot/{a[1]},{a[0]};{b[1]},{b[0]}?overview=full&geometries=geojson'
        r = json.load(U.urlopen(U.Request(u, headers={'User-Agent': 'majors-site-research/1.0'}), timeout=60))['routes'][0]
        p = [(c[1], c[0]) for c in r['geometry']['coordinates']]; d = r['distance'] / 1000
        print(f'  fallback foot route wp {i} -> {i+1}: {d:.2f} km'); time.sleep(1)
    st = hav(snaps[i], snaps[i + 1])
    if d > st * 1.5 + 0.15: print(f'  detour {i}->{i+1}: {d:.2f} km vs straight {st:.2f}')
    tot += d
    legs.append((i, round(d, 2), round(tot, 2)))
    track.extend(p if not track else p[1:])
print('legs', ' '.join(f'{i}:{d}/{t}' for i, d, t in legs))
print(f'ways {used}  km {tot:.3f}  points {len(track)}')
json.dump(track, open(sys.argv[2], 'w'))
