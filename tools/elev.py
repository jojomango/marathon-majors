import json, math, time, urllib.request, os, re
def hav(a, b):
    R = 6371.0088
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(h))
T = json.load(open('tracks_all.json'))
DS = {'boston': 'ned10m', 'chicago': 'ned10m', 'nyc': 'ned10m', 'london': 'eudem25m', 'berlin': 'eudem25m', 'tokyo': 'srtm30m', 'sydney': 'srtm30m'}
STEP = 0.1
def resample(t):
    cum = [0]
    for i in range(1, len(t)): cum.append(cum[-1] + hav(t[i-1], t[i]))
    out = []; j = 0; d = 0
    while d <= cum[-1]:
        while cum[j+1] < d: j += 1
        f = (d - cum[j]) / ((cum[j+1] - cum[j]) or 1)
        out.append((t[j][0] + (t[j+1][0]-t[j][0])*f, t[j][1] + (t[j+1][1]-t[j][1])*f, d))
        d += STEP
    out.append((t[-1][0], t[-1][1], cum[-1]))
    return out, cum[-1]
res = json.load(open('elev_raw.json')) if os.path.exists('elev_raw.json') else {}
for k, t in T.items():
    if k in res: continue
    pts, L = resample(t)
    ele = []
    for s in range(0, len(pts), 100):
        chunk = pts[s:s+100]
        q = '|'.join(f'{p[0]:.6f},{p[1]:.6f}' for p in chunk)
        u = f'https://api.opentopodata.org/v1/{DS[k]}?locations={q}'
        for attempt in range(4):
            try:
                d = json.load(urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'majors-site-research/1.0'}), timeout=60))
                break
            except Exception as e:
                time.sleep(3)
        ele += [r['elevation'] for r in d['results']]
        time.sleep(1.1)
    res[k] = {'pts': pts, 'ele': ele, 'len': L, 'dataset': DS[k]}
    print(k, len(pts), 'min', min(e for e in ele if e is not None), 'max', max(e for e in ele if e is not None), 'none', sum(e is None for e in ele))
    json.dump(res, open('elev_raw.json', 'w'))
