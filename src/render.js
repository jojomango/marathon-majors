// 建置時產生頁面 HTML（字串）。互動行為在 app.js。
"use strict";
const Geo = require("./geo.js");
const { t } = require("./i18n.js");

const FULL = Geo.FULL;
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function attrs(o) { return Object.keys(o).map((k) => ` ${k}="${esc(o[k])}"`).join(""); }
function tag(name, a, inner) { return inner == null ? `<${name}${attrs(a)}/>` : `<${name}${attrs(a)}>${inner}</${name}>`; }
function n1(v) { return Math.round(v * 10) / 10; }
function pathFrom(pts) { return pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(""); }

function starCount(races, r) {
  const founders = races.filter((x) => x.joined === 2006).length;
  if (r.joined === 2006) return founders;
  return founders + races.filter((x) => x.joined > 2006 && x.joined <= r.joined).length;
}

/* ---------- SVG ---------- */
function miniMap(route) {
  const W = 96, H = 80, P = Geo.project(route, W, H, 8);
  const pts = route.map((p) => P.xy(p[0], p[1]));
  const s = pts[0], f = pts[pts.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">` +
    tag("path", { d: pathFrom(pts), fill: "none", stroke: "var(--course)", "stroke-width": 2.2, "stroke-linejoin": "round", "stroke-linecap": "round" }) +
    tag("circle", { cx: n1(s[0]), cy: n1(s[1]), r: 3, fill: "var(--ink)" }) +
    tag("rect", { x: n1(f[0] - 3), y: n1(f[1] - 3), width: 6, height: 6, fill: "var(--surface)", stroke: "var(--ink)", "stroke-width": 1.5 }) +
    "</svg>";
}

function mapSvg(r, lang, P, st0) {
  const { W, H } = Geo.MAP;
  const pts = r.route.map((p) => P.xy(p[0], p[1]));
  const d = pathFrom(pts);
  let out = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t(lang, "mapAria", { name: r.name, start: r.start, finish: r.finish }))}">`;
  out += tag("path", { d, fill: "none", stroke: "var(--map)", "stroke-width": 9, "stroke-linejoin": "round", "stroke-linecap": "round" });
  out += tag("path", { d, fill: "none", stroke: "var(--course)", "stroke-width": 3.5, "stroke-linejoin": "round", "stroke-linecap": "round" });
  for (let k = 10; k < FULL; k += 10) {
    const q = Geo.routeAt(r, k), xy = P.xy(q[0], q[1]);
    out += tag("circle", { cx: n1(xy[0]), cy: n1(xy[1]), r: 3.2, fill: "var(--surface)", stroke: "var(--course)", "stroke-width": 1.6 });
    out += tag("text", { x: n1(xy[0] + 6), y: n1(xy[1] - 5), "font-size": 10, "font-family": "var(--f-mono)", fill: "var(--muted)", stroke: "var(--map)", "stroke-width": 3, "paint-order": "stroke" }, k + "K");
  }
  out += "<g>";
  r.landmarks.forEach((lm, i) => {
    const q = Geo.routeAt(r, lm.km), xy = P.xy(q[0], q[1]);
    out += `<g class="lm" data-i="${i}">` +
      tag("circle", { cx: n1(xy[0]), cy: n1(xy[1]), r: 8.5, fill: "var(--ink)", stroke: "var(--map)", "stroke-width": 1.5 }) +
      tag("text", { x: n1(xy[0]), y: n1(xy[1] + 3.6), "text-anchor": "middle", "font-size": 10, "font-weight": 700, "font-family": "var(--f-mono)", fill: "var(--bg)" }, String(i + 1)) +
      "</g>";
  });
  out += "</g>";
  out += `<g id="map-cur" transform="translate(${st0.xy[0].toFixed(1)},${st0.xy[1].toFixed(1)})">` +
    tag("circle", { r: 11, fill: "var(--course-soft)", stroke: "var(--course)", "stroke-width": 1.5 }) +
    tag("circle", { r: 4.5, fill: "var(--course)", stroke: "var(--surface)", "stroke-width": 1.5 }) + "</g>";
  out += `<g transform="translate(${W - 22},22)">` + tag("path", { d: "M0 -12 L6 6 L0 2 L-6 6 Z", fill: "var(--ink)" }) +
    tag("text", { y: 18, "text-anchor": "middle", "font-size": 10, "font-weight": 700, fill: "var(--ink)", "font-family": "var(--f-mono)" }, "N") + "</g>";
  const steps = [0.5, 1, 2, 5, 10]; let bar = steps[0];
  for (const s of steps) if (s * P.pxPerKm <= 110) bar = s;
  const bw = bar * P.pxPerKm, by = H - 14;
  out += tag("path", { d: `M14 ${by - 4}V${by}H${(14 + bw).toFixed(1)}V${by - 4}`, fill: "none", stroke: "var(--ink)", "stroke-width": 1.5 });
  out += tag("text", { x: n1(14 + bw + 6), y: by + 1, "font-size": 10, fill: "var(--ink)", "font-family": "var(--f-mono)" }, bar + " km");
  return out + "</svg>";
}

