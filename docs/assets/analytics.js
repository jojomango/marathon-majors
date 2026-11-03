// Google Analytics 4：訪客同意後才載入。每頁記錄一次瀏覽，並附上介面語言。
// 頁面提供 window.SITE（語言與同意提示文字），config.js 提供評估 ID。
(function () {
  "use strict";
  var id = (window.SITE_CONFIG || {}).gaMeasurementId;
  if (!id) return;
  var SITE = window.SITE || {};
  var lang = SITE.lang || "zh";
  var KEY = "analytics-consent";
  var loaded = false, pending = false;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: false, anonymize_ip: true });
    window.gtag("set", "user_properties", { site_language: lang });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    if (pending) send();
  }
  function send() {
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: location.origin + location.pathname,
      page_path: location.pathname,
      site_language: lang
    });
  }

  function banner() {
    if (document.getElementById("consent")) return;
    var el = document.createElement("div");
    el.className = "consent"; el.id = "consent"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", SITE.consentAria || "Analytics cookies");
    var p = document.createElement("p");
    p.textContent = (SITE.consentText || "") + " ";
    var a = document.createElement("a");
    a.href = SITE.privacyUrl || "privacy/"; a.textContent = SITE.privacy || "Privacy";
    p.appendChild(a);
    var btns = document.createElement("div"); btns.className = "btns";
    var no = document.createElement("button"); no.type = "button"; no.className = "no"; no.textContent = SITE.consentNo || "Decline";
    var yes = document.createElement("button"); yes.type = "button"; yes.className = "yes"; yes.textContent = SITE.consentYes || "Accept";
    btns.appendChild(no); btns.appendChild(yes);
    el.appendChild(p); el.appendChild(btns);
    yes.onclick = function () { write("granted"); el.remove(); load(); };
    no.onclick = function () { write("denied"); el.remove(); };
    document.body.appendChild(el);
  }

  window.SITE_ANALYTICS = {
    pageView: function () { if (loaded) send(); else pending = true; },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} banner(); }
  };
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "consent-reset") window.SITE_ANALYTICS.reset();
  });
  function init() { if (read() === "granted") load(); else if (read() !== "denied") banner(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
