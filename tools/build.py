"""產生 courses.js 的中間資料 courses.json。
需要的本機輸入（未放進 repo）：tracks_all.json（各賽事 OSM 路線）、elev_raw.json（elev.py 的取樣結果）。
流程：boston_osm.py / namedroute.py / osmmatch.py 產生路線 → elev.py 取高度 → build.py 整理。
"""
import json, math, re
def hav(a, b):
    R = 6371.0088
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(h))
T = json.load(open('tracks_all.json')); E = json.load(open('elev_raw.json'))
FULL = 42.195

def dp(pts, tol_km):
    # Douglas-Peucker on local equirectangular projection
    if len(pts) < 3: return pts
    lat0 = math.radians(pts[0][0]); kx = 111.32 * math.cos(lat0); ky = 110.57
    P = [((p[1]) * kx, p[0] * ky) for p in pts]
    keep = [False] * len(pts); keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = P[a]; bx, by = P[b]; dx, dy = bx - ax, by - ay; L2 = dx*dx + dy*dy or 1e-12
        best, bi = 0, -1
        for i in range(a + 1, b):
            t = max(0, min(1, ((P[i][0]-ax)*dx + (P[i][1]-ay)*dy) / L2))
            d = math.hypot(P[i][0] - (ax + t*dx), P[i][1] - (ay + t*dy))
            if d > best: best, bi = d, i
        if best > tol_km: keep[bi] = True; stack += [(a, bi), (bi, b)]
    return [p for p, k in zip(pts, keep) if k]