function profileSvg(r, lang, S, st0) {
  const st = Geo.stats(r);
  const { W, H, ml, mr, mt, mb, X, Y } = S;
  let out = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t(lang, "profAria", { name: r.name, hi: st.hi, lo: st.lo }))}">`;
  for (let m = S.y0; m <= S.y1; m += 40) {
    out += tag("line", { x1: ml, x2: W - mr, y1: n1(Y(m)), y2: n1(Y(m)), stroke: "var(--rule)", "stroke-width": 1 });
    out += tag("text", { x: ml - 6, y: n1(Y(m) + 3.5), "text-anchor": "end", "font-size": 12, fill: "var(--muted)", "font-family": "var(--f-mono)" }, String(m));
  }
  out += tag("text", { x: ml - 6, y: mt - 3, "text-anchor": "end", "font-size": 11, fill: "var(--muted)" }, "m");
  [0, 5, 10, 15, 20, 25, 30, 35, 40, FULL].forEach((k) => {
    out += tag("text", { x: n1(X(k)), y: H - mb + 15, "text-anchor": k === FULL ? "end" : "middle", "font-size": 12, fill: "var(--muted)", "font-family": "var(--f-mono)" }, k === FULL ? "42.2" : String(k));
    out += tag("line", { x1: n1(X(k)), x2: n1(X(k)), y1: H - mb, y2: H - mb + 4, stroke: "var(--muted)" });
  });
  out += tag("text", { x: W - mr, y: H - 2, "text-anchor": "end", "font-size": 11, fill: "var(--muted)" }, "km");
  out += tag("line", { x1: n1(X(21.0975)), x2: n1(X(21.0975)), y1: mt, y2: H - mb, stroke: "var(--muted)", "stroke-dasharray": "2 3", "stroke-width": 1 });
  const pts = r.elevation.map((p) => [X(p[0]), Y(p[1])]);
  out += tag("path", { d: pathFrom(pts) + `L${X(FULL).toFixed(1)} ${H - mb}L${X(0).toFixed(1)} ${H - mb}Z`, fill: "var(--course-soft)" });
  out += tag("path", { d: pathFrom(pts), fill: "none", stroke: "var(--course)", "stroke-width": 2.2, "stroke-linejoin": "round" });
  out += tag("line", { x1: ml, x2: W - mr, y1: H - mb, y2: H - mb, stroke: "var(--muted)", "stroke-width": 1 });
  r.landmarks.forEach((lm, i) => { out += tag("circle", { cx: n1(X(lm.km)), cy: H - mb, r: 2.6, fill: "var(--ink)", "data-i": i }); });
  out += '<g id="prof-cur">' +
    tag("line", { x1: n1(st0.px), x2: n1(st0.px), y1: mt, y2: H - mb, stroke: "var(--ink)", "stroke-width": 1 }) +
    tag("circle", { cx: n1(st0.px), cy: n1(st0.py), r: 5, fill: "var(--course)", stroke: "var(--surface)", "stroke-width": 2 }) + "</g>";
  return out + "</svg>";
}

