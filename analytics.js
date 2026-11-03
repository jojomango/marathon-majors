// Google Analytics 4：訪客同意後才載入，並在切換分頁（#tokyo 等）時回報瀏覽。
(function () {
  "use strict";
  var id = (window.SITE_CONFIG || {}).gaMeasurementId;
  if (!id) return;
  var KEY = "analytics-consent";
  var loaded = false, queue = [];

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: false, anonymize_ip: true });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    queue.forEach(send); queue = [];
  }
  function send(view) {
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: location.origin + location.pathname + (view && view !== "home" ? "#" + view : ""),
      page_path: location.pathname + (view && view !== "home" ? "#" + view : "")
    });
  }

  function banner() {
    if (document.getElementById("consent")) return;
    var el = document.createElement("div");
    el.className = "consent"; el.id = "consent"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "分析 Cookie");
    el.innerHTML = '<p>本站想使用 Google Analytics 統計瀏覽量，會設定分析用 Cookie。<a href="privacy.html">隱私權說明</a></p>' +
      '<div class="btns"><button type="button" class="no">不同意</button><button type="button" class="yes">同意</button></div>';
    el.querySelector(".yes").onclick = function () { write("granted"); el.remove(); load(); };
    el.querySelector(".no").onclick = function () { write("denied"); el.remove(); };
    document.body.appendChild(el);
  }

  window.SITE_ANALYTICS = {
    pageView: function (view) {
      if (loaded) send(view); else if (read() === "granted") { queue.push(view); load(); } else queue = [view];
    },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} banner(); }
  };

  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "consent-reset") window.SITE_ANALYTICS.reset();
  });
  function init() { if (read() === "granted") load(); else if (read() !== "denied") banner(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
