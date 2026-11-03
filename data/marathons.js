/*
  大滿貫馬拉松資料檔
  ------------------------------------------------------------
  每場賽事一個物件，依「賽季月份」排序。
  - 路線與高度在 courses.js（由實際路線資料產生）；開普敦尚無官方資料，
    仍在本檔以 route / elevation 提供示意
  - landmarks: { km, name, note }   沿途景點，依路線順序；有 courses.js 資料的賽事，
               km 會以實際路線上的位置覆蓋
  - records:   男女賽道紀錄 { time, name, year }，更新至 2026 年 11 月
  - events:    { year, kind, title, text }   知名事件與紀錄，依年份排列
               kind 可用 'record'（紀錄）或 'moment'（事件）
*/
window.MAJORS = [
  {
    id: "tokyo",
    code: "TYO",
    name: "東京馬拉松",
    en: "Tokyo Marathon",
    city: "東京",
    country: "日本",
    month: "3 月初",
    first: 2007,
    joined: 2013,
    status: "member",
    shape: "單向（新宿 → 東京車站），含多段折返",
    start: "東京都廳",
    finish: "東京車站 丸之內",
    history: [
      "東京馬拉松的前身是兩場菁英賽：1981 年開辦的東京國際馬拉松（男子），以及 1979 年開辦的東京國際女子馬拉松。2007 年整合為開放一般跑者參加的大型城市馬拉松，第一屆就吸引約三萬人起跑。",
      "2013 年東京成為大滿貫第六站，也是第一個亞洲成員。2017 年路線大改，終點從台場移到東京車站前的行幸通，路線變得更平、更快。2020 年因疫情只辦菁英組，2021 年賽事延至 2022 年 3 月舉行。"
    ],
    milestones: [
      [1981, "東京國際馬拉松開辦（菁英賽）"],
      [2007, "首屆大眾參與的東京馬拉松"],
      [2013, "加入世界馬拉松大滿貫"],
      [2017, "新路線啟用，終點改至東京車站"]
    ],
    cityIntro: [
      "東京是全球人口最多的都會區之一，從江戶時代的城下町發展為今日的首都。城市由新宿、銀座、淺草等各具性格的街區組成，傳統寺社與高樓並存。",
      "3 月初氣溫約 5–12°C，乾燥少雨，是長跑的理想季節。沿途補給與加油文化非常有名，常見民眾自備點心分送跑者。"
    ],
    profileNote: "依國土地理院 1 公尺雷射測量資料，起點新宿約 35 公尺，前 5 公里一路下坡到 10 公尺上下，之後幾乎都在海拔 10 公尺以下的下町平地，只有過橋處有小起伏。",
    landmarks: [
      { km: 0, name: "東京都廳", note: "雙塔建築前起跑，新宿高樓群為背景。" },
      { km: 5, name: "飯田橋・神樂坂", note: "沿外堀通前進，前段的下坡在這一帶結束。" },
      { km: 10, name: "上野廣小路", note: "中央通北端的折返點，鄰近上野公園與阿美橫町。" },
      { km: 13, name: "日本橋", note: "江戶時代五街道的起點，橋上有麒麟像。" },
      { km: 18, name: "淺草雷門", note: "大紅燈籠與仲見世通，可遠眺東京晴空塔，在此折返。" },
      { km: 21, name: "兩國", note: "相撲殿堂國技館就在附近，半程點位於清澄通。" },
      { km: 24, name: "門前仲町・富岡八幡宮", note: "在永代通短暫折返，下町氣氛最濃的一段。" },
      { km: 34, name: "銀座四丁目", note: "和光大樓鐘塔，名店街道兩側觀眾密集。" },
      { km: 38, name: "田町折返點", note: "第一京濱上的最南端折返，接著轉上日比谷通北返。" },
      { km: 39, name: "增上寺・東京鐵塔", note: "紅白鐵塔與古寺同框。" },
      { km: 41, name: "日比谷・皇居外苑", note: "沿護城河進入最後衝刺。" },
      { km: 42.195, name: "東京車站", note: "紅磚丸之內站舍前的行幸通終點。" }
    ],
    records: {
      men: { time: "2:02:16", name: "Benson Kipruto（肯亞）", year: 2024 },
      women: { time: "2:14:29", name: "Brigid Kosgei（肯亞）", year: 2026 }
    },
    events: [
      { year: 2007, kind: "moment", title: "首屆大眾馬拉松", text: "東京國際馬拉松與東京國際女子馬拉松整合，第一屆就有約三萬人起跑。" },
      { year: 2013, kind: "moment", title: "成為大滿貫第六站", text: "東京加入後，完成六場的跑者可取得「六星完賽者」認證（六星獎牌於 2016 年推出），大滿貫也第一次走出歐美。" },
      { year: 2020, kind: "moment", title: "疫情下只辦菁英組", text: "新冠疫情爆發，大眾組取消，只保留菁英選手比賽。" },
      { year: 2022, kind: "record", title: "Kipchoge 改寫賽道紀錄", text: "Eliud Kipchoge 以 2:02:40 奪冠，當時是日本境內最快的馬拉松成績。" },
      { year: 2024, kind: "record", title: "男子賽道紀錄 2:02:16", text: "Benson Kipruto 以 2:02:16 奪冠，女子組 Sutume Kebede 也以 2:15:55 創下當時的賽道紀錄。" },
      { year: 2026, kind: "record", title: "Kosgei 女子 2:14:29", text: "Brigid Kosgei 以 2:14:29 刷新女子賽道紀錄，也是在亞洲跑出的女子最快成績。男子組 Tadese Takele 衛冕。" }
    ]
  },
  {
    id: "boston",
    code: "BOS",
    name: "波士頓馬拉松",
    en: "Boston Marathon",
    city: "波士頓",
    country: "美國",
    month: "4 月（愛國者日）",
    first: 1897,
    joined: 2006,
    status: "member",
    shape: "單向（霍普金頓 → 波士頓）",
    start: "霍普金頓 Hopkinton",
    finish: "柯普利廣場 Boylston St",
    history: [
      "1897 年，受前一年雅典奧運馬拉松啟發，波士頓田徑協會（B.A.A.）舉辦第一屆比賽，只有 15 人起跑。它是世界上歷史最悠久、每年舉辦的馬拉松。",
      "比賽傳統上在麻州的愛國者日（4 月第三個星期一）舉行。1972 年起正式開放女性報名。波士頓以報名資格門檻（BQ）著稱，多數跑者必須先在其他馬拉松跑出規定成績才能參賽。"
    ],
    milestones: [
      [1897, "首屆比賽，15 人起跑"],
      [1924, "起點移至霍普金頓"],
      [1972, "正式開放女子組"],
      [2006, "大滿貫創始成員"]
    ],
    cityIntro: [
      "波士頓是美國最古老的城市之一，美國獨立革命的重要舞台，也是哈佛、MIT 等大學聚集的學術重鎮。",
      "路線穿越八個城鎮，從郊區小鎮一路跑進市中心。4 月中天候多變，曾出現酷熱，也曾遇上冷雨逆風。"
    ],
    profileNote: "起點霍普金頓約 137 公尺、終點約 3 公尺，整體淨下降超過 130 公尺；前段長下坡很傷股四頭肌，25–34 公里的牛頓丘陵連續爬升，最後一個就是心碎坡。",
    landmarks: [
      { km: 0, name: "霍普金頓起點", note: "小鎮綠地旁起跑，一開始就是陡下坡。" },
      { km: 10, name: "弗雷明漢", note: "沿 135 號公路經過老火車站。" },
      { km: 20, name: "衛斯理學院「尖叫隧道」", note: "女校學生在路邊尖叫加油，聲音隔幾百公尺就聽得到。" },
      { km: 25, name: "牛頓下瀑布", note: "跨越查爾斯河，丘陵段從這裡開始。" },
      { km: 28, name: "牛頓消防站右轉", note: "轉上聯邦大道，迎接連續上坡。" },
      { km: 33, name: "心碎坡 Heartbreak Hill", note: "長約 800 公尺的最後一個坡，名稱來自 1936 年的比賽。" },
      { km: 34, name: "波士頓學院", note: "坡頂後大學生的加油區。" },
      { km: 38.5, name: "庫利奇角", note: "布魯克萊恩的熱鬧路口。" },
      { km: 40.5, name: "肯莫爾廣場 Citgo 招牌", note: "芬威球場旁，看到招牌代表只剩約一英里。" },
      { km: 41.8, name: "右轉 Hereford、左轉 Boylston", note: "跑者口耳相傳的最後兩個轉彎。" },
      { km: 42.195, name: "柯普利廣場", note: "波士頓公共圖書館前的終點。" }
    ],
    records: {
      men: { time: "2:01:52", name: "John Korir（肯亞）", year: 2026 },
      women: { time: "2:19:59", name: "Buzunesh Deba（衣索比亞）", year: 2014 }
    },
    events: [
      { year: 1897, kind: "moment", title: "第一屆比賽", text: "15 人起跑，John J. McDermott 奪冠，是世界上最古老、每年舉辦的馬拉松。" },
      { year: 1966, kind: "moment", title: "第一位跑完的女性", text: "Bobbi Gibb 因報名被拒，躲在起點附近樹叢中混入起跑，以約 3 小時 21 分完賽。" },
      { year: 1967, kind: "moment", title: "Switzer 的號碼布", text: "Kathrine Switzer 以「K. V. Switzer」報名取得號碼布，賽中工作人員試圖扯下她的號碼，照片成為女性長跑史的象徵。女子組在 1972 年正式開放。" },
      { year: 1975, kind: "moment", title: "輪椅組的開端", text: "Bob Hall 以輪椅完賽，波士頓成為最早接納輪椅選手的馬拉松之一。" },
      { year: 1980, kind: "moment", title: "Rosie Ruiz 作弊事件", text: "第一個衝線的 Rosie Ruiz 被發現是在終點前不到一英里才混進比賽，冠軍被取消，改由 Jacqueline Gareau 獲得。" },
      { year: 2013, kind: "moment", title: "終點爆炸案", text: "4 月 15 日終點附近發生兩起爆炸，造成 3 人死亡、數百人受傷。「Boston Strong」成為城市重新站起來的口號。" },
      { year: 2014, kind: "moment", title: "Meb 為美國奪冠", text: "爆炸案隔年，Meb Keflezighi 奪下男子冠軍，是 1983 年以來第一位贏得波士頓的美國男性。" },
      { year: 2018, kind: "moment", title: "冷雨中的 Des Linden", text: "在寒冷暴雨與強風中，Des Linden 成為 1985 年以來第一位奪冠的美國女性。" },
      { year: 2020, kind: "moment", title: "史上首度停辦", text: "因疫情改為線上虛擬賽；2021 年比賽移到 10 月舉行。" },
      { year: 2026, kind: "record", title: "Korir 男子 2:01:52", text: "第 130 屆比賽，John Korir 以 2:01:52 打破 Geoffrey Mutai 自 2011 年保持的 2:03:02。女子組 Sharon Lokedi 連霸。" }
    ]
  },
  {
    id: "london",
    code: "LON",
    name: "倫敦馬拉松",
    en: "London Marathon",
    city: "倫敦",
    country: "英國",
    month: "4 月下旬",
    first: 1981,
    joined: 2006,
    status: "member",
    shape: "單向（格林威治 → 林蔭路）",
    start: "格林威治・布萊克希思",
    finish: "林蔭路 The Mall",
    history: [
      "前奧運障礙賽金牌選手 Chris Brasher 與 John Disley 在 1979 年跑完紐約馬拉松後，決定把同樣的城市馬拉松帶回倫敦。1981 年 3 月第一屆舉行，約七千人參加。",
      "倫敦馬拉松以慈善募款聞名，是全世界單日募款金額最高的年度活動，路上常見各式奇裝異服的慈善跑者。倫敦也誕生過多項世界紀錄，從 2003 年 Paula Radcliffe 的 2:15:25 到 2026 年 Sabastian Sawe 首度跑進 2 小時。"
    ],
    milestones: [
      [1981, "首屆倫敦馬拉松"],
      [2006, "大滿貫創始成員"],
      [2020, "疫情期間改為菁英繞圈賽"]
    ],
    cityIntro: [
      "倫敦是英國首都，泰晤士河貫穿市區，兩岸集中了塔橋、倫敦塔、西敏宮等兩千年歷史累積下來的建築。",
      "路線沿著泰晤士河由東往西，幾乎把倫敦最知名的地標串在一起。4 月下旬氣溫約 8–16°C。"
    ],
    profileNote: "起點布萊克希思約 45 公尺，前 3 公里明顯下坡，之後沿泰晤士河幾乎全平，海拔大多在 5–15 公尺之間。",
    landmarks: [
      { km: 0, name: "格林威治公園・布萊克希思", note: "分三個起點區出發，在約 5 公里處匯合。" },
      { km: 10.5, name: "卡蒂薩克號", note: "19 世紀運茶快船，周圍是第一個大型加油區。" },
      { km: 19.3, name: "倫敦塔橋", note: "最有名的一段，跨橋時觀眾聲浪最大。" },
      { km: 22, name: "半程・The Highway", note: "可看到另一側已跑到 35 公里的菁英選手。" },
      { km: 30, name: "金絲雀碼頭", note: "金融區摩天樓間繞行，GPS 常在此失準。" },
      { km: 36.5, name: "倫敦塔", note: "中世紀城堡旁回到市中心。" },
      { km: 38, name: "泰晤士河堤", note: "沿河看見倫敦眼。" },
      { km: 40.5, name: "大笨鐘・西敏宮", note: "國會大廈前轉入鳥籠道。" },
      { km: 41.7, name: "白金漢宮", note: "繞過維多利亞紀念碑。" },
      { km: 42.195, name: "林蔭路 The Mall", note: "紅色路面的終點直道。" }
    ],
    records: {
      men: { time: "1:59:30", name: "Sabastian Sawe（肯亞）", year: 2026 },
      women: { time: "2:15:25", name: "Paula Radcliffe（英國）", year: 2003 }
    },
    events: [
      { year: 1981, kind: "moment", title: "手牽手的冠軍", text: "第一屆比賽，Dick Beardsley 與 Inge Simonsen 手牽手一起衝線，並列男子冠軍。" },
      { year: 2003, kind: "record", title: "Radcliffe 2:15:25", text: "Paula Radcliffe 跑出 2:15:25 的女子世界紀錄，保持了 16 年，至今仍是倫敦女子賽道紀錄。" },
      { year: 2020, kind: "moment", title: "聖詹姆斯公園繞圈賽", text: "疫情期間比賽移到 10 月，只有菁英選手在聖詹姆斯公園的封閉環線上繞圈。" },
      { year: 2023, kind: "record", title: "Kiptum 2:01:25", text: "Kelvin Kiptum 以 2:01:25 奪冠，是當時史上第二快的馬拉松。" },
      { year: 2025, kind: "record", title: "女子單獨起跑世界紀錄", text: "Tigst Assefa 以 2:15:50 刷新「女子單獨起跑」世界紀錄。" },
      { year: 2026, kind: "record", title: "Sawe 首破 2 小時", text: "Sabastian Sawe 以 1:59:30 奪冠，成為第一個官方認可、跑進 2 小時的馬拉松世界紀錄；第二名 Yomif Kejelcha 也跑出 1:59:41。Assefa 再以 2:15:41 改寫女子單獨起跑世界紀錄。" }
    ]
  },
  {
    id: "capetown",
    code: "CPT",
    name: "開普敦馬拉松",
    en: "Sanlam Cape Town Marathon",
    city: "開普敦",
    country: "南非",
    month: "5 月（2027 起）",
    first: 2007,
    joined: 2027,
    status: "confirmed",
    shape: "環線（綠點出發、綠點回）",
    start: "綠點 Green Point",
    finish: "綠點 Green Point",
    history: [
      "開普敦馬拉松的源頭可追溯到 1990 年代的半島馬拉松，現行城市賽事一般以 2007 年為起點。2014 年起由 Sanlam 冠名。",
      "開普敦以候選身分接受大滿貫多年評估，主辦單位於 2026 年 6 月確認：開普敦將在 2027 年正式成為第八站，也是非洲第一個大滿貫。2027 年賽期改到 5 月（預定 5 月 23 日）。"
    ],
    milestones: [
      [2007, "現行城市馬拉松開辦"],
      [2014, "Sanlam 冠名"],
      [2026, "確認成為第八個大滿貫"],
      [2027, "以大滿貫身分首度舉行（5 月）"]
    ],
    cityIntro: [
      "開普敦位於南非西南端，背倚桌山，面向大西洋與桌灣，是南非的立法首都，也是非洲最熱門的旅遊城市之一。",
      "城市融合荷蘭、英國、馬來與非洲文化，彩色的波卡普街區正是這段歷史的縮影。改到 5 月後是南半球秋季，氣溫較 10 月更涼爽。"
    ],
    route: [
      [-33.9035, 18.4113, 0], [-33.9075, 18.4200, 1.5], [-33.9160, 18.4270, 2.9], [-33.9220, 18.4230, 3.5],
      [-33.9245, 18.4400, 5.5], [-33.9300, 18.4560, 7.3], [-33.9290, 18.4660, 8.7], [-33.9390, 18.4660, 9.7],
      [-33.9520, 18.4690, 11.0], [-33.9585, 18.4685, 11.8], [-33.9570, 18.4640, 12.7], [-33.9700, 18.4660, 14.0],
      [-33.9810, 18.4650, 15.5], [-33.9750, 18.4800, 17.2], [-33.9640, 18.4900, 19.0], [-33.9580, 18.4850, 20.5],
      [-33.9450, 18.4800, 22.5], [-33.9360, 18.4700, 24.5], [-33.9300, 18.4620, 26.0], [-33.9275, 18.4575, 27],
      [-33.9270, 18.4480, 27.9], [-33.9265, 18.4330, 29.8], [-33.9258, 18.4275, 30.2], [-33.9255, 18.4235, 31.3],
      [-33.9290, 18.4170, 32.6], [-33.9230, 18.4100, 34.0], [-33.9190, 18.3980, 35.5], [-33.9120, 18.3900, 37],
      [-33.8995, 18.4045, 39], [-33.9010, 18.4110, 40.5], [-33.9045, 18.4110, 42.195]
    ],
    elevation: [
      [0, 8], [3, 15], [6, 30], [9, 20], [13, 55], [15, 40], [19, 60], [21, 55],
      [25, 40], [29, 20], [34, 35], [36, 40], [39, 10], [42.195, 8]
    ],
    profileNote: "2027 年起改在 5 月舉行，官方尚未公布新路線。此處路線與高度為依 2026 官方景點路線圖繪製的示意，景點公里數取自該圖。",
    landmarks: [
      { km: 0, name: "開普敦體育場", note: "2010 世界盃球場，位於城市與大西洋之間，是路線上第一個地標。" },
      { km: 3.5, name: "桌山觀景點", note: "市中心路段，桌山就在正前方。" },
      { km: 8.7, name: "Rex Trueform 老工廠", note: "鹽河一帶的成衣工業地標，提醒跑者這是一座真實運作中的城市。" },
      { km: 11.8, name: "巴克斯特劇院", note: "1977 年啟用，種族隔離時期以接納不同族群觀眾聞名。" },
      { km: 12.7, name: "Groote Schuur 總統官邸", note: "1990 年曼德拉與戴克拉克在此簽署《Groote Schuur 備忘錄》。" },
      { km: 20.5, name: "朗德博斯公地", note: "40 公頃的開闊綠地，保存了瀕危的開普平原砂質硬葉灌木。" },
      { km: 27, name: "老餅乾工廠", note: "伍德斯托克的舊工廠改建，如今是設計小店與週末市集。" },
      { km: 30.2, name: "好望堡", note: "17 世紀荷蘭東印度公司的星形堡壘，保存最完整的同類要塞之一。" },
      { km: 31.3, name: "開普敦市政廳", note: "1905 年完工的愛德華式建築，曼德拉 1990 年出獄後在此陽台演說。" },
      { km: 37, name: "海角區 Sea Point", note: "經過溫徹斯特酒店與海濱步道，大西洋就在身旁。" },
      { km: 39, name: "綠點燈塔（穆耶角）", note: "1824 年點燈，南非仍在運作的最古老燈塔。" },
      { km: 42.195, name: "綠點終點", note: "回到體育場周邊完賽。" }
    ],
    events: [
      { year: 2014, kind: "moment", title: "Sanlam 冠名", text: "南非金融集團 Sanlam 成為冠名贊助商，賽事開始朝國際化發展。" },
      { year: 2026, kind: "moment", title: "確認成為第八個大滿貫", text: "主辦單位於 6 月宣布，開普敦將在 2027 年正式加入，成為非洲第一個大滿貫。" },
      { year: 2027, kind: "moment", title: "以大滿貫身分首度舉行", text: "賽期由 10 月改到 5 月，預定 2027 年 5 月 23 日舉行。" }
    ]
  },
  {
    id: "sydney",
    code: "SYD",
    name: "雪梨馬拉松",
    en: "Sydney Marathon",
    city: "雪梨",
    country: "澳洲",
    month: "8 月底／9 月初",
    first: 2001,
    joined: 2025,
    status: "member",
    shape: "單向（北雪梨 → 歌劇院）",
    start: "北雪梨 Miller St",
    finish: "雪梨歌劇院",
    history: [
      "雪梨馬拉松是 2000 年雪梨奧運的遺產，2001 年開辦，前幾屆沿用奧運馬拉松的路線精神，從北岸出發、跨越港灣大橋。",
      "雪梨以候選身分通過大滿貫的評估，2025 年 8 月 31 日以第七個大滿貫的身分首度舉行，也是第一個南半球的大滿貫。"
    ],
    milestones: [
      [2000, "雪梨奧運馬拉松"],
      [2001, "首屆雪梨馬拉松"],
      [2025, "成為第七個大滿貫"]
    ],
    cityIntro: [
      "雪梨是澳洲最大城市，城市沿著曲折的傑克森港展開，港灣大橋與歌劇院構成全世界最容易辨認的天際線之一。",
      "比賽在南半球冬末春初舉行，早晨涼爽約 10–18°C，但路線起伏比其他大滿貫明顯。"
    ],
    profileNote: "依 SRTM 地形資料：北雪梨起點約 90 公尺，過橋後下到港邊，中段往肯辛頓與百年紀念公園一帶在 30–50 公尺間反覆起伏，最後下坡到歌劇院。累計爬升是大滿貫中最多的之一。",
    landmarks: [
      { km: 0, name: "北雪梨", note: "Miller St 高處起跑，前方就是港灣大橋。" },
      { km: 2, name: "雪梨港灣大橋", note: "難得可以跑過大橋主橋面的機會。" },
      { km: 4, name: "巴蘭加魯", note: "新開發的港灣岸線與岩石區。" },
      { km: 8, name: "達令港・皮蒙特", note: "跨過皮蒙特大橋，海濱步道兩側觀眾密集。" },
      { km: 14, name: "海德公園", note: "市中心綠地與聖瑪麗大教堂。" },
      { km: 17, name: "摩爾公園", note: "雪梨板球場與足球場所在的體育園區。" },
      { km: 23, name: "肯辛頓・金斯福德折返點", note: "路線最南端，經過新南威爾斯大學一帶後折返。" },
      { km: 31, name: "百年紀念公園", note: "雪梨東區最大的公園，林蔭大道上起伏不斷。" },
      { km: 39, name: "麥覺理夫人座椅", note: "從這裡同時看見大橋與歌劇院。" },
      { km: 42.195, name: "雪梨歌劇院", note: "在帆形屋頂前完賽。" }
    ],
    records: {
      men: { time: "2:04:42", name: "Addisu Gobena（衣索比亞）", year: 2026 },
      women: { time: "2:18:22", name: "Sifan Hassan（荷蘭）", year: 2025 }
    },
    events: [
      { year: 2000, kind: "moment", title: "雪梨奧運馬拉松", text: "男子由衣索比亞的 Gezahegne Abera、女子由日本的高橋尚子奪金，路線從北雪梨跨越港灣大橋。" },
      { year: 2001, kind: "moment", title: "首屆雪梨馬拉松", text: "作為奧運遺產開辦，延續從北岸出發、跨橋進城的路線精神。" },
      { year: 2025, kind: "record", title: "以大滿貫身分首度登場", text: "8 月 31 日成為第七個大滿貫。Hailemaryam Kiros 以 2:06:06、Sifan Hassan 以 2:18:22 雙雙創下賽道紀錄。" },
      { year: 2026, kind: "record", title: "Gobena 男子 2:04:42", text: "Addisu Gobena 以 2:04:42 將男子賽道紀錄一口氣推進 84 秒；女子組 Peres Jepchirchir 以 2:18:31 大幅領先奪冠。" }
    ]
  },
  {
    id: "berlin",
    code: "BER",
    name: "柏林馬拉松",
    en: "Berlin Marathon",
    city: "柏林",
    country: "德國",
    month: "9 月下旬",
    first: 1974,
    joined: 2006,
    status: "member",
    shape: "環線（蒂爾加滕出發、回）",
    start: "6 月 17 日大街",
    finish: "布蘭登堡門後",
    history: [
      "1974 年 10 月，柏林馬拉松在西柏林郊外的格呂內瓦爾德森林首次舉行，只有兩百多人參加。1981 年改到市區街道。",
      "1990 年 9 月 30 日，兩德統一前三天，比賽第一次跑過布蘭登堡門，成為統一的象徵之一。柏林路線平坦、轉彎少、秋季氣溫穩定，是男子與女子世界紀錄最常誕生的賽道。"
    ],
    milestones: [
      [1974, "首屆於格呂內瓦爾德森林舉行"],
      [1981, "移至市區街道"],
      [1990, "首次穿越布蘭登堡門"],
      [2006, "大滿貫創始成員"]
    ],
    cityIntro: [
      "柏林是德國首都，冷戰時期被圍牆分隔近三十年。今天的城市把歷史留在街頭：圍牆遺跡、國會大廈、查理檢查哨都是日常風景。",
      "9 月下旬氣溫約 10–18°C，加上平坦的路面，是追求個人最佳成績（PB）的首選。"
    ],
    profileNote: "全程海拔都在 35–55 公尺之間，最高處在南端野豬廣場一帶（約 28 公里），幾乎感覺不到坡度，這是世界紀錄頻繁出現的主因之一。",
    landmarks: [
      { km: 0, name: "6 月 17 日大街・勝利紀念柱", note: "蒂爾加滕公園中的寬闊大道起跑。" },
      { km: 6, name: "國會大廈・總理府", note: "施普雷河畔的政府區。" },
      { km: 9, name: "亞歷山大廣場・電視塔", note: "前東柏林的中心。" },
      { km: 15, name: "十字山 Kreuzberg", note: "街頭樂隊與多元移民街區。" },
      { km: 24, name: "舍訥貝格市政廳", note: "1963 年甘迺迪「我是柏林人」演說的地點。" },
      { km: 27, name: "野豬廣場 Wilder Eber", note: "南端最熱鬧的加油點。" },
      { km: 35, name: "選帝侯大街・威廉皇帝紀念教堂", note: "保留戰爭毀損鐘樓的教堂。" },
      { km: 38.5, name: "波茨坦廣場", note: "曾被圍牆一分為二的廣場，地面標有圍牆線。" },
      { km: 40, name: "御林廣場", note: "兩座對稱教堂與音樂廳。" },
      { km: 41.9, name: "布蘭登堡門", note: "穿過城門後就是終點。" },
      { km: 42.195, name: "終點", note: "6 月 17 日大街上完賽。" }
    ],
    records: {
      men: { time: "2:01:09", name: "Eliud Kipchoge（肯亞）", year: 2022 },
      women: { time: "2:11:04", name: "Tigst Assefa（衣索比亞）", year: 2026 }
    },
    events: [
      { year: 1974, kind: "moment", title: "森林裡的第一屆", text: "在格呂內瓦爾德森林舉行，只有兩百多人參加。" },
      { year: 1990, kind: "moment", title: "穿越布蘭登堡門", text: "兩德統一前三天，跑者第一次穿過布蘭登堡門。" },
      { year: 1998, kind: "record", title: "柏林第一個男子世界紀錄", text: "巴西的 Ronaldo da Costa 跑出 2:06:05，開啟柏林作為世界紀錄賽道的時代。" },
      { year: 2001, kind: "record", title: "女子首度跑進 2:20", text: "日本的高橋尚子以 2:19:46 成為第一位跑進 2 小時 20 分的女性。" },
      { year: 2003, kind: "record", title: "男子首度跑進 2:05", text: "Paul Tergat 以 2:04:55 改寫世界紀錄。" },
      { year: 2008, kind: "record", title: "Gebrselassie 2:03:59", text: "Haile Gebrselassie 連續兩年在柏林改寫世界紀錄，第二次成為第一個跑進 2:04 的人。" },
      { year: 2014, kind: "record", title: "男子首度跑進 2:03", text: "Dennis Kimetto 以 2:02:57 改寫世界紀錄。" },
      { year: 2022, kind: "record", title: "Kipchoge 2:01:09", text: "Eliud Kipchoge 在柏林第二度改寫世界紀錄，至今仍是柏林男子賽道紀錄。" },
      { year: 2023, kind: "record", title: "Assefa 2:11:53", text: "Tigst Assefa 將女子世界紀錄一口氣推進兩分多鐘。" },
      { year: 2026, kind: "record", title: "Assefa 2:11:04", text: "Assefa 第三度在柏林奪冠，以 2:11:04 刷新賽道紀錄，距離世界紀錄只差約 68 秒。男子組由 Guye Adola 以 2:02:50 奪冠。" }
    ]
  },
  {
    id: "chicago",
    code: "CHI",
    name: "芝加哥馬拉松",
    en: "Chicago Marathon",
    city: "芝加哥",
    country: "美國",
    month: "10 月上旬",
    first: 1977,
    joined: 2006,
    status: "member",
    shape: "環線（格蘭特公園出發、回）",
    start: "格蘭特公園",
    finish: "格蘭特公園",
    history: [
      "現代的芝加哥馬拉松始於 1977 年，當時名為「戴利市長馬拉松」，約四千人參加。賽事在 1980 年代一度因財務問題停辦，之後重新出發。",
      "如今芝加哥以平坦、規模大、補給完整聞名，路線穿越 29 個社區，也是男子與女子世界紀錄曾誕生的賽道。"
    ],
    milestones: [
      [1977, "首屆戴利市長馬拉松"],
      [1987, "改為半馬，隔年恢復全馬"],
      [2006, "大滿貫創始成員"]
    ],
    cityIntro: [
      "芝加哥位於密西根湖西南岸，是美國第三大城。1871 年大火後重建，誕生了世界第一批摩天大樓，至今仍是建築迷的朝聖地。",
      "10 月上旬早晨約 8–15°C，但湖畔天氣變化快，曾發生過熱而提前停賽的情況。"
    ],
    profileNote: "全程海拔只在 177–184 公尺之間變化，幾乎全平；最後 400 公尺的羅斯福路橋是唯一明顯的坡，被戲稱為「羅斯福山」。",
    landmarks: [
      { km: 0, name: "格蘭特公園・白金漢噴泉", note: "湖畔大公園內起跑。" },
      { km: 2, name: "環區 The Loop", note: "高架鐵路與摩天樓峽谷，GPS 常在此飄移。" },
      { km: 8, name: "林肯公園", note: "動物園與湖畔綠地。" },
      { km: 12, name: "湖景區北折返", note: "路線最北端。" },
      { km: 16, name: "老城區 Old Town", note: "維多利亞式街屋。" },
      { km: 20, name: "西環區・希臘城", note: "半程附近的餐廳街。" },
      { km: 22.5, name: "聯合中心", note: "公牛隊主場外折返。" },
      { km: 29, name: "皮爾森", note: "墨西哥裔社區，滿牆彩色壁畫。" },
      { km: 34, name: "華埠", note: "牌樓與舞獅加油。" },
      { km: 37, name: "布朗茲維", note: "非裔美國人文化重鎮。" },
      { km: 41.8, name: "羅斯福山", note: "最後的短上坡。" },
      { km: 42.195, name: "格蘭特公園終點", note: "回到湖畔完賽。" }
    ],
    records: {
      men: { time: "2:00:35", name: "Kelvin Kiptum（肯亞）", year: 2023 },
      women: { time: "2:09:56", name: "Ruth Chepngetich（肯亞）", year: 2024 }
    },
    events: [
      { year: 1977, kind: "moment", title: "首屆戴利市長馬拉松", text: "約四千人參加，開啟現代芝加哥馬拉松。" },
      { year: 1985, kind: "record", title: "Jones 與 Benoit Samuelson", text: "Steve Jones 跑出 2:07:13，只差 1 秒就是世界紀錄；Joan Benoit Samuelson 以 2:21:21 創下美國紀錄。" },
      { year: 1999, kind: "record", title: "Khannouchi 2:05:42", text: "Khalid Khannouchi 在芝加哥改寫男子世界紀錄。" },
      { year: 2002, kind: "record", title: "Radcliffe 2:17:18", text: "Paula Radcliffe 在芝加哥改寫女子世界紀錄，隔年又在倫敦再度刷新。" },
      { year: 2007, kind: "moment", title: "熱浪中斷比賽", text: "氣溫異常炎熱，主辦單位在開賽約三個半小時後下令停止比賽。" },
      { year: 2019, kind: "record", title: "Kosgei 2:14:04", text: "Brigid Kosgei 打破 Radcliffe 保持 16 年的女子世界紀錄。" },
      { year: 2023, kind: "record", title: "Kiptum 2:00:35", text: "Kelvin Kiptum 跑出男子世界紀錄。他在 2024 年 2 月因車禍過世，年僅 24 歲。" },
      { year: 2024, kind: "record", title: "Chepngetich 2:09:56", text: "Ruth Chepngetich 成為第一位跑進 2 小時 10 分的女性。她在 2025 年因禁藥違規遭禁賽三年，這項成績目前仍列為世界紀錄。" },
      { year: 2026, kind: "moment", title: "Kipruto 2:01:09", text: "Amos Kipruto 以芝加哥史上第二快的成績奪冠；女子組 Hawi Feysa 連霸。" }
    ]
  },
  {
    id: "nyc",
    code: "NYC",
    name: "紐約市馬拉松",
    en: "New York City Marathon",
    city: "紐約",
    country: "美國",
    month: "11 月第一個星期日",
    first: 1970,
    joined: 2006,
    status: "member",
    shape: "單向（史泰登島 → 中央公園）",
    start: "史泰登島",
    finish: "中央公園",
    history: [
      "1970 年，Fred Lebow 與 Vince Chiappetta 在中央公園繞圈舉辦第一屆，127 人起跑、55 人完賽，報名費只要 1 美元。",
      "1976 年為慶祝美國建國兩百週年，路線擴大為穿越五大行政區，從此成為現在的形式。紐約如今是全世界規模最大的馬拉松之一，完賽人數超過五萬五千人。"
    ],
    milestones: [
      [1970, "中央公園繞圈的首屆比賽"],
      [1976, "首次穿越五大行政區"],
      [2006, "大滿貫創始成員"],
      [2012, "因颶風珊迪取消"]
    ],
    cityIntro: [
      "紐約由曼哈頓、布魯克林、皇后區、布朗克斯與史泰登島五個行政區組成，是美國最大城市與全球金融、文化中心。",
      "比賽跨越五座大橋，每一區都有不同的族裔社區與加油風格。11 月初早晨約 5–12°C，起點等候區常常很冷。"
    ],
    profileNote: "地形資料只記錄地面，五座橋上的路段會顯示成接近水面的高度。實際上起點的韋拉札諾大橋與第 25 公里的皇后區大橋都是明顯的長上坡，最後在第五大道與中央公園還有一段緩坡。",
    landmarks: [
      { km: 0, name: "韋拉札諾海峽大橋", note: "砲聲響起後在雙層大橋上起跑，俯瞰紐約港。" },
      { km: 4, name: "貝瑞吉", note: "進入布魯克林，觀眾開始湧現。" },
      { km: 11, name: "布魯克林第四大道", note: "筆直長路，樂團一個接一個。" },
      { km: 19, name: "威廉斯堡", note: "哈西德猶太社區與文青街區相鄰。" },
      { km: 21.1, name: "普拉斯基橋（半程）", note: "跨入皇后區。" },
      { km: 25, name: "皇后區大橋", note: "沒有觀眾的長橋，只聽得到腳步聲。" },
      { km: 26.5, name: "第一大道「聲牆」", note: "下橋瞬間的歡呼聲是紐約最有名的一刻。" },
      { km: 32, name: "威利斯大道橋・布朗克斯", note: "短暫進入第五個行政區。" },
      { km: 34, name: "麥迪遜大道橋", note: "回到曼哈頓哈林區。" },
      { km: 37.5, name: "第五大道", note: "博物館大道旁的緩長上坡。" },
      { km: 40, name: "中央公園", note: "林間起伏路段。" },
      { km: 41.5, name: "哥倫布圓環", note: "最後折回公園。" },
      { km: 42.195, name: "綠苑酒廊 Tavern on the Green", note: "中央公園西側的終點。" }
    ],
    records: {
      men: { time: "2:04:58", name: "Tamirat Tola（衣索比亞）", year: 2023 },
      women: { time: "2:19:51", name: "Hellen Obiri（肯亞）", year: 2025 }
    },
    events: [
      { year: 1970, kind: "moment", title: "中央公園的第一屆", text: "127 人起跑、55 人完賽，冠軍是 Gary Muhrcke，報名費 1 美元。" },
      { year: 1976, kind: "moment", title: "穿越五大行政區", text: "為慶祝美國建國兩百週年，路線擴大為今天的五區路線。" },
      { year: 1978, kind: "record", title: "Grete Waitz 的第一冠", text: "挪威的 Grete Waitz 首度參賽就以世界紀錄奪冠，之後共拿下 9 座紐約冠軍。" },
      { year: 2009, kind: "moment", title: "Meb 為美國奪冠", text: "Meb Keflezighi 成為 1982 年以來第一位贏得紐約的美國男性。" },
      { year: 2012, kind: "moment", title: "颶風珊迪停辦", text: "颶風重創紐約，比賽在前兩天宣布取消。" },
      { year: 2017, kind: "moment", title: "Flanagan 的勝利", text: "Shalane Flanagan 成為 1977 年以來第一位贏得紐約的美國女性。" },
      { year: 2023, kind: "record", title: "Tola 2:04:58", text: "Tamirat Tola 以 2:04:58 創下男子賽道紀錄。" },
      { year: 2025, kind: "record", title: "Obiri 2:19:51", text: "Hellen Obiri 以 2:19:51 創下女子賽道紀錄，第一次有女性在紐約跑進 2:20。" },
      { year: 2026, kind: "moment", title: "Almgren 首馬奪冠", text: "瑞典的 Andreas Almgren 第一次跑馬拉松就以 2:06:01 奪冠；女子組 Sheila Chepkirui 第二度封后。" }
    ]
  }
];

// 系列本身的沿革，首頁時間軸使用
window.MAJORS_TIMELINE = [
  { year: 2006, title: "五場創始", text: "波士頓、倫敦、柏林、芝加哥、紐約組成世界馬拉松大滿貫。" },
  { year: 2013, title: "東京加入", text: "第六站，大滿貫第一次走出歐美。完成六場的跑者可取得「六星完賽者」認證，六星獎牌則在 2016 年推出。" },
  { year: 2025, title: "雪梨加入", text: "第七站，第一個南半球大滿貫。" },
  { year: 2027, title: "開普敦加入", text: "2026 年 6 月確認為第八站，非洲第一個大滿貫。" },
  { year: 2026, title: "上海候選中", text: "2026 年 12 月 6 日的比賽將進行第二次評估，通過後可望成為第九站。", pending: true }
];
