import json, math, sys
def hav(a, b):
    R = 6371.0088
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(h))
t = json.load(open(sys.argv[1])); w = json.load(open(sys.argv[2]))
cum = [0]
for i in range(1, len(t)): cum.append(cum[-1] + hav(t[i-1], t[i]))
j = 0
for k, p in enumerate(w):
    # first track index after j nearest to waypoint
    best = min(range(j, len(t)), key=lambda i: hav(t[i], p) + (0 if i >= j else 9))
    j = best
    print(k, p, 'km %.2f  mi %.2f' % (cum[best], cum[best] / 1.609344))
