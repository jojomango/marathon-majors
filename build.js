// 產生靜態網站到 docs/（GitHub Pages 從這個資料夾發布）。
// 用法：npm run build
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const { Resvg } = require("@resvg/resvg-js");
const Geo = require("./src/geo.js");
const { UI, SUPPORTED, HTML_LANG, t } = require("./src/i18n.js");
const R = require("./src/render.js");

const SITE_URL = "https://jojomango.github.io/marathon-majors";
const BASE = "/marathon-majors/";
const OUT = path.join(__dirname, "docs");
const OG_LOCALE = { zh: "zh_TW", en: "en_US", es: "es_ES" };
// Google Search Console 的 HTML 標記驗證碼（content 值）。取得後填入即可。
const SEARCH_CONSOLE_TOKEN = "ZjdCRT6Vp5BR8BkQVofkdttir7N0Os3NAY814zQgL4M";
// 官方已公布的 2027 賽期，用於結構化資料 SportsEvent
const NEXT_EDITION = {
  tokyo: { date: "2027-03-07", country: "JP" },
  boston: { date: "2027-04-19", country: "US" },
  capetown: { date: "2027-05-23", country: "ZA" }
};

/* ---------- 讀取資料 ---------- */
function loadData() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of ["marathons.js", "courses.js", "marathons.en.js", "marathons.es.js"]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, "data", f), "utf8"), ctx, { filename: f });
  }
  return ctx.window;
}
const W = loadData();

function racesFor(lang) {
  const races = JSON.parse(JSON.stringify(W.MAJORS));
  const timeline = JSON.parse(JSON.stringify(W.MAJORS_TIMELINE));
  const TR = lang === "zh" ? null : W.MAJORS_I18N[lang];
  races.forEach((r) => {
    const c = W.COURSES[r.id];
    if (c) {
      r.route = c.route; r.elevation = c.elevation;
      r.source = { kind: c.source.kind, route: c.source.route, elevation: c.source.elevation };
      r.landmarks.forEach((lm, i) => { if (c.landmarkKm[i] != null) lm.km = c.landmarkKm[i]; });
    } else {
      r.source = { kind: "sketch", route: t(lang, "sketchRoute"), elevation: t(lang, "sketchElev") };
    }
    const x = TR && TR.races[r.id];
    if (x) {
      ["name", "city", "country", "month", "shape", "start", "finish", "profileNote", "history", "cityIntro"].forEach((k) => { if (x[k] != null) r[k] = x[k]; });
      if (x.milestones) r.milestones.forEach((m, i) => { if (x.milestones[i] != null) m[1] = x.milestones[i]; });
      if (x.landmarks) r.landmarks.forEach((lm, i) => { const y = x.landmarks[i]; if (y) { lm.name = y[0]; lm.note = y[1]; } });
      if (x.events) r.events.forEach((e, i) => { const y = x.events[i]; if (y) { e.title = y[0]; e.text = y[1]; } });
      if (x.records && r.records) { r.records.men.name = x.records[0]; r.records.women.name = x.records[1]; }
      if (x.source && c) { r.source.route = x.source[0]; r.source.elevation = x.source[1]; }
    }
    // 總覽卡片用的簡化路線（約 60 點）
    const step = Math.max(1, Math.floor(r.route.length / 60));
    r.mini = r.route.filter((_, i) => i % step === 0).concat([r.route[r.route.length - 1]]);
  });
  if (TR) timeline.forEach((it, i) => { const y = TR.timeline[i]; if (y) { it.title = y[0]; it.text = y[1]; } });
  return { races, timeline };
}

/* ---------- 輸出工具 ---------- */
function rmrf(p) { fs.rmSync(p, { recursive: true, force: true }); }
function write(rel, content) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}
const hashes = {};
function asset(rel, content) {
  write("assets/" + rel, content);
  hashes[rel] = crypto.createHash("sha1").update(content).digest("hex").slice(0, 8);
}
function assetUrl(rel, up) { return `${up}assets/${rel}?v=${hashes[rel]}`; }
const esc = R.esc;
function json(o) { return JSON.stringify(o).replace(/</g, "\\u003c"); }

const FONTS = {
  zh: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=JetBrains+Mono:wght@500&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&display=swap",
  latin: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=JetBrains+Mono:wght@500&family=Noto+Sans:wght@400;500;700&family=Noto+Serif:wght@700;900&display=swap"
};

