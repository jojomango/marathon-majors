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
})();
