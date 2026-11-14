// 路線與高度圖的幾何計算。建置時（Node）與瀏覽器共用，確保預先產生的標記位置和拖曳時一致。
(function (root) {
  "use strict";
  var FULL = 42.195;
  var VSPAN = 160; // 所有高度圖共用的垂直比例（公尺）
  var MAP = { W: 400, H: 320, pad: 30 };
  var PROF = { W: 440, H: 200, ml: 36, mr: 14, mt: 14, mb: 30 };

  function project(route, W, H, pad) {
    var lat0 = route.reduce(function (s, p) { return s + p[0]; }, 0) / route.length;
    var k = Math.cos(lat0 * Math.PI / 180);
    var xs = route.map(function (p) { return p[1] * k; });
    var ys = route.map(function (p) { return -p[0]; });
    var minx = Math.min.apply(null, xs), maxx = Math.max.apply(null, xs);
    var miny = Math.min.apply(null, ys), maxy = Math.max.apply(null, ys);
    var s = Math.min((W - 2 * pad) / (maxx - minx || 1), (H - 2 * pad) / (maxy - miny || 1));
    var ox = (W - (maxx - minx) * s) / 2, oy = (H - (maxy - miny) * s) / 2;
    return {
      pxPerKm: s / 111.32,
      xy: function (lat, lon) { return [ox + (lon * k - minx) * s, oy + (-lat - miny) * s]; }
    };
  }
  function lerpAt(arr, km, idxKm) {
    for (var i = 0; i < arr.length - 1; i++) {
      var a = arr[i], b = arr[i + 1];
      if (km <= b[idxKm]) {
        var f = (km - a[idxKm]) / ((b[idxKm] - a[idxKm]) || 1);
        f = Math.max(0, Math.min(1, f));
        return a.map(function (v, j) { return v + (b[j] - v) * f; });
      }
    }
    return arr[arr.length - 1].slice();
  }
  function routeAt(r, km) { return lerpAt(r.route, km, 2); }
  function elevAt(r, km) { return lerpAt(r.elevation, km, 0)[1]; }
  function stats(r) {
    var e = r.elevation, gain = 0, loss = 0, hi = -1e9, lo = 1e9;
    for (var i = 0; i < e.length; i++) {
      hi = Math.max(hi, e[i][1]); lo = Math.min(lo, e[i][1]);
      if (i) { var d = e[i][1] - e[i - 1][1]; if (d > 0) gain += d; else loss -= d; }
    }
    return { gain: Math.round(gain), loss: Math.round(loss), hi: hi, lo: lo, start: e[0][1], end: e[e.length - 1][1] };
  }
  function mapProjection(r) { return project(r.route, MAP.W, MAP.H, MAP.pad); }
  function profileScale(r) {
    var st = stats(r), P = PROF;
    var y0 = Math.floor((st.lo - 5) / 20) * 20; if (y0 < 0 && st.lo > -10) y0 = 0;
    var y1 = y0 + Math.max(VSPAN, Math.ceil((st.hi - y0 + 10) / 20) * 20);
    return {
      W: P.W, H: P.H, ml: P.ml, mr: P.mr, mt: P.mt, mb: P.mb, y0: y0, y1: y1,
      X: function (km) { return P.ml + km / FULL * (P.W - P.ml - P.mr); },
      Y: function (m) { return P.mt + (1 - (m - y0) / (y1 - y0)) * (P.H - P.mt - P.mb); }
    };
  }
  // 某公里數的地圖位置、海拔、最近景點
  function stateAt(r, km, proj, scale) {
    km = Math.max(0, Math.min(FULL, km));
    var q = routeAt(r, km), xy = proj.xy(q[0], q[1]);
    var m = elevAt(r, km);
    var best = 0, bd = 1e9;
    r.landmarks.forEach(function (lm, i) { var d = Math.abs(lm.km - km); if (d < bd) { bd = d; best = i; } });
    return { km: km, xy: xy, ele: m, near: best, at: bd < 0.6, px: scale.X(km), py: scale.Y(m) };
  }
  function fmtKm(k) { return k >= FULL - 0.01 ? "42.2" : (Math.round(k * 10) / 10).toFixed(1); }

  var api = { FULL: FULL, VSPAN: VSPAN, MAP: MAP, PROF: PROF, project: project, routeAt: routeAt, elevAt: elevAt,
    stats: stats, mapProjection: mapProjection, profileScale: profileScale, stateAt: stateAt, fmtKm: fmtKm };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.Geo = api;
})(this);

