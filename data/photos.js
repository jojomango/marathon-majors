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
 },
 "nyc": {
  "verrazzano": {
   "lat": 40.6066,
   "lon": -74.0447,
   "icon": "bridge",
   "img": "verrazzano.jpg",
   "credit": {
    "artist": "Kidfly182",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Verrazzano_Narrows_Bridge.jpg"
   }
  },
  "bayridge": {
   "lat": 40.6349,
   "lon": -74.0235,
   "icon": "station",
   "img": "bayridge.jpg",
   "credit": {
    "artist": "GK tramrunner RU",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:BMT_Fourth_Avenue_Line_-_Bay_Ridge_Avenue_Station_Entrance_(street_view).jpg"
   }
  },
  "fourthave": {
   "lat": 40.6768,
   "lon": -73.9835,
   "icon": "music",
   "img": "fourthave.jpg",
   "credit": {
    "artist": "Steven Pisano",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:NYC_2014_Marathon_Along_Fourth_Avenue_in_Brooklyn.jpg"
   }
  },
  "williamsburg": {
   "lat": 40.7071,
   "lon": -73.9644,
   "icon": "building",
   "img": "williamsburg.jpg",
   "credit": {
    "artist": "LWYang",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Bedford_Av_and_N_7_St_Williamsburg.jpg"
   }
  },
  "pulaski": {
   "lat": 40.7385,
   "lon": -73.9527,
   "icon": "bridge",
   "img": "pulaski.jpg",
   "credit": {
    "artist": "Jeffrey Bary",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Pulaski_Bridge_with_draw_span_open_(2017).jpg"
   }
  },
  "queensboro": {
   "lat": 40.757,
   "lon": -73.9544,
   "icon": "bridge",
   "img": "queensboro.jpg",
   "credit": {
    "artist": "King of Hearts",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Queensboro_Bridge_New_York_October_2016_003.jpg"
   }
  },
  "firstave": {
   "lat": 40.7676,
   "lon": -73.9562,
   "icon": "megaphone",
   "img": "firstave.jpg",
   "credit": {
    "artist": "Upjav",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "page": "https://commons.wikimedia.org/wiki/File:View_of_2024_New_York_City_Marathon_from_81st_St._and_1st_Ave._in_Manhattan.jpg"
   }
  },
  "willis": {
   "lat": 40.8027,
   "lon": -73.9302,
   "icon": "bridge",
   "img": "willis.jpg",
   "credit": {
    "artist": "Acroterion",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Willis_Avenue_Bridge_NY1.jpg"
   }
  },
  "madison": {
   "lat": 40.8155,
   "lon": -73.9343,
   "icon": "bridge",
   "img": "madison.jpg",
   "credit": {
    "artist": "Acroterion",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Madison_Avenue_Bridge_NY1.jpg"
   }
  },
  "fifthave": {
   "lat": 40.7925,
   "lon": -73.952,
   "icon": "museum",
   "img": "fifthave.jpg",
   "pos": "100% 100%",
   "size": "auto 160%",
   "credit": {
    "artist": "Beyond My Ken",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Museum_of_the_City_of_New_York_1220_Fifth_Avenue_from_north.jpg"
   }
  },
  "centralpark": {
   "lat": 40.7745,
   "lon": -73.9665,
   "icon": "park",
   "img": "centralpark.jpg",
   "credit": {
    "artist": "Superbass",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:2024-11-19-Central_Park-0669.jpg"
   }
  },
  "columbus": {
   "lat": 40.7681,
   "lon": -73.9819,
   "icon": "monument",
   "img": "columbus.jpg",
   "credit": {
    "artist": "TarHeel4793",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Columbus_Circle_in_New_York_City.jpg"
   }
  },
  "tavern": {
   "lat": 40.7722,
   "lon": -73.9776,
   "icon": "flag",
   "img": "tavern.jpg",
   "credit": {
    "artist": "Jim.henderson",
    "license": "Public domain",
    "licenseUrl": "",
    "page": "https://commons.wikimedia.org/wiki/File:Tavern_on_the_Green_cloudy_jeh.JPG"
   }
  }
 },
 "boston": {
  "hopkinton": {
   "lat": 42.2298,
   "lon": -71.5182,
   "icon": "flag",
   "img": "hopkinton.jpg",
   "credit": {
    "artist": "John Phelan",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Boston_Marathon_Starting_Line,_Hopkinton_MA.jpg"
   }
  },
  "framingham": {
   "lat": 42.2775,
   "lon": -71.4167,
   "icon": "station",
   "img": "framingham.jpg",
   "credit": {
    "artist": "Marc N. Belanger",
    "license": "Public domain",
    "licenseUrl": "",
    "page": "https://commons.wikimedia.org/wiki/File:Framingham_Railroad_Station.jpg"
   }
  },
  "wellesley": {
   "lat": 42.2962,
   "lon": -71.3047,
   "icon": "megaphone",
   "img": "wellesley.jpg",
   "credit": {
    "artist": "Ericshawwhite",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Wellesley_College.jpg"
   }
  },
  "lowerfalls": {
   "lat": 42.3268,
   "lon": -71.255,
   "icon": "river",
   "img": "lowerfalls.jpg",
   "credit": {
    "artist": "John Phelan",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "page": "https://commons.wikimedia.org/wiki/File:Charles_River,_Newton_Lower_Falls_MA.jpg"
   }
  },
  "firehouse": {
   "lat": 42.341,
   "lon": -71.2382
  },
  "heartbreak": {
   "lat": 42.3371,
   "lon": -71.173,
   "icon": "slope",
   "img": "heartbreak.jpg",
   "credit": {
    "artist": "Rob Larsen",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Yuki_Kawauchi_Boston_Marathon_Winner_on_Heartbreak_Hill_(41467754532).jpg"
   }
  },
  "bostoncollege": {
   "lat": 42.3357,
   "lon": -71.17,
   "icon": "building",
   "img": "bostoncollege.jpg",
   "credit": {
    "artist": "Amandajunyue",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Gasson_Hall_in_Boston_College.jpg"
   }
  },
  "coolidge": {
   "lat": 42.342,
   "lon": -71.1215,
   "icon": "building",
   "img": "coolidge.jpg",
   "credit": {
    "artist": "Ddogas",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "page": "https://commons.wikimedia.org/wiki/File:Intersection_of_Harvard_and_Beacon_Streets,_Coolidge_Corner,_Brookline,_MA.JPG"
   }
  },
  "citgo": {
   "lat": 42.3489,
   "lon": -71.0966,
   "icon": "sign",
   "img": "citgo.jpg",
   "credit": {
    "artist": "Beyond My Ken",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "page": "https://commons.wikimedia.org/wiki/File:2017_Citgo_sign_Kenmore_Square_Boston.jpg"
   }
  },
  "hereford": {
   "lat": 42.3483,
   "lon": -71.087
  },
  "copley": {
   "lat": 42.3499,
   "lon": -71.0781,
   "icon": "flag",
   "img": "copley.jpg",
   "credit": {
    "artist": "MáVëRíC",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "page": "https://commons.wikimedia.org/wiki/File:Boston_Marathon_Finish_line_(41017489080).jpg"
   }
  }
 }
};
