/*
  地圖景點設定：每個景點的實際位置、圖示與照片。
  - 鍵是 marathons.js 景點的 id
  - icon：圖示名稱（見 src/map.js 的 ICONS）；沒有 icon 的景點顯示編號圓點
  - img：src/img/{賽事}/ 下的照片；pos / size：圓形照片的取景（CSS background-position / size）
  - credit：Wikimedia Commons 的作者與授權，會顯示在地圖下方
*/
window.MAP_LANDMARKS = {
 "tokyo": {
  "tocho": {
   "lat": 35.6896,
   "lon": 139.6917,
   "icon": "building",
   "img": "tocho.jpg",
   "credit": {
    "artist": "Asanagi",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "page": "https://commons.wikimedia.org/wiki/File:Tokyo_Metropolitan_Government_Building_2022-03-02.jpg"
   }
  },
  "iidabashi": {
   "lat": 35.702,
   "lon": 139.745,
   "icon": "slope",
   "img": "iidabashi.jpg",
   "credit": {
    "artist": "Kabacchi",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Kagurazaka_street_2.jpg"
   }
  },
  "ueno": {
   "lat": 35.7078,
   "lon": 139.773,
   "icon": "market",
   "img": "ueno.jpg",
   "credit": {
    "artist": "Syced",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "page": "https://commons.wikimedia.org/wiki/File:Ameyoko_June_2022.jpg"
   }
  },
  "nihonbashi": {
   "lat": 35.684,
   "lon": 139.774,
   "icon": "bridge",
   "img": "nihonbashi.jpg",
   "credit": {
    "artist": "Phlizz",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Nihonbashi_Kirin_Statue.jpg"
   }
  },
  "kaminarimon": {
   "lat": 35.7111,
   "lon": 139.7964,
   "icon": "gate",
   "img": "kaminarimon.jpg",
   "credit": {
    "artist": "Bgabel",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "page": "https://commons.wikimedia.org/wiki/File:JP-tokio-sensoji-kaminarimon-gate.jpg"
   }
  },
  "kuramae": {
   "lat": 35.70097,
   "lon": 139.79352,
   "icon": "river",
   "img": "kuramae.jpg",
   "credit": {
    "artist": "Smanabu",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "page": "https://commons.wikimedia.org/wiki/File:Kuramae_Bridge_20050520.jpg"
   }
  },
  "ryogoku": {
   "lat": 35.6969,
   "lon": 139.7934,
   "icon": "sumo",
   "img": "ryogoku.jpg",
   "credit": {
    "artist": "Steve Cadman",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Ryogoku_Great_Sumo_Hall.jpg"
   }
  },
  "monzen": {
   "lat": 35.6717,
   "lon": 139.7993,
   "icon": "shrine",
   "img": "monzen.jpg",
   "credit": {
    "artist": "Manish Prabhune",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Tomioka_Hachimangu_in_Monzen-Nakacho.jpg"
   }
  },
  "ginza": {
   "lat": 35.6717,
   "lon": 139.765,
   "icon": "clock",
   "img": "ginza.jpg",
   "credit": {
    "artist": "Supanut Arunoprayote",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Ginza_Wako_20241021.jpg"
   }
  },
  "tamachi": {
   "lat": 35.646,
   "lon": 139.7465
  },
  "tokyotower": {
   "lat": 35.6586,
   "lon": 139.7454,
   "icon": "tower",
   "img": "tokyotower.jpg",
   "credit": {
    "artist": "Qian2007",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Tokyo_Tower_2024.jpg"
   }
  },
  "hibiya": {
   "lat": 35.674,
   "lon": 139.759,
   "icon": "palace",
   "img": "hibiya.jpg",
   "credit": {
    "artist": "Bohao Zhao",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "page": "https://commons.wikimedia.org/wiki/File:%E7%9A%87%E5%B1%85%E3%81%AE%E5%A0%80_Imperial_Palace_moat_-_panoramio.jpg"
   }
  },
  "tokyostation": {
   "lat": 35.6812,
   "lon": 139.7655,
   "icon": "station",
   "img": "tokyostation.jpg",
   "credit": {
    "artist": "Alexandr3126",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Tokyo_Station_(Marunouchi_Building).jpg"
   }
  }
 }
};
