# 大滿貫跑道誌

世界馬拉松大滿貫（Abbott World Marathon Majors）各站的介紹網站：賽事歷史、城市簡介、路線圖、高度剖面、沿途景點、知名事件與賽道紀錄。手機優先設計，支援折疊螢幕（展開時路線與內容分在兩個螢幕段）。

目前收錄：東京、波士頓、倫敦、開普敦（2027 年加入）、雪梨、柏林、芝加哥、紐約。

介面與內容提供中文（繁體）、English、Español 三種語言。

> 本站為非官方的粉絲整理網站，與各馬拉松主辦單位及 Abbott World Marathon Majors 無關。

## 檔案

| 檔案 | 內容 |
|---|---|
| `index.html` | 頁面、樣式與繪圖程式（路線圖、高度剖面） |
| `marathons.js` | 各賽事的中文資料：歷史、城市、景點、事件、賽道紀錄（也是其他語言的基準） |
| `marathons.en.js`、`marathons.es.js` | 英文、西文翻譯，依中文資料的陣列順序覆蓋文字 |
| `i18n.js` | 語言偵測與介面文字 |
| `courses.js` | 路線與高度資料（由 `tools/` 的腳本產生） |
| `config.js` | 網站設定，例如 Google Analytics 評估 ID |
| `analytics.js` | 訪客同意後才載入的 GA4 |
| `privacy.html` | 隱私權說明 |
| `tools/` | 產生 `courses.js` 的 Python 腳本 |

## 語言

依下列順序決定顯示語言：

1. 網址參數 `?lang=zh`、`?lang=en`、`?lang=es`
2. 訪客在右上角切換器選過的語言（存在瀏覽器）
3. 瀏覽器語言清單中第一個支援的語言：簡體、繁體中文都顯示中文，任何西班牙文顯示西文
4. 都不符合時顯示英文

新增或修改賽事內容時，`marathons.js` 與兩個翻譯檔的 `history`、`milestones`、`landmarks`、`events` 必須維持相同的數量與順序。

## 啟用 Google Analytics

在 `config.js` 填入 GA4 評估 ID：

```js
window.SITE_CONFIG = { gaMeasurementId: "G-XXXXXXXXXX" };
```

留空時不會載入任何追蹤程式。填入後，訪客第一次造訪會看到同意提示，按「同意」才會載入 GA；切換賽事分頁（`#tokyo` 等）會各自記錄一次瀏覽。

## 新增事件或紀錄

在 `marathons.js` 該賽事的 `events` 加一筆，並在 `marathons.en.js`、`marathons.es.js` 同一位置加上 `[標題, 說明]`：

```js
{ year: 2027, kind: "record", title: "標題", text: "說明" }
```

`kind` 用 `record`（紀錄）或 `moment`（事件）。賽道紀錄在同一賽事的 `records`。

## 資料來源與授權

- **程式碼**：MIT License（見 `LICENSE`）。
- **路線資料（`courses.js`）**：依各賽事公布的官方路線圖，沿 OpenStreetMap 道路資料重建。地圖資料 © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)，`courses.js` 以 [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/) 授權。
- **高度資料**：
  - 波士頓、芝加哥、紐約：USGS 3DEP（公有領域）
  - 倫敦、柏林：Copernicus EU-DEM（© European Union, Copernicus Land Monitoring Service）
  - 東京：日本國土地理院 標高 API（出典：国土地理院）
  - 雪梨：NASA SRTM（公有領域）
  - 透過 [OpenTopoData](https://www.opentopodata.org/) 取得
- **文字內容**（`marathons.js` 的歷史、介紹、事件）：© 2026 jojomango，保留所有權利。
- 賽事名稱與商標屬於各自的權利人。