// 一個完整頁面。p: { lang, path(相對網站根，結尾 /), title, desc, alternates: {zh,en,es,x-default}, og, jsonld, up, body, inline, scripts }
function page(p) {
  const url = SITE_URL + "/" + p.path;
  const alt = p.alternates ? Object.entries(p.alternates).map(([l, ap]) =>
    `<link rel="alternate" hreflang="${l === "x-default" ? "x-default" : HTML_LANG[l]}" href="${SITE_URL}/${ap}">`).join("\n") : "";
  const ogAlt = SUPPORTED.filter((l) => l !== p.lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}">`).join("\n");
  const font = p.lang === "zh" ? FONTS.zh : FONTS.latin;
  return `<!doctype html>
<html lang="${HTML_LANG[p.lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
${alt}
<meta property="og:type" content="${p.ogType || "website"}">
<meta property="og:site_name" content="${esc(t(p.lang, "brand"))}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/og/${p.og || "home"}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${OG_LOCALE[p.lang]}">
${ogAlt}
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F1F3F1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0E1214" media="(prefers-color-scheme: dark)">
${SEARCH_CONSOLE_TOKEN ? `<meta name="google-site-verification" content="${SEARCH_CONSOLE_TOKEN}">` : ""}
<link rel="icon" href="${p.up}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${p.up}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${font}">
<link rel="stylesheet" href="${assetUrl("styles.css", p.up)}">
${(p.jsonld || []).map((j) => `<script type="application/ld+json">${json(j)}</script>`).join("\n")}
${p.inline ? `<script>${p.inline}</script>` : ""}
${(p.scripts || ["config.js", "analytics.js", "app.js"]).map((s) => `<script defer src="${assetUrl(s, p.up)}"></script>`).join("\n")}
</head>
<body>
${p.body}
</body>
</html>
`.replace(/\n{2,}/g, "\n");
}

function siteInline(lang, up) {
  const U = UI[lang];
  return "window.SITE=" + json({
    lang, here: U.here, nearest: U.nearest, privacy: U.privacy, privacyUrl: up + lang + "/privacy/",
    consentText: U.consentText, consentYes: U.consentYes, consentNo: U.consentNo, consentAria: U.consentAria
  }) + ";";
}

/* ---------- 產生 ---------- */
rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });

asset("styles.css", fs.readFileSync("src/styles.css", "utf8"));
asset("config.js", fs.readFileSync("src/config.js", "utf8"));
asset("analytics.js", fs.readFileSync("src/analytics.js", "utf8"));
asset("app.js", fs.readFileSync("src/geo.js", "utf8") + "\n" + fs.readFileSync("src/app.js", "utf8"));

const ids = W.MAJORS.map((r) => r.id);
const sitemap = [];
function addSitemap(paths) { sitemap.push(paths); } // paths: {zh,en,es}