/* ---------- 共用區塊 ---------- */
// ctx: { lang, page: "home" | race id | "privacy" | "404", rel: 到語言首頁的相對路徑, races }
function langHref(ctx, l) {
  const tail = ctx.page === "home" || ctx.page === "404" ? "" : ctx.page + "/";
  return `${ctx.rel}../${l}/${tail}`;
}
function header(ctx) {
  const { lang } = ctx;
  const langs = [["zh", "中文", "zh-Hant"], ["en", "EN", "en"], ["es", "ES", "es"]].map(([l, label, hl]) =>
    `<a href="${langHref(ctx, l)}" hreflang="${hl}" lang="${hl}" data-lang="${l}"${l === lang ? ' aria-current="true"' : ""}>${label}</a>`).join("");
  let tabs = `<a class="tab" href="${ctx.rel || "./"}"${ctx.page === "home" ? ' aria-current="page"' : ""}><span class="c">ALL</span><span class="n">${esc(t(lang, "overview"))}</span></a>`;
  ctx.races.forEach((r) => {
    tabs += `<a class="tab${r.status !== "member" ? " soon" : ""}" href="${ctx.rel}${r.id}/"${ctx.page === r.id ? ' aria-current="page"' : ""}><span class="c">${r.code}</span><span class="n">${esc(r.city)}</span></a>`;
  });
  return `<header class="site-hdr" id="hdr">
  <div class="gutter brand"><a class="brand-name" href="${ctx.rel || "./"}">${esc(t(lang, "brand"))}</a><span>WORLD MARATHON MAJORS</span><nav class="langs" aria-label="${esc(t(lang, "langNav"))}">${langs}</nav></div>
  <nav class="gutter tabs" id="tabs" aria-label="${esc(t(lang, "racesNav"))}">${tabs}</nav>
</header>`;
}
function head2(lang, h, sub, raw) {
  const small = t(lang, sub);
  return (raw != null ? esc(raw) : esc(t(lang, h))) + (small ? ` <small>${esc(small)}</small>` : "");
}
function footer(ctx) {
  const { lang } = ctx;
  const osm = '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>';
  return `<footer class="foot">` +
    `<p>${esc(t(lang, "foot1"))}</p>` +
    `<p>${esc(t(lang, "foot2", { osm: "\u0000" })).replace("\u0000", osm)}</p>` +
    `<p>${esc(t(lang, "foot3", { v: Geo.VSPAN }))}</p>` +
    `<p>${esc(t(lang, "foot4"))} <a href="${ctx.rel}privacy/">${esc(t(lang, "privacy"))}</a>` +
    ` · <button type="button" class="linkbtn" id="consent-reset" hidden>${esc(t(lang, "cookieSettings"))}</button></p></footer>`;
}

/* ---------- 首頁 ---------- */
function homeMain(ctx, timeline) {
  const { lang, races } = ctx;
  const members = races.filter((r) => r.status === "member").length;
  let cards = "";
  races.forEach((r) => {
    cards += `<a class="card" href="${r.id}/"><div><div class="c">${r.code}</div><h3>${esc(r.name)}</h3><div class="meta">${esc(r.month)}<br>` +
      (r.status === "member" ? esc(t(lang, "cardMember", { n: starCount(races, r), y: r.joined })) : `<span class="badge">${esc(t(lang, "cardJoins", { y: r.joined }))}</span>`) +
      `</div></div>${miniMap(r.mini)}</a>`;
  });
  return `<div class="home">` +
    `<section class="home-hero"><div class="eyebrow">ABBOTT WORLD MARATHON MAJORS</div>` +
    `<h1>${esc(t(lang, "homeTitle"))} <span class="stars" aria-hidden="true">★★★★★★★☆</span></h1>` +
    `<p>${esc(t(lang, "homeIntro", { n: members }))}</p></section>` +
    `<section class="block"><h2>${head2(lang, "timelineH", "timelineSub")}</h2><ol class="series">` +
    timeline.map((it) => `<li class="${it.pending ? "pending" : ""}"><span class="y">${it.year}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></li>`).join("") +
    `</ol></section>` +
    `<section class="block"><h2>${head2(lang, "seasonH", "seasonSub")}</h2><div class="cards">${cards}</div></section>` +
    `</div>`;
}

