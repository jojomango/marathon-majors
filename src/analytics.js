// Google Analytics 4。每頁記錄一次瀏覽，並附上介面語言。
// 歐洲（依瀏覽器時區判斷）要訪客按「同意」才載入；其他地區預設載入，只顯示告知並可選擇不追蹤。
// 瀏覽器送出 Global Privacy Control 訊號時，不論地區都不載入。
// 頁面提供 window.SITE（語言與提示文字），config.js 提供評估 ID。
(function () {
  "use strict";
  var id = (window.SITE_CONFIG || {}).gaMeasurementId;
  if (!id) return;
  var SITE = window.SITE || {};
  var lang = SITE.lang || "zh";
  var KEY = "analytics-consent"; // granted：歐洲模式按了同意；ack：告知模式按了了解；denied：拒絕
  var loaded = false, pending = false;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  // 不在 Europe/ 底下的歐盟、歐洲經濟區與英國屬地時區，以及舊式的歐洲時區名稱
  var OPT_IN_ZONES = [
    "Asia/Nicosia", "Asia/Famagusta", "Africa/Ceuta", "Arctic/Longyearbyen",
    "Atlantic/Canary", "Atlantic/Madeira", "Atlantic/Azores", "Atlantic/Reykjavik", "Atlantic/Faroe",
    "America/Guadeloupe", "America/Martinique", "America/Cayenne", "America/St_Barthelemy", "America/Marigot",
    "Indian/Reunion", "Indian/Mayotte",
    "GB", "GB-Eire", "Eire", "Iceland", "Portugal", "Poland", "WET", "CET", "MET", "EET"
  ];
  // 範圍寧可抓大：讀不到時區時也當作需要同意
  function needsOptIn() {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    return !tz || tz.indexOf("Europe/") === 0 || OPT_IN_ZONES.indexOf(tz) >= 0;
  }
  function gpc() { return navigator.globalPrivacyControl === true; }

  function load() {
    window["ga-disable-" + id] = false;
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
  // 告知模式下按「不要追蹤」：停止之後的傳送，並刪掉 GA 已設定的 Cookie
  function stop() {
    window["ga-disable-" + id] = true;
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name === "_ga" || name.indexOf("_ga_") === 0) {
        document.cookie = name + "=; Max-Age=0; path=/";
        document.cookie = name + "=; Max-Age=0; path=/; domain=" + location.hostname;
      }
    });
  }
  function send() {
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: location.origin + location.pathname,
      page_path: location.pathname,
      site_language: lang
    });
  }

  // optIn 為 true 時是「同意／不同意」，否則是「了解／不要追蹤」的告知
  function banner(optIn) {
    if (document.getElementById("consent")) return;
    var el = document.createElement("div");
    el.className = "consent"; el.id = "consent"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", SITE.consentAria || "Analytics cookies");
    var p = document.createElement("p");
    p.textContent = ((optIn ? SITE.consentText : SITE.noticeText) || "") + " ";
    var a = document.createElement("a");
    a.href = SITE.privacyUrl || "privacy/"; a.textContent = SITE.privacy || "Privacy";
    p.appendChild(a);
    var btns = document.createElement("div"); btns.className = "btns";
    var no = document.createElement("button"); no.type = "button"; no.className = "no";
    no.textContent = (optIn ? SITE.consentNo : SITE.noticeNo) || "Decline";
    var yes = document.createElement("button"); yes.type = "button"; yes.className = "yes";
    yes.textContent = (optIn ? SITE.consentYes : SITE.noticeOk) || "Accept";
    btns.appendChild(no); btns.appendChild(yes);
    el.appendChild(p); el.appendChild(btns);
    yes.onclick = function () { write(optIn ? "granted" : "ack"); el.remove(); load(); };
    no.onclick = function () { write("denied"); el.remove(); if (loaded) stop(); };
    document.body.appendChild(el);
  }

  function init() {
    var v = read();
    if (gpc() || v === "denied") return;
    if (needsOptIn()) { if (v === "granted") load(); else banner(true); return; }
    load();
    if (!v) banner(false);
  }

  window.SITE_ANALYTICS = {
    pageView: function () { if (loaded) send(); else pending = true; },
    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      var el = document.getElementById("consent");
      if (el) el.remove();
      init();
    }
  };
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "consent-reset") window.SITE_ANALYTICS.reset();
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