// 真實地圖（MapLibre + OpenFreeMap）：路線、公里標、景點圖示（點開換成圓形照片）、聚合、目前位置。
// 深色模式的底圖不夠清楚，所以不論網站深淺色，地圖一律用淺色底圖與淺色配色。
// 只在有景點照片設定的賽事頁載入。建置時併在 geo.js 之後、app.js 之前。
(function () {
  "use strict";
  var STYLE = "https://tiles.openfreemap.org/styles/positron";

  // 景點類型的線條圖示（24×24）
  var ICONS = {
    building: '<path d="M5 21V6l5-2v17M10 21V9h4v12M14 21V4l5 2v15M3 21h18"/>',
    bridge: '<path d="M2 16h20M4 16c2-5 5-7 8-7s6 2 8 7M7 16v5M17 16v5M12 9v7"/>',
    gate: '<path d="M8 3h8M9 3v2M15 3v2M7 5h10v12a5 5 0 0 1-10 0z M7 11h10M12 22v-1"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
    tower: '<path d="M12 2v3M10 5h4l2 16H8zM9 11h6M8.5 15h7M8 21h8"/>',
    station: '<path d="M3 21V10l9-6 9 6v11M3 21h18M8 21v-6h8v6M12 4v4"/>',
    palace: '<path d="M2 10h20M4.5 10 7 6h10l2.5 4M12 3v3M6 10v9M18 10v9M3 19h18M10 19v-5h4v5"/>',
    river: '<path d="M2 12c4-7 16-7 20 0M2 12h20M6 12v3M12 8.5V15M18 12v3M2 19c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/>',
    slope: '<path d="M3 20h4v-3h4v-3h4v-3h4V8M3 20h18M17 4v4M15.5 6h3"/>',
    market: '<path d="M3 9l2-5h14l2 5M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M5 12v8h14v-8M10 20v-5h4v5"/>',
    sumo: '<path d="M3 11l9-6 9 6M5 11h14M6 11v4M18 11v4M3 19h18M7 19a5 2 0 0 1 10 0"/>',
    shrine: '<path d="M3 5c4 1 14 1 18 0M5 9h14M7 5.6V21M17 5.6V21M12 9V6"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    museum: '<path d="M3 21h18M5 17h14v4H5zM6 17c0-3 1-4 1-6h10c0 2 1 3 1 6M5 11h14M6.5 11c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/>',
    park: '<path d="M12 21v-6M12 15c-4 0-6-2-6-5 0-2.5 1.5-4 3-4.5C9.5 3.5 10.6 3 12 3s2.5.5 3 2.5c1.5.5 3 2 3 4.5 0 3-2 5-6 5zM9 21h6"/>',
    monument: '<path d="M10 21V7l2-4 2 4v14M8 21h8M10 10h4M7 21v-2h10v2"/>',
    flag: '<path d="M5 21V3M5 4h13l-3 4 3 4H5"/>',
    megaphone: '<path d="M3 10v4h3l9 5V5L6 10zM6 14l1.5 5h2.5l-1-4.5M18 9.5a3.5 3.5 0 0 1 0 5"/>',
    sign: '<path d="M4 4h16v10H4zM8 14v7M16 14v7M8 11l4-5 4 5z"/>',
    ship: '<path d="M3 16h18l-2 4H5zM7 16V5M12 16V3M17 16V5M5 8h4M9.5 6h5M15 8h4M5 12h4M9.5 11h5M15 12h4"/>',
    church: '<path d="M12 2v4M10 4h4M8 21V11l4-5 4 5v10M3 21v-7l5-3M21 21v-7l-5-3M2 21h20M11 21v-4h2v4"/>',
    stadium: '<ellipse cx="12" cy="9" rx="9" ry="4"/><path d="M3 9v6c0 2.2 4 4 9 4s9-1.8 9-4V9M7 12.5v4.5M12 13v6M17 12.5v4.5"/>',
    view: '<circle cx="7" cy="15" r="4"/><circle cx="17" cy="15" r="4"/><path d="M11 15h2M5 11.5 7 5h3l1 6M19 11.5 17 5h-3l-1 6"/>',
    fountain: '<path d="M3 17h18M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2M9 17v-3h6v3M12 14V7M12 7c-2-3-5-3-6 0M12 7c2-3 5-3 6 0M12 4v3"/>',
    art: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5S14 15 15.5 15H18a3 3 0 0 0 3-3c0-5-4-9-9-9z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>'
  };
  function svg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.building) + "</svg>";
  }
  // 從地圖容器讀顏色：容器固定使用淺色配色（見 styles.css 的 .live-map）
  function css(el, v) { return getComputedStyle(el).getPropertyValue(v).trim(); }

  // opts: { container, race (route [lat,lon,km], landmarks [{km,name,note,id,lat,lon,icon,img,pos,size}]), imgBase, text, onPick(km) }
  function create(opts) {
    if (!window.maplibregl) return null;
    var ml = window.maplibregl, r = opts.race, T = opts.text || {}, FULL = 42.195;
    var line = r.route.map(function (p) { return [p[1], p[0]]; });
    function at(km) {
      var q = window.Geo.routeAt(r, Math.max(0, Math.min(FULL, km)));
      return [q[1], q[0]];
    }
    // 往返共用同一條路的路段：拆成獨立線段，畫線時各自往行進方向的右側偏移，兩趟才不會疊在一起
    function shared() {
      var R = r.route, kx = 111320 * Math.cos(R[0][0] * Math.PI / 180), ky = 110540;
      function near(p, a, b) {
        var ax = (a[1] - p[1]) * kx, ay = (a[0] - p[0]) * ky, bx = (b[1] - p[1]) * kx, by = (b[0] - p[0]) * ky;
        var dx = bx - ax, dy = by - ay, t = Math.max(0, Math.min(1, -(ax * dx + ay * dy) / (dx * dx + dy * dy || 1)));
        return Math.hypot(ax + t * dx, ay + t * dy) < 25;
      }
      var on = R.map(function (p) {
        for (var j = 0; j < R.length - 1; j++) {
          if (Math.abs(R[j][2] - p[2]) > 0.5 && Math.abs(R[j + 1][2] - p[2]) > 0.5 && near(p, R[j], R[j + 1])) return true;
        }
        return false;
      });
      var feats = [], cur = null;
      for (var i = 0; i < line.length - 1; i++) {
        var o = on[i] && on[i + 1] ? 1 : 0;
        if (!cur || cur.properties.o !== o) {
          cur = { type: "Feature", properties: { o: o }, geometry: { type: "LineString", coordinates: [line[i]] } };
          feats.push(cur);
        }
        cur.geometry.coordinates.push(line[i + 1]);
      }
      return { type: "FeatureCollection", features: feats };
    }
    var bounds = line.reduce(function (b, p) { return b.extend(p); }, new ml.LngLatBounds(line[0], line[0]));
    r.landmarks.forEach(function (lm) { if (lm.lon != null) bounds.extend([lm.lon, lm.lat]); });
    var sw = bounds.getSouthWest(), ne = bounds.getNorthEast();
    // 可拖曳範圍依路線的長邊留白，窄長的路線（如雪梨）才不會因為範圍太窄而被迫放大
    var span = Math.max(ne.lng - sw.lng, ne.lat - sw.lat), padX = span * 1.5, padY = span * 1.5;

    var map = new ml.Map({
      container: opts.container,
      style: STYLE,
      bounds: bounds, fitBoundsOptions: { padding: 48 },
      maxBounds: [[sw.lng - padX, sw.lat - padY], [ne.lng + padX, ne.lat + padY]],
      dragRotate: false, pitchWithRotate: false, touchPitch: false,
      cooperativeGestures: true,
      attributionControl: { compact: true },
      locale: {
        "CooperativeGesturesHandler.WindowsHelpText": T.gestureWin,
        "CooperativeGesturesHandler.MacHelpText": T.gestureMac,
        "CooperativeGesturesHandler.MobileHelpText": T.gestureMobile
      }
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new ml.NavigationControl({ showCompass: false }), "top-right");
    map.once("load", function () { map.setMinZoom(Math.max(0, map.getZoom() - 1)); });

    var links = { type: "FeatureCollection", features: r.landmarks.map(function (lm, i) {
      return lm.img ? { type: "Feature", properties: { i: i }, geometry: { type: "LineString", coordinates: [[lm.lon, lm.lat], at(lm.km)] } } : null;
    }).filter(Boolean) };
    var kms = { type: "FeatureCollection", features: [5, 10, 15, 20, 25, 30, 35, 40].map(function (k) {
      return { type: "Feature", properties: { label: k + "K" }, geometry: { type: "Point", coordinates: at(k) } };
    }) };
    var points = { type: "FeatureCollection", features: r.landmarks.map(function (lm, i) {
      return { type: "Feature", properties: { i: i }, geometry: { type: "Point", coordinates: lm.lon != null ? [lm.lon, lm.lat] : at(lm.km) } };
    }) };

    function addLayers() {
      // 路號盾牌與道路編號會搶走路線的焦點
      map.getStyle().layers.forEach(function (l) {
        var tf = l.layout && l.layout["text-field"];
        if (/shield/i.test(l.id) || (tf && JSON.stringify(tf).indexOf('"ref"') >= 0)) map.setLayoutProperty(l.id, "visibility", "none");
      });
      var box = opts.container, course = css(box, "--course"), surface = css(box, "--surface"), muted = css(box, "--muted");
      map.addSource("route", { type: "geojson", data: shared() });
      var offset = ["interpolate", ["linear"], ["zoom"], 11, ["*", 2, ["get", "o"]], 15, ["*", 4.5, ["get", "o"]]];
      map.addSource("links", { type: "geojson", data: links });
      map.addSource("kms", { type: "geojson", data: kms });
      map.addSource("lm", { type: "geojson", data: points, cluster: true, clusterRadius: 44, clusterMaxZoom: 15 });
      map.addLayer({ id: "links", type: "line", source: "links", paint: { "line-color": muted, "line-width": 1.2, "line-dasharray": [2, 2] } });
      map.addLayer({ id: "route-casing", type: "line", source: "route", layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": surface, "line-width": ["interpolate", ["linear"], ["zoom"], 11, 6, 15, 12], "line-offset": offset } });
      map.addLayer({ id: "route", type: "line", source: "route", layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": course, "line-width": ["interpolate", ["linear"], ["zoom"], 11, 3, 15, 6], "line-offset": offset } });
      map.addLayer({ id: "km-dots", type: "circle", source: "kms", paint: { "circle-radius": 4, "circle-color": surface, "circle-stroke-color": course, "circle-stroke-width": 2 } });
      map.addLayer({ id: "km-labels", type: "symbol", source: "kms",
        layout: { "text-field": ["get", "label"], "text-font": ["Noto Sans Bold"], "text-size": 11, "text-offset": [0, -1.1], "text-allow-overlap": true },
        paint: { "text-color": course, "text-halo-color": surface, "text-halo-width": 2 } });
      map.addLayer({ id: "lm-index", type: "circle", source: "lm", paint: { "circle-radius": 1, "circle-opacity": 0, "circle-stroke-opacity": 0 } });
    }
    map.on("style.load", addLayers);

    // 景點
    var els = [], markers = [];
    function closeAll(except) { els.forEach(function (el) { if (el !== except) el.classList.remove("open"); }); }
    function place(el) {
      var box = opts.container.getBoundingClientRect(), b = el.getBoundingClientRect();
      var y = b.top - box.top, x = b.left - box.left;
      el.classList.toggle("down", y < 90);
      el.classList.toggle("up", y > box.height - 260);
      el.classList.toggle("left", x > box.width - 120);
      el.classList.toggle("right", x < 120);
    }
    function loadPhoto(btn, lm) {
      // CSS 變數裡的相對網址會以樣式表位置解析，所以先轉成完整網址
      if (lm.img && !btn.dataset.loaded) { btn.style.setProperty("--photo", "url('" + new URL(opts.imgBase + lm.img, location.href).href + "')"); btn.dataset.loaded = "1"; }
    }
    r.landmarks.forEach(function (lm, i) {
      var el = document.createElement("div");
      el.className = lm.img ? "mlm" : "mlm-dot";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = lm.img ? "mlm-btn" : "mlm-dot-btn";
      btn.setAttribute("aria-label", (i + 1) + ". " + lm.name + " · " + window.Geo.fmtKm(lm.km) + " km");
      if (lm.img) {
        if (lm.pos) btn.style.setProperty("--pos", lm.pos);
        if (lm.size) btn.style.setProperty("--size", lm.size);
        btn.innerHTML = svg(lm.icon);
      } else btn.textContent = i + 1;
      var card = document.createElement("div");
      card.className = "mlm-card";
      card.innerHTML = '<span class="km"></span><b></b><span class="note"></span>';
      card.querySelector(".km").textContent = window.Geo.fmtKm(lm.km) + " K";
      card.querySelector("b").textContent = (i + 1) + ". " + lm.name;
      card.querySelector(".note").textContent = lm.note;
      el.appendChild(btn); el.appendChild(card);
      el.addEventListener("mouseenter", function () { loadPhoto(btn, lm); place(el); closeAll(el); });
      btn.addEventListener("focus", function () { loadPhoto(btn, lm); place(el); });
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        loadPhoto(btn, lm); place(el);
        var open = !el.classList.contains("open");
        closeAll(el);
        el.classList.toggle("open", open);
        if (opts.onPick) opts.onPick(lm.km);
      });
      els.push(el);
      markers.push(new ml.Marker({ element: el, anchor: "center" }).setLngLat(lm.lon != null ? [lm.lon, lm.lat] : at(lm.km)));
    });
    map.on("click", function () { closeAll(); });

    // 聚合：靠近的景點合併成帶數字的圓，點一下放大分開
    var shown = {}, clusters = {};
    function clusterMarker(id, count, lngLat) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "mlm-cluster"; b.textContent = count;
      b.setAttribute("aria-label", (T.cluster || "{n}").replace("{n}", count));
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        map.getSource("lm").getClusterExpansionZoom(id).then(function (z) { map.easeTo({ center: lngLat, zoom: Math.min(z + 0.3, 17) }); });
      });
      return new ml.Marker({ element: b, anchor: "center" }).setLngLat(lngLat);
    }
    function sync() {
      if (!map.getSource("lm") || !map.isSourceLoaded("lm")) return;
      var wantLm = {}, wantCl = {};
      map.querySourceFeatures("lm").forEach(function (f) {
        var p = f.properties;
        if (p.cluster) { if (!wantCl[p.cluster_id]) wantCl[p.cluster_id] = { count: p.point_count, at: f.geometry.coordinates }; }
        else wantLm[p.i] = true;
      });
      markers.forEach(function (m, i) {
        if (wantLm[i] && !shown[i]) { m.addTo(map); shown[i] = true; }
        else if (!wantLm[i] && shown[i]) { m.remove(); els[i].classList.remove("open"); shown[i] = false; }
      });
      Object.keys(clusters).forEach(function (id) { if (!wantCl[id]) { clusters[id].remove(); delete clusters[id]; } });
      Object.keys(wantCl).forEach(function (id) { if (!clusters[id]) clusters[id] = clusterMarker(Number(id), wantCl[id].count, wantCl[id].at).addTo(map); });
      if (map.getLayer("links")) map.setFilter("links", ["in", ["get", "i"], ["literal", Object.keys(wantLm).map(Number)]]);
    }
    map.on("moveend", sync);
    map.on("idle", sync);

    // 目前位置
    var runnerEl = document.createElement("div"); runnerEl.className = "mlm-runner";
    var runner = new ml.Marker({ element: runnerEl }).setLngLat(at(21.1)).addTo(map);

    return {
      map: map,
      setKm: function (km) { runner.setLngLat(at(km)); },
      // 容器大小改變後（從疊在 SVG 上改成正式顯示）重新框住整條路線
      refit: function () {
        map.resize();
        map.setMinZoom(0);
        map.fitBounds(bounds, { padding: 48, animate: false });
        map.setMinZoom(Math.max(0, map.getZoom() - 1));
      },
      onReady: function (fn) { if (map.loaded()) fn(); else map.once("load", fn); },
      onError: function (fn) { map.on("error", fn); }
    };
  }

  window.CourseMap = { create: create };
})();