/* ---------- 賽事頁 ---------- */
function fact(k, v) { return `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`; }
function jump(id, label) { return `<button type="button" data-to="${id}">${esc(label)}</button>`; }
function recTile(label, x) {
  return `<div class="rec"><span class="rec-l">${esc(label)}</span><span class="rec-t">${esc(x.time)}</span><span class="rec-n">${esc(x.name)} · ${x.year}</span></div>`;
}

function raceMain(ctx, r) {
  const { lang, races } = ctx;
  const st = Geo.stats(r);
  const n = starCount(races, r);
  let stars = "";
  for (let i = 0; i < 8; i++) stars += i < n ? "★" : "☆";
  const joinTxt = r.status === "member" ? t(lang, "joinedMember", { y: r.joined, n }) : t(lang, "joinedConfirmed", { y: r.joined });
  const P = Geo.mapProjection(r), S = Geo.profileScale(r);
  const st0 = Geo.stateAt(r, 21.1, P, S);
  const kindLabel = t(lang, "kind_" + r.source.kind);
  const idx = races.findIndex((x) => x.id === r.id);
  const prev = races[(idx + races.length - 1) % races.length], next = races[(idx + 1) % races.length];
  const near = r.landmarks[st0.near];

  return `<article class="race">` +
    `<div class="race-head">` +
    `<header class="bib"><span class="pin"></span><span class="pin"></span><span class="pin"></span><span class="pin"></span>` +
    `<div class="bib-top"><span>${esc(r.country)} · ${esc(r.city)}</span><span class="stars" aria-label="${esc(t(lang, "starsAria", { n }))}">${stars}</span></div>` +
    `<div class="bib-code" aria-hidden="true">${r.code}</div>` +
    `<h1>${esc(r.name)}</h1>` + (r.en !== r.name ? `<div class="en">${esc(r.en)}</div>` : "") + `</header>` +
    `<dl class="facts">` +
    fact(t(lang, "fFirst"), r.first) + fact(t(lang, "fJoined"), joinTxt) + fact(t(lang, "fDate"), r.month) +
    fact(t(lang, "fShape"), r.shape) + fact(t(lang, "fStart"), r.start) + fact(t(lang, "fFinish"), r.finish) +
    `</dl></div>` +
    `<nav class="jump" aria-label="${esc(t(lang, "jumpAria"))}">` +
    jump("b-history", t(lang, "jHistory")) + jump("b-city", t(lang, "jCity")) + jump("b-route", t(lang, "jCourse")) + jump("b-marks", t(lang, "jMarks")) + jump("b-events", t(lang, "jMoments")) +
    `</nav>` +
    `<div class="race-grid">` +

    `<section class="block b-history" id="b-history"><h2>${head2(lang, "hHistory", "sHistory")}</h2><div class="prose">` +
    r.history.map((p) => `<p>${esc(p)}</p>`).join("") +
    `</div><ol class="milestones">` + r.milestones.map((m) => `<li><span class="y">${m[0]}</span><span>${esc(m[1])}</span></li>`).join("") + `</ol></section>` +

    `<section class="block b-city" id="b-city"><h2>${head2(lang, null, "sCity", r.city)}</h2><div class="prose">` +
    r.cityIntro.map((p) => `<p>${esc(p)}</p>`).join("") + `</div></section>` +

    `<section class="block b-route" id="b-route"><h2>${head2(lang, "hCourse", "sCourse")}</h2>` +
    `<div class="route-pane"><div class="route-col"><figure class="map-fig" id="map-fig">${mapSvg(r, lang, P, st0)}` +
    `<figcaption>${esc(t(lang, "mapCaption", { kind: r.source.kind === "sketch" ? t(lang, "mapSketch") : kindLabel }))}</figcaption></figure></div>` +
    `<div class="route-col">` +
    `<figure class="prof-fig" id="prof-fig">${profileSvg(r, lang, S, st0)}<figcaption>${esc(t(lang, "profCaption"))}</figcaption></figure>` +
    `<label class="readout" for="km-slider"><span class="big" id="ro-km">${Geo.fmtKm(st0.km)}<small>km</small></span><span class="big" id="ro-m">${Math.round(st0.ele)}<small>m</small></span>` +
    `<span class="near" id="ro-near">${esc(t(lang, st0.at ? "here" : "nearest"))}<b>${st0.near + 1}. ${esc(near.name)}</b></span></label>` +
    `<input class="slider" id="km-slider" type="range" min="0" max="${FULL}" step="0.1" value="21.1" aria-label="${esc(t(lang, "sliderAria"))}">` +
    `<div class="stat-row"><span>${esc(t(lang, "stStart"))} <b>${st.start} m</b></span><span>${esc(t(lang, "stHigh"))} <b>${st.hi} m</b></span><span>${esc(t(lang, "stLow"))} <b>${st.lo} m</b></span>` +
    `<span>${esc(t(lang, "stGain"))} <b>≈${st.gain} m</b></span><span>${esc(t(lang, "stLoss"))} <b>≈${st.loss} m</b></span></div>` +
    `<p class="note">${esc(r.profileNote)}</p>` +
    `<p class="src"><span class="src-tag k-${r.source.kind}">${esc(kindLabel)}</span>` +
    `<span>${esc(t(lang, "srcRoute") + r.source.route)}</span><span>${esc(t(lang, "srcElev") + r.source.elevation)}</span></p>` +
    `</div></div></section>` +

    `<section class="block b-marks" id="b-marks"><h2>${head2(lang, "hMarks", "sMarks")}</h2><ol class="marks" id="marks">` +
    r.landmarks.map((lm, i) => `<li data-i="${i}"${i === st0.near && st0.at ? ' class="on"' : ""}><button type="button" data-km="${lm.km}"><span class="num">${i + 1}</span><span class="km mono">${Geo.fmtKm(lm.km)} K</span>` +
      `<span class="t"><b>${esc(lm.name)}</b><span>${esc(lm.note)}</span></span></button></li>`).join("") + `</ol></section>` +

    `<section class="block b-events" id="b-events"><h2>${head2(lang, "hMoments", "sMoments")}</h2>` +
    (r.records
      ? `<div class="records">${recTile(t(lang, "recMen"), r.records.men)}${recTile(t(lang, "recWomen"), r.records.women)}<p class="rec-note">${esc(t(lang, "recNote"))}</p></div>`
      : `<p class="note">${esc(t(lang, "noRecords", { city: r.city }))}</p>`) +
    `<ol class="events">` + r.events.slice().sort((a, b) => a.year - b.year).map((e) =>
      `<li class="ev-${e.kind}"><span class="y">${e.year}</span><div><span class="kind">${esc(t(lang, e.kind === "record" ? "kRecord" : "kMoment"))}</span><b>${esc(e.title)}</b><p>${esc(e.text)}</p></div></li>`).join("") +
    `</ol></section>` +
    `</div>` +
    `<nav class="pager" aria-label="${esc(t(lang, "racesNav"))}">` +
    `<a class="prev" href="../${prev.id}/" rel="prev"><small>${esc(t(lang, "prevRace"))}</small><span>${esc(prev.name)}</span></a>` +
    `<a class="next" href="../${next.id}/" rel="next"><small>${esc(t(lang, "nextRace"))}</small><span>${esc(next.name)}</span></a>` +
    `</nav>` +
    `</article>`;
}

module.exports = { esc, header, footer, homeMain, raceMain, starCount, miniMap };