for (const lang of SUPPORTED) {
  const { races, timeline } = racesFor(lang);
  const homeAlt = { zh: "zh/", en: "en/", es: "es/", "x-default": "" };

  // 語言首頁
  {
    const ctx = { lang, page: "home", rel: "", races };
    const body = R.header(ctx) + `\n<main class="gutter" id="main">` + R.homeMain(ctx, timeline) + R.footer(ctx) + `</main>`;
    write(`${lang}/index.html`, page({
      lang, path: `${lang}/`, up: "../", title: t(lang, "seoHomeTitle"), desc: t(lang, "seoHomeDesc"), alternates: homeAlt, og: "home",
      jsonld: [{ "@context": "https://schema.org", "@type": "WebSite", name: t(lang, "brand"), url: `${SITE_URL}/${lang}/`, inLanguage: HTML_LANG[lang], description: t(lang, "seoHomeDesc") },
        { "@context": "https://schema.org", "@type": "ItemList", itemListElement: races.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.name, url: `${SITE_URL}/${lang}/${r.id}/` })) }],
      inline: siteInline(lang, "../"), body
    }));
    if (lang === "zh") addSitemap({ zh: "zh/", en: "en/", es: "es/" });
  }

  // 賽事頁
  races.forEach((r) => {
    const ctx = { lang, page: r.id, rel: "../", races };
    const body = R.header(ctx) + `\n<main class="gutter" id="main">` + R.raceMain(ctx, r) + R.footer(ctx) + `</main>`;
    const desc = r.records
      ? t(lang, "seoRaceDesc", { name: r.name, city: r.city, men: r.records.men.time, women: r.records.women.time })
      : t(lang, "seoRaceDescNoRec", { name: r.name, city: r.city });
    const url = `${SITE_URL}/${lang}/${r.id}/`;
    const jsonld = [{
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: t(lang, "crumbHome"), item: `${SITE_URL}/${lang}/` },
        { "@type": "ListItem", position: 2, name: r.name, item: url }]
    }];
    const ne = NEXT_EDITION[r.id];
    if (ne) jsonld.push({
      "@context": "https://schema.org", "@type": "SportsEvent", name: `${r.name} 2027`, sport: "Marathon",
      startDate: ne.date, endDate: ne.date,
      eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: r.start, address: { "@type": "PostalAddress", addressLocality: r.city, addressCountry: ne.country } },
      description: desc, url, image: `${SITE_URL}/og/${r.id}.png`
    });
    const pageRace = { route: r.route, elevation: r.elevation, landmarks: r.landmarks.map((lm) => ({ km: lm.km, name: lm.name })) };
    write(`${lang}/${r.id}/index.html`, page({
      lang, path: `${lang}/${r.id}/`, up: "../../", title: t(lang, "seoRaceTitle", { name: r.name }), ogTitle: r.name, desc,
      alternates: { zh: `zh/${r.id}/`, en: `en/${r.id}/`, es: `es/${r.id}/`, "x-default": `en/${r.id}/` }, og: r.id, ogType: "article",
      jsonld, inline: siteInline(lang, "../../") + "window.PAGE_RACE=" + json(pageRace) + ";", body
    }));
    if (lang === "zh") addSitemap({ zh: `zh/${r.id}/`, en: `en/${r.id}/`, es: `es/${r.id}/` });
  });

  // 隱私權頁
  {
    const src = fs.readFileSync("src/privacy-content.html", "utf8");
    const m = src.match(new RegExp(`<article data-lang="${lang}"[^>]*>([\\s\\S]*?)</article>`));
    const content = m[1].replace(/<button type="button" class="reset">/, '<button type="button" class="reset" id="privacy-reset">');
    const ctx = { lang, page: "privacy", rel: "../", races };
    const title = content.match(/<h1>(.*?)<\/h1>/)[1];
    const body = R.header(ctx) + `\n<main class="gutter" id="main"><article class="privacy prose">${content}</article>` + R.footer(ctx) + `</main>` +
      `<script>document.getElementById("privacy-reset").addEventListener("click",function(){try{localStorage.removeItem("analytics-consent")}catch(e){}this.nextElementSibling.hidden=false});</script>`;
    write(`${lang}/privacy/index.html`, page({
      lang, path: `${lang}/privacy/`, up: "../../", title: title + t(lang, "titleSep") + t(lang, "brand"), desc: t(lang, "seoHomeDesc"),
      alternates: { zh: "zh/privacy/", en: "en/privacy/", es: "es/privacy/" }, og: "home", inline: siteInline(lang, "../../"), body
    }));
    if (lang === "zh") addSitemap({ zh: "zh/privacy/", en: "en/privacy/", es: "es/privacy/" });
  }
}

/* ---------- 網站首頁：依語言轉址（也處理舊的 #tokyo 連結與 ?lang=） ---------- */
const detect = `(function(){
  var ids=${json(ids)};
  function norm(s){s=String(s||"").toLowerCase();if(s.indexOf("zh")===0)return"zh";if(s.indexOf("es")===0)return"es";if(s.indexOf("en")===0)return"en";return null;}
  var l=null;try{l=norm(new URLSearchParams(location.search).get("lang"));}catch(e){}
  if(!l){try{l=norm(localStorage.getItem("lang"));}catch(e){}}
  if(!l){var a=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];for(var i=0;i<a.length&&!l;i++)l=norm(a[i]);}
  if(!l)l="en";
  var h=(location.hash||"").replace(/^#/,""),tail=ids.indexOf(h)>=0?h+"/":"";
  location.replace(l+"/"+tail);
})();`;
{
  const links = SUPPORTED.map((l) => `<li><a href="${l}/" hreflang="${HTML_LANG[l]}" lang="${HTML_LANG[l]}">${esc(UI[l].langName)} · ${esc(UI[l].brand)}</a></li>`).join("");
  write("index.html", page({
    lang: "en", path: "", up: "", title: "Majors Course Atlas · 大滿貫跑道誌 · Atlas de los Majors", desc: t("en", "seoHomeDesc"),
    alternates: { zh: "zh/", en: "en/", es: "es/", "x-default": "" }, og: "home", inline: detect, scripts: [],
    body: `<main class="gutter chooser"><h1>World Marathon Majors</h1><ul>${links}</ul></main>`
  }));
}
// 舊的隱私權網址
write("privacy.html", page({
  lang: "en", path: "privacy.html", up: "", title: "Privacy", desc: t("en", "seoHomeDesc"), noindex: true, og: "home", scripts: [],
  inline: detect.replace('location.replace(l+"/"+tail)', 'location.replace(l+"/privacy/")'),
  body: `<main class="gutter chooser"><ul>${SUPPORTED.map((l) => `<li><a href="${l}/privacy/">${esc(UI[l].privacy)}</a></li>`).join("")}</ul></main>`
}));

