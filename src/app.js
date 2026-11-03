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
