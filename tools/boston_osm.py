import json, math, heapq, sys
def hav(a, b):
    R = 6371.0088
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(h))
rel = json.load(open(sys.argv[1]))['elements'][0]
G = {}
def key(p): return (round(p[0], 6), round(p[1], 6))
for m in rel['members']:
    if m['type'] != 'way' or not m.get('geometry'): continue
    pts = [key((g['lat'], g['lon'])) for g in m['geometry']]
    for a, b in zip(pts, pts[1:]):
        d = hav(a, b)
        G.setdefault(a, {})[b] = d; G.setdefault(b, {})[a] = d
nodes = list(G)
def nearest(p): return min(nodes, key=lambda n: hav(n, p))
src = nearest((42.2297, -71.5182)); dst = nearest((42.34985, -71.0785))
dist = {src: 0}; prev = {}; pq = [(0, src)]
while pq:
    d, u = heapq.heappop(pq)
    if u == dst: break
    if d > dist[u]: continue
    for v, w in G[u].items():
        nd = d + w
        if nd < dist.get(v, 1e9): dist[v] = nd; prev[v] = u; heapq.heappush(pq, (nd, v))
path = [dst]
while path[-1] != src: path.append(prev[path[-1]])
path.reverse()
print('nodes', len(G), 'path', len(path), 'km %.3f' % dist[dst], src, dst)
json.dump(path, open(sys.argv[2], 'w'))