// 頁面互動。內容已在建置時產生，這裡只接上行為：高度圖拖曳、景點點選、段落跳轉、語言記憶。
// 建置時會把 geo.js 併在這個檔案前面（提供 window.Geo）。
(function () {
  "use strict";
  var SITE = window.SITE || {};
  var hdr = document.getElementById("hdr");

  function measure() { if (hdr) document.documentElement.style.setProperty("--hdr", hdr.offsetHeight + "px"); }
  measure();
  window.addEventListener("resize", measure);

  // 記住使用者主動選的語言，讓網站首頁下次直接轉到這個語言
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".langs a[data-lang]");
    if (a) { try { localStorage.setItem("lang", a.getAttribute("data-lang")); } catch (err) {} }
  });

  // 讓目前的分頁標籤捲到可見範圍
  var tabs = document.getElementById("tabs");
  var cur = tabs && tabs.querySelector('[aria-current="page"]');
  if (cur) {
    var tr = tabs.getBoundingClientRect(), ar = cur.getBoundingClientRect();
    if (ar.left < tr.left || ar.right > tr.right) tabs.scrollLeft += ar.left - tr.left - 16;
  }

  var jumpNav = document.querySelector(".jump");
  if (jumpNav) jumpNav.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-to]");
    if (b) document.getElementById(b.getAttribute("data-to")).scrollIntoView({ behavior: "smooth", block: "start" });
  });

  if (window.SITE_ANALYTICS) {
    var reset = document.getElementById("consent-reset");
    if (reset) reset.hidden = false;
    window.SITE_ANALYTICS.pageView();
  }

  var r = window.PAGE_RACE;
  if (!r || !window.Geo) return;
  var Geo = window.Geo;
  var P = Geo.mapProjection(r), S = Geo.profileScale(r);
  var prof = document.querySelector("#prof-fig svg");
  var mapCur = document.getElementById("map-cur");
  var profCur = document.getElementById("prof-cur");
  var slider = document.getElementById("km-slider");
  var roKm = document.getElementById("ro-km"), roM = document.getElementById("ro-m"), roNear = document.getElementById("ro-near");
  var marks = document.getElementById("marks");
  var live = null; // 真實地圖（有景點照片設定的賽事才有）

  function setKm(km) {
    var s = Geo.stateAt(r, km, P, S);
    mapCur.setAttribute("transform", "translate(" + s.xy[0].toFixed(1) + "," + s.xy[1].toFixed(1) + ")");
    var line = profCur.firstElementChild, dot = profCur.lastElementChild;
    line.setAttribute("x1", s.px); line.setAttribute("x2", s.px);
    dot.setAttribute("cx", s.px); dot.setAttribute("cy", s.py);
    roKm.firstChild.nodeValue = Geo.fmtKm(s.km);
    roM.firstChild.nodeValue = Math.round(s.ele);
    roNear.firstChild.nodeValue = s.at ? SITE.here : SITE.nearest;
    roNear.lastChild.textContent = (s.near + 1) + ". " + r.landmarks[s.near].name;
    Array.prototype.forEach.call(marks.children, function (li, i) { li.classList.toggle("on", i === s.near && s.at); });
    if (Math.abs(parseFloat(slider.value) - s.km) > 0.05) slider.value = s.km;
    if (live) live.setKm(s.km);
  }

  slider.addEventListener("input", function () { setKm(parseFloat(slider.value)); });

  function kmFromEvent(e) {
    var rect = prof.getBoundingClientRect();
    var vx = (e.clientX - rect.left) / rect.width * S.W;
    return (vx - S.ml) / (S.W - S.ml - S.mr) * Geo.FULL;
  }
  var dragging = false;
  prof.style.touchAction = "pan-y";
  prof.addEventListener("pointerdown", function (e) { dragging = true; try { prof.setPointerCapture(e.pointerId); } catch (err) {} setKm(kmFromEvent(e)); });
  prof.addEventListener("pointermove", function (e) { if (dragging || e.pointerType === "mouse") setKm(kmFromEvent(e)); });
  prof.addEventListener("pointerup", function () { dragging = false; });
  prof.addEventListener("pointercancel", function () { dragging = false; });

  marks.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-km]");
    if (!b) return;
    setKm(parseFloat(b.getAttribute("data-km")));
    var mf = document.getElementById("map-fig").getBoundingClientRect();
    var top = hdr.getBoundingClientRect().bottom;
    if (mf.bottom < top + 40 || mf.top > window.innerHeight - 40) {
      document.getElementById("b-route").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  });

  // 真實地圖：載入成功後取代 SVG 路線圖；失敗就保留 SVG
  var liveBox = document.getElementById("live-map");
  if (liveBox && window.CourseMap && r.map) {
    try {
      live = window.CourseMap.create({
        container: liveBox, race: { route: r.route, landmarks: r.map }, imgBase: r.imgBase, text: SITE.map || {},
        onPick: function (km) { setKm(km); }
      });
    } catch (err) { live = null; }
    if (live) {
      live.onReady(function () {
        document.getElementById("map-fig").classList.add("has-live");
        live.refit();
        live.setKm(parseFloat(slider.value));
      });
    }
  }
})();
