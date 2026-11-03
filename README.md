# 大滿貫跑道誌 · Majors Course Atlas

世界馬拉松大滿貫（Abbott World Marathon Majors）各站的介紹網站：賽事歷史、城市簡介、路線圖、高度剖面、沿途景點、知名事件與賽道紀錄。手機優先設計，支援折疊螢幕（展開時路線與內容分在兩個螢幕段）。

- 網站：https://jojomango.github.io/marathon-majors/
- 收錄：東京、波士頓、倫敦、開普敦（2027 年加入）、雪梨、柏林、芝加哥、紐約
- 語言：中文（繁體）、English、Español

> 本站為非官方的粉絲整理網站，與各馬拉松主辦單位及 Abbott World Marathon Majors 無關。

## 網址結構

| 網址 | 內容 |
|---|---|
| `/` | 依語言自動轉到 `/zh/`、`/en/` 或 `/es/`（也處理舊的 `/#tokyo` 連結） |
| `/zh/`、`/en/`、`/es/` | 各語言首頁 |
| `/{語言}/{賽事}/` | 賽事頁，例如 `/en/boston/` |
| `/{語言}/privacy/` | 隱私權說明 |

賽事代號：`tokyo`、`boston`、`london`、`capetown`、`sydney`、`berlin`、`chicago`、`nyc`。

首頁 `/` 的語言判斷順序：網址參數 `?lang=` → 訪客在切換器選過的語言 → 瀏覽器語言清單（簡體、繁體中文都用中文，任何西班牙文用西文）→ 英文。已經在某個語言網址上就不再自動轉址。

## 建置

所有頁面在建置時預先產生成靜態 HTML，放在 `docs/`，GitHub Pages 從 `main` 分支的 `/docs` 發布。

```bash
npm install
npm run build
```

改完內容後重新建置，並把 `docs/` 一起 commit。

## 檔案

| 檔案 | 內容 |
|---|---|
| `data/marathons.js` | 各賽事的中文資料：歷史、城市、景點、事件、賽道紀錄（其他語言的基準） |
| `data/marathons.en.js`、`data/marathons.es.js` | 英文、西文翻譯，依中文資料的陣列順序對應 |
| `data/courses.js` | 路線與高度資料（由 `tools/` 的 Python 腳本產生） |
| `src/i18n.js` | 介面文字、頁面標題與描述 |
| `src/render.js` | 產生頁面 HTML |
| `src/geo.js` | 路線圖與高度圖的幾何計算（建置與瀏覽器共用） |
| `src/app.js` | 瀏覽器端互動：高度圖拖曳、景點點選 |
| `src/analytics.js`、`src/config.js` | 訪客同意後才載入的 GA4、評估 ID |
| `src/styles.css` | 樣式 |
| `src/privacy-content.html` | 三種語言的隱私權說明內容 |
| `build.js` | 建置腳本：頁面、sitemap、分享圖、圖示 |
| `docs/` | 建置結果（不要手動修改） |

## SEO

每頁都有獨立的標題與描述、canonical、三種語言的 hreflang（x-default 指向英文）、Open Graph 與 Twitter Card 分享資訊、結構化資料（WebSite、BreadcrumbList；2027 年日期已公布的賽事另有 SportsEvent）。`docs/sitemap.xml` 列出所有頁面與語言版本。

- **Search Console**：在 `build.js` 的 `SEARCH_CONSOLE_TOKEN` 填入 HTML 標記驗證碼後重新建置，再到 Search Console 提交 `https://jojomango.github.io/marathon-majors/sitemap.xml`。
- **robots.txt**：GitHub 專案網站位於子路徑，搜尋引擎只讀網域根目錄的 robots.txt，所以 `docs/robots.txt` 要改用自訂網域後才會生效。

## 新增事件或紀錄

在 `data/marathons.js` 該賽事的 `events` 加一筆，並在 `marathons.en.js`、`marathons.es.js` 同一位置加上 `[標題, 說明]`：

```js
{ year: 2027, kind: "record", title: "標題", text: "說明" }
```

`kind` 用 `record`（紀錄）或 `moment`（事件）。賽道紀錄在同一賽事的 `records`。三個檔案的 `history`、`milestones`、`landmarks`、`events` 必須維持相同的數量與順序。

## 啟用 Google Analytics

在 `src/config.js` 填入 GA4 評估 ID 後重新建置。留空時不會載入任何追蹤程式。訪客第一次造訪會看到同意提示，按「同意」才會載入 GA。

## 資料來源與授權

- **程式碼**：MIT License（見 `LICENSE`）。
- **路線資料（`data/courses.js`）**：依各賽事公布的官方路線圖，沿 OpenStreetMap 道路資料重建。地圖資料 © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)，以 [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/) 授權。
- **高度資料**：
  - 波士頓、芝加哥、紐約：USGS 3DEP（公有領域）
  - 倫敦、柏林：Copernicus EU-DEM（© European Union, Copernicus Land Monitoring Service）
  - 東京：日本國土地理院 標高 API（出典：国土地理院）
  - 雪梨：NASA SRTM（公有領域）
  - 透過 [OpenTopoData](https://www.opentopodata.org/) 取得
- **文字內容**（`data/marathons*.js` 的歷史、介紹、事件）：© 2026 jojomango，保留所有權利。
- 賽事名稱與商標屬於各自的權利人。