/* ---------- 404 ---------- */
write("404.html", page({
  lang: "en", path: "404.html", up: BASE, title: "404 · Majors Course Atlas", desc: t("en", "seoHomeDesc"), noindex: true, og: "home", scripts: [],
  body: `<main class="gutter chooser"><div class="eyebrow">404</div>` +
    SUPPORTED.map((l) => `<section lang="${HTML_LANG[l]}"><h1>${esc(UI[l].nfTitle)}</h1><p>${esc(UI[l].nfText)}</p><p><a href="${BASE}${l}/">${esc(UI[l].nfBack)}</a></p></section>`).join("") +
    `</main>`
}));

/* ---------- sitemap / robots ---------- */
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.flatMap((g) => SUPPORTED.map((l) => `  <url>
    <loc>${SITE_URL}/${g[l]}</loc>
    <lastmod>${today}</lastmod>
${SUPPORTED.map((l2) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l2]}" href="${SITE_URL}/${g[l2]}"/>`).join("\n")}
  </url>`)).join("\n")}
</urlset>
`);
// 注意：GitHub 專案網站在子路徑下，搜尋引擎只讀網域根目錄的 robots.txt；
// 這份在改用自訂網域後才會生效。sitemap 請在 Search Console 直接提交。
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write(".nojekyll", "");

/* ---------- 圖示與分享圖 ---------- */
function png(svg, file) {
  const out = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: "Helvetica" } }).render().asPng();
  write(file, out);
}
const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect x="4" y="8" width="56" height="48" rx="6" fill="#FFFFFF" stroke="#13181C" stroke-width="4"/>
<circle cx="12" cy="16" r="2.5" fill="#13181C"/><circle cx="52" cy="16" r="2.5" fill="#13181C"/>
<circle cx="12" cy="48" r="2.5" fill="#13181C"/><circle cx="52" cy="48" r="2.5" fill="#13181C"/>
<path d="M14 42 C 24 24, 34 46, 50 22" fill="none" stroke="#1C55D4" stroke-width="6" stroke-linecap="round"/>
</svg>`;
write("favicon.svg", FAVICON);
png(FAVICON.replace('viewBox="0 0 64 64"', 'viewBox="0 0 64 64" width="180" height="180"'), "apple-touch-icon.png");

function ogSvg(code, title, sub, route) {
  let routeSvg = "";
  if (route) {
    const Pj = Geo.project(route, 520, 470, 30);
    const d = route.map((p, i) => { const xy = Pj.xy(p[0], p[1]); return (i ? "L" : "M") + (xy[0] + 640).toFixed(1) + " " + (xy[1] + 80).toFixed(1); }).join("");
    routeSvg = `<rect x="640" y="80" width="520" height="470" rx="12" fill="#1B2226"/><path d="${d}" fill="none" stroke="#74A0FF" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0E1214"/>
<rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="#2A3236" stroke-width="2"/>
${routeSvg}
<text x="80" y="140" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="#E0B24C">WORLD MARATHON MAJORS</text>
<text x="74" y="${route ? 360 : 330}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${route ? 200 : 120}" font-weight="900" fill="#E6EAE7">${esc(code)}</text>
<text x="80" y="${route ? 450 : 420}" font-family="Helvetica, Arial, sans-serif" font-size="48" font-weight="700" fill="#E6EAE7">${esc(title)}</text>
<text x="80" y="${route ? 510 : 480}" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#98A2A8">${esc(sub)}</text>
</svg>`;
}
const en = racesFor("en").races;
png(ogSvg("MAJORS", "Majors Course Atlas", "Courses, elevation and records of the eight Majors", null), "og/home.png");
en.forEach((r) => png(ogSvg(r.code, r.name, "Course map · elevation · records", r.route), `og/${r.id}.png`));

console.log("built", fs.readdirSync(OUT).join(" "), "| pages:", sitemap.length * 3 + 1);
