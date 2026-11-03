// 語言偵測與介面文字。
// 優先順序：網址 ?lang= → 使用者在切換器選過的語言 → 瀏覽器語言清單（簡中、繁中都用中文）→ 英文。
(function () {
  "use strict";
  var SUPPORTED = ["zh", "en", "es"];

  function norm(tag) {
    tag = String(tag || "").toLowerCase();
    if (tag.indexOf("zh") === 0) return "zh";
    if (tag.indexOf("es") === 0) return "es";
    if (tag.indexOf("en") === 0) return "en";
    return null;
  }

  var lang = null;
  try {
    lang = norm(new URLSearchParams(location.search).get("lang"));
    if (lang) localStorage.setItem("lang", lang);
  } catch (e) {}
  if (!lang) { try { lang = norm(localStorage.getItem("lang")); } catch (e) {} }
  if (!lang) {
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
    for (var i = 0; i < list.length && !lang; i++) lang = norm(list[i]);
  }
  if (SUPPORTED.indexOf(lang) < 0) lang = "en";

  window.SITE_LANG = lang;
  document.documentElement.lang = { zh: "zh-Hant", en: "en", es: "es" }[lang];

  var UI = {
    zh: {
      langName: "中文",
      brand: "大滿貫跑道誌", brandSub: "WORLD MARATHON MAJORS",
      racesNav: "賽事", langNav: "語言", overview: "總覽",
      homeTitle: "從六星到八星",
      homeIntro: "世界馬拉松大滿貫從 2006 年的五場比賽開始，東京加入後成為大家熟悉的「六大」。2025 年雪梨成為第七場，開普敦已確認於 2027 年成為第八場。目前正式成員 {n} 場，依賽季順序排列如下。",
      timelineH: "系列沿革", timelineSub: "TIMELINE",
      seasonH: "依賽季瀏覽", seasonSub: "BY SEASON",
      cardMember: "第 {n} 星・{y} 加入", cardJoins: "{y} 加入",
      joinedMember: "{y}（第 {n} 星）", joinedConfirmed: "{y}（已確認）",
      starsAria: "大滿貫第 {n} 站",
      fFirst: "首屆", fJoined: "加入大滿貫", fDate: "賽期", fShape: "路線型態", fStart: "起點", fFinish: "終點",
      jumpAria: "本頁段落",
      jHistory: "歷史", jCity: "城市", jCourse: "路線", jMarks: "沿途景點", jMoments: "事件與紀錄",
      hHistory: "賽事歷史", sHistory: "HISTORY", sCity: "CITY",
      hCourse: "路線與高度", sCourse: "COURSE",
      hMarks: "沿途景點", sMarks: "LANDMARKS",
      hMoments: "知名事件與紀錄", sMoments: "MOMENTS",
      profCaption: "在高度圖上拖曳，或用下方滑桿移動位置。虛線為半程。",
      sliderAria: "公里數",
      stStart: "起點", stHigh: "最高", stLow: "最低", stGain: "累計爬升", stLoss: "累計下降",
      srcRoute: "路線：", srcElev: "高度：",
      kind_official: "官方路線資料", kind_osm: "OpenStreetMap 賽道", kind_trace: "依官方路線圖重建", kind_sketch: "示意",
      sketchRoute: "依 2026 官方景點路線圖繪製的示意（2027 新路線尚未公布）", sketchElev: "示意",
      mapCaption: "{kind}・數字對應沿途景點・藍點為目前位置", mapSketch: "示意路線",
      mapAria: "{name}路線圖，起點{start}，終點{finish}",
      profAria: "{name}高度剖面，最高約 {hi} 公尺，最低約 {lo} 公尺",
      here: "此處：", nearest: "最近：",
      recMen: "男子賽道紀錄", recWomen: "女子賽道紀錄", recNote: "更新至 2026 年 11 月",
      noRecords: "{city}尚未以大滿貫身分舉行，賽道紀錄待 2027 年起整理。",
      kRecord: "紀錄", kMoment: "事件",
      emptyTitle: "這一區即將補上", emptyText: "{name}史上的經典時刻、世界紀錄與賽道紀錄會整理在這裡。",
      foot1: "本站為非官方的粉絲整理網站，與各馬拉松主辦單位及 Abbott World Marathon Majors 無關。實際路線、日期與規則請以各賽事官網為準。",
      foot2: "路線：依各賽事公布的官方路線圖，沿 OpenStreetMap 道路資料重建（公里數已換算為 42.195）；開普敦 2027 路線尚未公布，仍為示意。地圖資料 © {osm}，以 ODbL 授權。",
      foot3: "高度：美國三場取自 USGS 3DEP；倫敦、柏林取自 Copernicus EU-DEM；東京取自日本國土地理院（出典：国土地理院）；雪梨取自 NASA SRTM；經 OpenTopoData 取得並平滑處理。跨橋路段無法呈現橋面高度。所有高度圖使用相同垂直比例（{v} 公尺），可直接比較各場的起伏。",
      foot4: "賽道紀錄與事件更新至 2026 年 11 月。",
      privacy: "隱私權說明", cookieSettings: "分析 Cookie 設定",
      titleSep: "・",
      consentText: "本站想使用 Google Analytics 統計瀏覽量，會設定分析用 Cookie。",
      consentYes: "同意", consentNo: "不同意", consentAria: "分析 Cookie"
    },
    en: {
      langName: "English",
      brand: "Majors Course Atlas", brandSub: "WORLD MARATHON MAJORS",
      racesNav: "Races", langNav: "Language", overview: "Overview",
      homeTitle: "From six stars to eight",
      homeIntro: "The World Marathon Majors began in 2006 with five races and became the familiar “Big Six” once Tokyo joined. Sydney became the seventh in 2025, and Cape Town is confirmed as the eighth from 2027. There are {n} full members today, listed below in race-calendar order.",
      timelineH: "Series history", timelineSub: "",
      seasonH: "By season", seasonSub: "",
      cardMember: "Star {n} · joined {y}", cardJoins: "Joins {y}",
      joinedMember: "{y} (star {n})", joinedConfirmed: "{y} (confirmed)",
      starsAria: "Major number {n}",
      fFirst: "First held", fJoined: "Joined the Majors", fDate: "Race date", fShape: "Course type", fStart: "Start", fFinish: "Finish",
      jumpAria: "Sections on this page",
      jHistory: "History", jCity: "City", jCourse: "Course", jMarks: "Landmarks", jMoments: "Moments & records",
      hHistory: "History", sHistory: "", sCity: "",
      hCourse: "Course & elevation", sCourse: "",
      hMarks: "Landmarks", sMarks: "",
      hMoments: "Moments & records", sMoments: "",
      profCaption: "Drag across the profile or use the slider below. The dashed line marks halfway.",
      sliderAria: "Kilometre",
      stStart: "Start", stHigh: "High", stLow: "Low", stGain: "Total climb", stLoss: "Total descent",
      srcRoute: "Route: ", srcElev: "Elevation: ",
      kind_official: "Official route data", kind_osm: "OpenStreetMap course", kind_trace: "Rebuilt from the official map", kind_sketch: "Sketch",
      sketchRoute: "Sketch based on the official 2026 landmark map (the 2027 course is not published yet)", sketchElev: "Sketch",
      mapCaption: "{kind} · numbers match the landmarks · blue dot is your position", mapSketch: "Sketch route",
      mapAria: "{name} course map, from {start} to {finish}",
      profAria: "{name} elevation profile, high about {hi} m, low about {lo} m",
      here: "Here: ", nearest: "Nearest: ",
      recMen: "Men’s course record", recWomen: "Women’s course record", recNote: "Updated November 2026",
      noRecords: "{city} has not yet been run as a Major. Course records will follow from 2027.",
      kRecord: "Record", kMoment: "Moment",
      emptyTitle: "Coming soon", emptyText: "Famous moments, world records and course records from the {name} will be collected here.",
      foot1: "This is an unofficial fan site, not affiliated with any race organiser or with Abbott World Marathon Majors. Check each race’s official website for the actual course, dates and rules.",
      foot2: "Routes: rebuilt from each race’s published official course map using OpenStreetMap road data (distances scaled to 42.195 km). Cape Town’s 2027 course is not published yet and is still a sketch. Map data © {osm}, licensed under the ODbL.",
      foot3: "Elevation: USGS 3DEP for the three US races; Copernicus EU-DEM for London and Berlin; Geospatial Information Authority of Japan for Tokyo; NASA SRTM for Sydney; retrieved through OpenTopoData and smoothed. Bridge decks are not captured. Every profile uses the same vertical scale ({v} m), so races can be compared directly.",
      foot4: "Course records and moments updated November 2026.",
      privacy: "Privacy", cookieSettings: "Analytics cookie settings",
      titleSep: " · ",
      consentText: "This site would like to use Google Analytics to count visits, which sets analytics cookies.",
      consentYes: "Accept", consentNo: "Decline", consentAria: "Analytics cookies"
    },
    es: {
      langName: "Español",
      brand: "Atlas de los Majors", brandSub: "WORLD MARATHON MAJORS",
      racesNav: "Carreras", langNav: "Idioma", overview: "Inicio",
      homeTitle: "De seis estrellas a ocho",
      homeIntro: "Los World Marathon Majors nacieron en 2006 con cinco carreras y se convirtieron en los conocidos «seis grandes» con la llegada de Tokio. Sídney pasó a ser la séptima en 2025 y Ciudad del Cabo está confirmada como la octava a partir de 2027. Hoy hay {n} miembros de pleno derecho, ordenados abajo según el calendario.",
      timelineH: "Historia de la serie", timelineSub: "",
      seasonH: "Por temporada", seasonSub: "",
      cardMember: "Estrella {n} · desde {y}", cardJoins: "Se une en {y}",
      joinedMember: "{y} (estrella {n})", joinedConfirmed: "{y} (confirmada)",
      starsAria: "Major número {n}",
      fFirst: "Primera edición", fJoined: "Entrada en los Majors", fDate: "Fecha", fShape: "Tipo de recorrido", fStart: "Salida", fFinish: "Meta",
      jumpAria: "Secciones de esta página",
      jHistory: "Historia", jCity: "Ciudad", jCourse: "Recorrido", jMarks: "Puntos de interés", jMoments: "Momentos y récords",
      hHistory: "Historia", sHistory: "", sCity: "",
      hCourse: "Recorrido y altimetría", sCourse: "",
      hMarks: "Puntos de interés", sMarks: "",
      hMoments: "Momentos y récords", sMoments: "",
      profCaption: "Arrastra sobre el perfil o usa el control deslizante. La línea discontinua marca la media maratón.",
      sliderAria: "Kilómetro",
      stStart: "Salida", stHigh: "Máx.", stLow: "Mín.", stGain: "Desnivel positivo", stLoss: "Desnivel negativo",
      srcRoute: "Recorrido: ", srcElev: "Altitud: ",
      kind_official: "Datos oficiales", kind_osm: "Recorrido en OpenStreetMap", kind_trace: "Reconstruido del mapa oficial", kind_sketch: "Aproximado",
      sketchRoute: "Esquema basado en el mapa oficial de puntos de interés de 2026 (el recorrido de 2027 aún no se ha publicado)", sketchElev: "Aproximada",
      mapCaption: "{kind} · los números corresponden a los puntos de interés · el punto azul es tu posición", mapSketch: "Recorrido aproximado",
      mapAria: "Mapa del recorrido de {name}, de {start} a {finish}",
      profAria: "Perfil de {name}, máximo de unos {hi} m y mínimo de unos {lo} m",
      here: "Aquí: ", nearest: "Más cerca: ",
      recMen: "Récord masculino", recWomen: "Récord femenino", recNote: "Actualizado en noviembre de 2026",
      noRecords: "{city} aún no se ha corrido como Major. Los récords se recogerán a partir de 2027.",
      kRecord: "Récord", kMoment: "Momento",
      emptyTitle: "Próximamente", emptyText: "Aquí se reunirán los grandes momentos y récords de {name}.",
      foot1: "Este es un sitio no oficial hecho por aficionados, sin relación con los organizadores de las carreras ni con Abbott World Marathon Majors. Consulta la web oficial de cada carrera para el recorrido, las fechas y el reglamento.",
      foot2: "Recorridos: reconstruidos a partir del mapa oficial de cada carrera con datos viales de OpenStreetMap (distancias ajustadas a 42,195 km). El recorrido de Ciudad del Cabo para 2027 aún no se ha publicado y sigue siendo aproximado. Datos del mapa © {osm}, con licencia ODbL.",
      foot3: "Altitud: USGS 3DEP para las tres carreras de EE. UU.; Copernicus EU-DEM para Londres y Berlín; Autoridad de Información Geoespacial de Japón para Tokio; NASA SRTM para Sídney; obtenidos mediante OpenTopoData y suavizados. No se recoge la altura de los puentes. Todos los perfiles usan la misma escala vertical ({v} m), así que se pueden comparar directamente.",
      foot4: "Récords y momentos actualizados en noviembre de 2026.",
      privacy: "Privacidad", cookieSettings: "Ajustes de cookies de análisis",
      titleSep: " · ",
      consentText: "Este sitio quiere usar Google Analytics para contar las visitas, lo que instala cookies de análisis.",
      consentYes: "Aceptar", consentNo: "Rechazar", consentAria: "Cookies de análisis"
    }
  };

  window.I18N_UI = UI;
  window.t = function (key, vars) {
    var s = (UI[lang] && UI[lang][key] != null) ? UI[lang][key] : UI.en[key];
    if (s == null) return key;
    return String(s).replace(/\{(\w+)\}/g, function (_, k) { return vars && vars[k] != null ? vars[k] : ""; });
  };
  window.setSiteLang = function (l) {
    if (SUPPORTED.indexOf(l) < 0) return;
    try { localStorage.setItem("lang", l); } catch (e) {}
    var url = new URL(location.href);
    url.searchParams.set("lang", l);
    location.href = url.pathname + url.search + url.hash;
  };
})();