LM = {
 'tokyo': [(35.6896,139.6917),(35.7020,139.7450),(35.7078,139.7730),(35.6840,139.7740),(35.7106,139.7965),(35.6969,139.7934),(35.6717,139.7993),(35.6717,139.7650),(35.6460,139.7465),(35.6575,139.7483),(35.6740,139.7590),(35.6812,139.7655)],
 'boston': [(42.2297,-71.5182),(42.2793,-71.4162),(42.2935,-71.3060),(42.3240,-71.2560),(42.3445,-71.2470),(42.3375,-71.1735),(42.3389,-71.1685),(42.3420,-71.1215),(42.3489,-71.0955),(42.3486,-71.0868),(42.3498,-71.0786)],
 'london': [(51.4730,0.0034),(51.4826,-0.0096),(51.5055,-0.0754),(51.5097,-0.0600),(51.5054,-0.0235),(51.5081,-0.0759),(51.5100,-0.1040),(51.5007,-0.1246),(51.5014,-0.1419),(51.5027,-0.1385)],
 'sydney': [(-33.8332,151.2080),(-33.8523,151.2108),(-33.8620,151.2030),(-33.8700,151.1960),(-33.8731,151.2111),(-33.8930,151.2210),(-33.9292,151.2347),(-33.9000,151.2330),(-33.8597,151.2228),(-33.8581,151.2143)],
 'berlin': [(52.5152,13.3602),(52.5186,13.3762),(52.5219,13.4132),(52.4990,13.4180),(52.4850,13.3440),(52.4650,13.3060),(52.5050,13.3350),(52.5096,13.3760),(52.5137,13.3927),(52.5163,13.3777),(52.5160,13.3725)],
 'chicago': [(41.8800,-87.6203),(41.8820,-87.6295),(41.9216,-87.6355),(41.9512,-87.6470),(41.9107,-87.6386),(41.8790,-87.6475),(41.8807,-87.6742),(41.8577,-87.6560),(41.8530,-87.6320),(41.8320,-87.6230),(41.8674,-87.6220),(41.8701,-87.6203)],
 'nyc': [(40.6066,-74.0447),(40.6300,-74.0230),(40.6750,-73.9840),(40.7080,-73.9580),(40.7400,-73.9530),(40.7570,-73.9590),(40.7650,-73.9580),(40.8040,-73.9300),(40.8130,-73.9340),(40.7840,-73.9580),(40.7700,-73.9720),(40.7680,-73.9819),(40.7722,-73.9777)],
}
SRC = {
 'tokyo': ('trace', '依東京馬拉松官方路線圖（2026），沿 OpenStreetMap 街道重建', '日本國土地理院 1 m 雷射測量地形'),
 'boston': ('osm', 'OpenStreetMap 標註的 Boston Marathon 賽道（對照 B.A.A. 2026 官方路線圖）', 'USGS 3DEP 10 m 數值地形'),
 'london': ('trace', '依倫敦馬拉松官方路線，沿 OpenStreetMap 道路重建', 'Copernicus EU-DEM 25 m 數值地形'),
 'sydney': ('trace', '依雪梨馬拉松官方路線（2026），沿 OpenStreetMap 道路重建', 'NASA SRTM 30 m 數值地形'),
 'berlin': ('trace', '依柏林馬拉松官方路線（2026），沿 OpenStreetMap 道路重建', 'Copernicus EU-DEM 25 m 數值地形'),
 'chicago': ('trace', '依芝加哥馬拉松官方路線圖（2026），沿 OpenStreetMap 街道重建', 'USGS 3DEP 10 m 數值地形'),
 'nyc': ('trace', '依紐約市馬拉松官方路線（2026），沿 OpenStreetMap 道路重建', 'USGS 3DEP 10 m 數值地形'),
}
out = {}
for k, t in T.items():
    cum = [0]
    for i in range(1, len(t)): cum.append(cum[-1] + hav(t[i-1], t[i]))
    L = cum[-1]; s = FULL / L
    pts = [(t[i][0], t[i][1], cum[i] * s) for i in range(len(t))]
    simp = dp(pts, 0.006)
    route = [[round(p[0], 5), round(p[1], 5), round(p[2], 3)] for p in simp]
    # elevation
    e = E[k]; raw = [(p[2] * FULL / e['len'], v) for p, v in zip(e['pts'], e['ele'])]
    # resample to 0.1 km grid, then smooth (median 3 + mean 5 = ~0.5 km window)
    grid = []; j = 0
    for n in range(0, 423):
        x = min(n * 0.1, FULL)
        while j < len(raw) - 2 and raw[j+1][0] < x: j += 1
        a, b = raw[j], raw[j+1]; f = max(0, min(1, (x - a[0]) / ((b[0] - a[0]) or 1)))
        grid.append(a[1] + (b[1] - a[1]) * f)
    med = [sorted(grid[max(0, i-1):i+2])[len(grid[max(0, i-1):i+2]) // 2] for i in range(len(grid))]
    W = 5 if k in ('london', 'berlin') else 2
    sm = [sum(med[max(0, i-W):i+W+1]) / len(med[max(0, i-W):i+W+1]) for i in range(len(med))]
    elev = [[round(min(i * 0.1, FULL), 2), round(sm[i])] for i in range(0, len(sm), 2)]
    if elev[-1][0] < FULL: elev.append([FULL, round(sm[-1])])
    # landmarks: snap in order, never going backwards along the track
    kms = []; snap = []; lo = 0
    for (la, lo_) in LM[k]:
        ds = [hav(pts[i], (la, lo_)) for i in range(lo, len(pts))]
        m = min(ds)
        # earliest pass that comes within 300 m of the best match, then refine locally
        first = next(i for i, d_ in enumerate(ds) if d_ <= m + 0.3)
        win = range(first, min(len(ds), first + 60))
        bi = lo + min(win, key=lambda i: ds[i]); d = ds[bi - lo]
        kms.append(round(pts[bi][2], 1)); snap.append(round(d * 1000)); lo = bi
    kms[0] = 0.0 if kms[0] < 0.6 else kms[0]
    if kms[-1] > FULL - 0.6: kms[-1] = FULL
    out[k] = {'route': route, 'elevation': elev, 'landmarkKm': kms, 'measured': round(L, 2),
              'source': {'kind': SRC[k][0], 'route': SRC[k][1], 'elevation': SRC[k][2]}}
    print(k, 'pts', len(route), 'measured', round(L, 2), 'kms', kms)
    print('   snap m', snap)
json.dump(out, open('courses.json', 'w'), ensure_ascii=False)
