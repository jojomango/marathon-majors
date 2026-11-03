/*
  English text for marathons.js.
  Arrays follow the same order as the Chinese data: milestones, landmarks
  ([name, note]), events ([title, text]) and records ([men, women]).
*/
window.MAJORS_I18N = window.MAJORS_I18N || {};
window.MAJORS_I18N.en = {
  timeline: [
    ["Five founding races", "Boston, London, Berlin, Chicago and New York form the World Marathon Majors."],
    ["Tokyo joins", "The sixth Major and the first outside Europe and North America. Runners who complete all six can now earn Six Star Finisher status; the Six Star Medal followed in 2016."],
    ["Sydney joins", "The seventh race and the first Major in the Southern Hemisphere."],
    ["Cape Town joins", "Confirmed in June 2026 as the eighth race and Africa’s first Major."],
    ["Shanghai under review", "Its 6 December 2026 race is the second assessment. If it passes, it could become the ninth Major."]
  ],
  races: {
    tokyo: {
      name: "Tokyo Marathon", city: "Tokyo", country: "Japan", month: "Early March",
      shape: "Point-to-point (Shinjuku → Tokyo Station), with several out-and-backs",
      start: "Tokyo Metropolitan Government Building", finish: "Tokyo Station, Marunouchi side",
      history: [
        "The Tokyo Marathon grew out of two elite races: the Tokyo International Marathon for men, first held in 1981, and the Tokyo International Women’s Marathon, first held in 1979. In 2007 they were merged into a mass-participation city marathon, and about 30,000 runners started the first edition.",
        "In 2013 Tokyo became the sixth Major and the first in Asia. A new course in 2017 moved the finish from Odaiba to Gyoko-dori in front of Tokyo Station, making the race flatter and faster. In 2020 the pandemic limited the race to elites, and the 2021 edition was postponed to March 2022."
      ],
      milestones: ["Tokyo International Marathon launched (elite race)", "First mass-participation Tokyo Marathon", "Joins the World Marathon Majors", "New course; finish moves to Tokyo Station"],
      cityIntro: [
        "Tokyo is one of the most populous metropolitan areas in the world, grown from an Edo-era castle town into today’s capital. It is a patchwork of districts with their own character, such as Shinjuku, Ginza and Asakusa, where old temples and shrines stand next to towers.",
        "Early March brings dry weather and temperatures of about 5–12°C, ideal for distance running. The aid stations and crowd support are famous, and spectators often hand out snacks they brought from home."
      ],
      profileNote: "Based on the Geospatial Information Authority of Japan’s 1 m lidar data: the start in Shinjuku sits at about 35 m and the first 5 km run downhill to around 10 m. After that the course stays almost entirely below 10 m in the low-lying shitamachi districts, with small rises only at bridges.",
      landmarks: [
        ["Tokyo Metropolitan Government Building", "The start, in front of the twin towers with Shinjuku’s skyscrapers behind."],
        ["Iidabashi & Kagurazaka", "Along Sotobori-dori, where the opening downhill levels out."],
        ["Ueno-hirokoji", "The turnaround at the north end of Chuo-dori, near Ueno Park and Ameyoko market."],
        ["Nihonbashi", "The starting point of the Edo-period highways, guarded by bronze kirin statues."],
        ["Kaminarimon, Asakusa", "The giant red lantern and Nakamise street, with Tokyo Skytree in view. The course turns here."],
        ["Ryogoku", "Home of the sumo arena Kokugikan. Halfway falls on Kiyosumi-dori."],
        ["Monzen-nakacho & Tomioka Hachimangu", "A short out-and-back on Eitai-dori through the most old-Tokyo stretch."],
        ["Ginza 4-chome", "The Wako clock tower, with deep crowds lining the shopping street."],
        ["Tamachi turnaround", "The southernmost point, on Daiichi Keihin, before the course heads north on Hibiya-dori."],
        ["Zojoji & Tokyo Tower", "The red-and-white tower and the old temple in one view."],
        ["Hibiya & Imperial Palace Outer Garden", "Along the moat into the final push."],
        ["Tokyo Station", "The finish on Gyoko-dori, facing the red-brick Marunouchi station building."]
      ],
      events: [
        ["First mass-participation race", "The Tokyo International Marathon and the women’s marathon merge, and about 30,000 runners start the first edition."],
        ["Becomes the sixth Major", "With Tokyo on board, runners who complete all six can earn Six Star Finisher status, and the Six Star Medal followed in 2016. It is the first Major outside Europe and North America."],
        ["Elite-only race in the pandemic", "With COVID-19 spreading, the mass race is cancelled and only elite athletes compete."],
        ["Kipchoge breaks the course record", "Eliud Kipchoge wins in 2:02:40, the fastest marathon ever run in Japan at the time."],
        ["Men’s course record 2:02:16", "Benson Kipruto wins in 2:02:16, and Sutume Kebede sets the women’s course record of the time with 2:15:55."],
        ["Kosgei runs 2:14:29", "Brigid Kosgei breaks the women’s course record with 2:14:29, also the fastest women’s marathon run in Asia. Tadese Takele defends his men’s title."]
      ],
      records: ["Benson Kipruto (Kenya)", "Brigid Kosgei (Kenya)"],
      source: ["Rebuilt from the official Tokyo Marathon course map (2026) on OpenStreetMap streets", "Geospatial Information Authority of Japan 1 m lidar terrain"]
    },
    boston: {
      name: "Boston Marathon", city: "Boston", country: "United States", month: "April (Patriots’ Day)",
      shape: "Point-to-point (Hopkinton → Boston)",
      start: "Hopkinton", finish: "Copley Square, Boylston St",
      history: [
        "Inspired by the marathon at the 1896 Athens Olympics, the Boston Athletic Association (B.A.A.) held the first race in 1897 with just 15 starters. It is the world’s oldest annual marathon.",
        "The race is traditionally held on Patriots’ Day in Massachusetts, the third Monday in April. Women were officially allowed to enter from 1972. Boston is known for its qualifying times (runners call it a “BQ”): most runners must first run a set time at another marathon to get in."
      ],
      milestones: ["First race, 15 starters", "Start moves to Hopkinton", "Women officially admitted", "Founding member of the Majors"],
      cityIntro: [
        "Boston is one of the oldest cities in the United States, a key stage of the American Revolution and an academic centre home to Harvard and MIT.",
        "The course passes through eight cities and towns, from small suburbs into downtown. Mid-April weather is unpredictable: the race has seen both heat waves and cold rain with headwinds."
      ],
      profileNote: "The start in Hopkinton is at about 137 m and the finish at about 3 m, a net drop of more than 130 m. The long early descent punishes the quads, and the Newton Hills between 25 and 34 km climb one after another, the last one being Heartbreak Hill.",
      landmarks: [
        ["Hopkinton start", "The race starts by the town common and goes straight into a steep downhill."],
        ["Framingham", "Along Route 135 past the old train depot."],
        ["Wellesley College “Scream Tunnel”", "Students line the road and cheer so loudly you can hear them hundreds of metres away."],
        ["Newton Lower Falls", "The crossing of the Charles River, where the hills begin."],
        ["Right turn at the Newton firehouse", "Onto Commonwealth Avenue and a run of climbs."],
        ["Heartbreak Hill", "The last hill, about 800 m long, which earned its name in the 1936 race."],
        ["Boston College", "Student crowds just past the top of the hill."],
        ["Coolidge Corner", "A busy intersection in Brookline."],
        ["Kenmore Square & the Citgo sign", "Next to Fenway Park. Seeing the sign means about one mile to go."],
        ["Right on Hereford, left on Boylston", "The two final turns every Boston runner knows by heart."],
        ["Copley Square", "The finish, in front of the Boston Public Library."]
      ],
      events: [
        ["The first race", "John J. McDermott wins among 15 starters. It is the world’s oldest annual marathon."],
        ["The first woman to finish", "Refused an entry, Bobbi Gibb hides in bushes near the start, joins the field and finishes in about 3 hours 21 minutes."],
        ["Switzer’s race bib", "Kathrine Switzer enters as “K. V. Switzer” and gets a bib. An official tries to rip it off during the race, and the photos become a symbol for women’s distance running. The women’s race becomes official in 1972."],
        ["The wheelchair division begins", "Bob Hall finishes in a wheelchair, making Boston one of the first marathons to welcome wheelchair athletes."],
        ["Rosie Ruiz cheats", "The first woman across the line, Rosie Ruiz, turns out to have jumped into the race less than a mile from the finish. Her title is stripped and given to Jacqueline Gareau."],
        ["Finish-line bombing", "On 15 April two bombs explode near the finish, killing 3 people and injuring hundreds. “Boston Strong” becomes the city’s rallying cry."],
        ["Meb wins for the US", "A year after the bombing, Meb Keflezighi wins the men’s race, the first American man to win Boston since 1983."],
        ["Des Linden in the cold rain", "In freezing rain and strong winds, Des Linden becomes the first American woman to win since 1985."],
        ["Cancelled for the first time", "The pandemic turns the race into a virtual event. In 2021 it moves to October."],
        ["Korir runs 2:01:52", "At the 130th race, John Korir wins in 2:01:52, breaking the 2:03:02 Geoffrey Mutai had held since 2011. Sharon Lokedi wins the women’s race for the second year running."]
      ],
      records: ["John Korir (Kenya)", "Buzunesh Deba (Ethiopia)"],
      source: ["Boston Marathon course as mapped in OpenStreetMap (checked against the B.A.A. 2026 course map)", "USGS 3DEP 10 m terrain"]
    },
    london: {
      name: "London Marathon", city: "London", country: "United Kingdom", month: "Late April",
      shape: "Point-to-point (Greenwich → The Mall)",
      start: "Greenwich & Blackheath", finish: "The Mall",
      history: [
        "After running the New York City Marathon in 1979, former Olympic steeplechase champion Chris Brasher and John Disley set out to bring a city marathon to London. The first race was held in March 1981 with about 7,000 runners.",
        "London is famous for charity fundraising and is the world’s largest annual one-day fundraising event, with runners in every kind of costume. It has also produced several world records, from Paula Radcliffe’s 2:15:25 in 2003 to Sabastian Sawe’s first sub-two-hour run in 2026."
      ],
      milestones: ["First London Marathon", "Founding member of the Majors", "Elite-only loop race during the pandemic"],
      cityIntro: [
        "London is the capital of the United Kingdom. The Thames runs through the city, lined with two thousand years of history from Tower Bridge and the Tower of London to the Palace of Westminster.",
        "The course follows the Thames from east to west and strings together almost all of London’s best-known landmarks. Late-April temperatures are about 8–16°C."
      ],
      profileNote: "The start on Blackheath is at about 45 m with a clear downhill over the first 3 km. After that the course is nearly flat along the Thames, mostly between 5 and 15 m.",
      landmarks: [
        ["Greenwich Park & Blackheath", "Three separate starts that merge at about 5 km."],
        ["Cutty Sark", "A 19th-century tea clipper surrounded by the first big crowd."],
        ["Tower Bridge", "The most famous stretch, with the loudest crowds as runners cross the bridge."],
        ["Halfway on The Highway", "Here you can see the elites on the other side, already at 35 km."],
        ["Canary Wharf", "A loop among the financial district’s towers, where GPS watches often lose track."],
        ["Tower of London", "Back into the centre past the medieval fortress."],
        ["Victoria Embankment", "Along the river with the London Eye in view."],
        ["Big Ben & Palace of Westminster", "Past Parliament and onto Birdcage Walk."],
        ["Buckingham Palace", "Around the Victoria Memorial."],
        ["The Mall", "The finishing straight on its red road surface."]
      ],
      events: [
        ["Champions hand in hand", "At the first race, Dick Beardsley and Inge Simonsen cross the line holding hands and share the men’s title."],
        ["Radcliffe 2:15:25", "Paula Radcliffe sets a women’s world record of 2:15:25 that stands for 16 years. It is still the London women’s course record."],
        ["Loop race in St James’s Park", "During the pandemic the race moves to October, with only elite athletes lapping a closed circuit in St James’s Park."],
        ["Kiptum 2:01:25", "Kelvin Kiptum wins in 2:01:25, at the time the second-fastest marathon ever run."],
        ["Women-only world record", "Tigst Assefa sets a women-only world record of 2:15:50."],
        ["Sawe breaks two hours", "Sabastian Sawe wins in 1:59:30, the first officially recognised sub-two-hour marathon and a world record. Runner-up Yomif Kejelcha also runs 1:59:41. Assefa improves the women-only world record to 2:15:41."]
      ],
      records: ["Sabastian Sawe (Kenya)", "Paula Radcliffe (UK)"],
      source: ["Rebuilt from the official London Marathon course on OpenStreetMap roads", "Copernicus EU-DEM 25 m terrain"]
    },
    capetown: {
      name: "Cape Town Marathon", city: "Cape Town", country: "South Africa", month: "May (from 2027)",
      shape: "Loop (starts and finishes in Green Point)",
      start: "Green Point", finish: "Green Point",
      history: [
        "The Cape Town Marathon traces its roots to the Peninsula Marathon of the 1990s, and the current city race is generally dated from 2007. Sanlam has been the title sponsor since 2014.",
        "After years of assessment as a candidate, the organisers confirmed in June 2026 that Cape Town will become the eighth Major in 2027 and the first in Africa. From 2027 the race moves to May (scheduled for 23 May)."
      ],
      milestones: ["Current city marathon launched", "Sanlam becomes title sponsor", "Confirmed as the eighth Major", "First race as a Major (May)"],
      cityIntro: [
        "Cape Town sits at the south-western tip of South Africa, backed by Table Mountain and facing the Atlantic and Table Bay. It is South Africa’s legislative capital and one of Africa’s most visited cities.",
        "The city blends Dutch, British, Malay and African cultures, and the brightly painted Bo-Kaap neighbourhood is a snapshot of that history. In May it is autumn in the Southern Hemisphere, cooler than the old October date."
      ],
      profileNote: "From 2027 the race moves to May and the new course has not been published. The route and elevation shown here are an approximation based on the official 2026 landmark map, with landmark distances taken from that map.",
      landmarks: [
        ["Cape Town Stadium", "Built for the 2010 World Cup between the city and the Atlantic, and the first landmark on the course."],
        ["Table Mountain viewpoint", "A city-centre stretch with Table Mountain straight ahead."],
        ["Rex Trueform factory", "A clothing-industry landmark in Salt River, a reminder that this is a working city."],
        ["Baxter Theatre", "Opened in 1977 and known during apartheid for welcoming audiences of every race."],
        ["Groote Schuur Presidential Estate", "Where Nelson Mandela and F. W. de Klerk signed the Groote Schuur Minute in 1990."],
        ["Rondebosch Common", "A 40-hectare open space protecting endangered Cape Flats sand fynbos."],
        ["Old Biscuit Mill", "A converted factory in Woodstock, now design shops and a weekend market."],
        ["Castle of Good Hope", "A 17th-century Dutch East India Company star fort, one of the best preserved of its kind."],
        ["Cape Town City Hall", "An Edwardian building finished in 1905, where Mandela spoke from the balcony after his release in 1990."],
        ["Sea Point", "Past the Winchester Mansions hotel and the promenade, right by the Atlantic."],
        ["Green Point Lighthouse", "First lit in 1824, the oldest working lighthouse in South Africa."],
        ["Green Point finish", "The finish, back by the stadium."]
      ],
      events: [
        ["Sanlam becomes title sponsor", "South African financial group Sanlam becomes title sponsor, and the race starts to grow internationally."],
        ["Confirmed as the eighth Major", "In June the organisers announce that Cape Town will join in 2027 as Africa’s first Major."],
        ["First race as a Major", "The race moves from October to May, with the 2027 edition scheduled for 23 May."]
      ]
    },
    sydney: {
      name: "Sydney Marathon", city: "Sydney", country: "Australia", month: "Late August / early September",
      shape: "Point-to-point (North Sydney → Opera House)",
      start: "Miller St, North Sydney", finish: "Sydney Opera House",
      history: [
        "The Sydney Marathon is a legacy of the 2000 Sydney Olympics and was first held in 2001. Early editions kept the spirit of the Olympic course, starting on the north shore and crossing the Harbour Bridge.",
        "After passing the Majors’ assessment as a candidate race, Sydney ran its first race as the seventh Major on 31 August 2025, becoming the first Major in the Southern Hemisphere."
      ],
      milestones: ["Sydney Olympic marathon", "First Sydney Marathon", "Becomes the seventh Major"],
      cityIntro: [
        "Sydney is Australia’s largest city, spread around the winding inlets of Port Jackson. The Harbour Bridge and the Opera House form one of the most recognisable skylines in the world.",
        "The race is held at the end of the southern winter. Mornings are cool at about 10–18°C, but the course is hillier than the other Majors."
      ],
      profileNote: "Based on SRTM terrain data: the start in North Sydney is at about 90 m. After the bridge the course drops to the harbour, rolls between 30 and 50 m through Kensington and Centennial Park in the middle section, and runs downhill to the Opera House at the end. Its total climb is among the largest of the Majors.",
      landmarks: [
        ["North Sydney", "The start, high on Miller St with the Harbour Bridge ahead."],
        ["Sydney Harbour Bridge", "A rare chance to run across the bridge’s main deck."],
        ["Barangaroo", "The newly developed harbour foreshore next to The Rocks."],
        ["Darling Harbour & Pyrmont", "Across Pyrmont Bridge, with crowds along the waterfront."],
        ["Hyde Park", "The city-centre park next to St Mary’s Cathedral."],
        ["Moore Park", "The sports precinct around the Sydney Cricket Ground."],
        ["Kensington & Kingsford turnaround", "The southernmost point, past the University of New South Wales."],
        ["Centennial Park", "Sydney’s largest eastern park, with constant rises along its avenues."],
        ["Mrs Macquarie’s Chair", "Where the bridge and the Opera House appear in a single view."],
        ["Sydney Opera House", "The finish, beneath the sail-shaped roofs."]
      ],
      events: [
        ["Sydney Olympic marathon", "Ethiopia’s Gezahegne Abera wins the men’s gold and Japan’s Naoko Takahashi the women’s, on a course from North Sydney over the Harbour Bridge."],
        ["First Sydney Marathon", "Launched as an Olympic legacy, keeping the north-shore start and the bridge crossing into the city."],
        ["Debut as a Major", "On 31 August Sydney becomes the seventh Major. Hailemaryam Kiros (2:06:06) and Sifan Hassan (2:18:22) both set course records."],
        ["Gobena runs 2:04:42", "Addisu Gobena takes 84 seconds off the men’s course record with 2:04:42. Peres Jepchirchir wins the women’s race by a wide margin in 2:18:31."]
      ],
      records: ["Addisu Gobena (Ethiopia)", "Sifan Hassan (Netherlands)"],
      source: ["Rebuilt from the official Sydney Marathon course (2026) on OpenStreetMap roads", "NASA SRTM 30 m terrain"]
    },
    berlin: {
      name: "Berlin Marathon", city: "Berlin", country: "Germany", month: "Late September",
      shape: "Loop (starts and finishes by the Tiergarten)",
      start: "Straße des 17. Juni", finish: "Just past the Brandenburg Gate",
      history: [
        "The first Berlin Marathon was held in October 1974 in the Grunewald forest on the edge of West Berlin, with a little over two hundred runners. In 1981 it moved onto the city streets.",
        "On 30 September 1990, three days before German reunification, the race ran through the Brandenburg Gate for the first time, becoming one of the symbols of reunification. Flat, with few turns and stable autumn weather, Berlin is where men’s and women’s world records are most often set."
      ],
      milestones: ["First race in the Grunewald forest", "Moves onto city streets", "First run through the Brandenburg Gate", "Founding member of the Majors"],
      cityIntro: [
        "Berlin is the capital of Germany and was divided by the Wall for almost thirty years during the Cold War. Today its history is part of the streetscape: remnants of the Wall, the Reichstag and Checkpoint Charlie are everyday sights.",
        "Late-September temperatures of about 10–18°C and the flat roads make it the first choice for runners chasing a personal best."
      ],
      profileNote: "The whole course stays between 35 and 55 m, with its highest point near Wilder Eber in the south (around 28 km). The slopes are almost imperceptible, one of the main reasons world records keep falling here.",
      landmarks: [
        ["Straße des 17. Juni & Victory Column", "The start, on the broad avenue through the Tiergarten."],
        ["Reichstag & Chancellery", "The government quarter on the Spree."],
        ["Alexanderplatz & TV Tower", "The heart of former East Berlin."],
        ["Kreuzberg", "Street bands and a mix of immigrant neighbourhoods."],
        ["Schöneberg Town Hall", "Where John F. Kennedy gave his “Ich bin ein Berliner” speech in 1963."],
        ["Wilder Eber", "The liveliest cheering spot in the south."],
        ["Kurfürstendamm & Kaiser Wilhelm Memorial Church", "The church that kept its war-damaged spire."],
        ["Potsdamer Platz", "Once split in two by the Wall, whose line is marked in the pavement."],
        ["Gendarmenmarkt", "Twin churches and the concert hall."],
        ["Brandenburg Gate", "Through the gate, and the finish is just ahead."],
        ["Finish", "On Straße des 17. Juni."]
      ],
      events: [
        ["The first race, in the forest", "Held in the Grunewald forest with a little over two hundred runners."],
        ["Through the Brandenburg Gate", "Three days before reunification, runners pass through the Brandenburg Gate for the first time."],
        ["Berlin’s first men’s world record", "Brazil’s Ronaldo da Costa runs 2:06:05, starting Berlin’s era as the world-record course."],
        ["First woman under 2:20", "Japan’s Naoko Takahashi runs 2:19:46, the first woman to break 2 hours 20 minutes."],
        ["First man under 2:05", "Paul Tergat breaks the world record with 2:04:55."],
        ["Gebrselassie 2:03:59", "Haile Gebrselassie breaks the world record in Berlin for the second year in a row, becoming the first man under 2:04."],
        ["First man under 2:03", "Dennis Kimetto breaks the world record with 2:02:57."],
        ["Kipchoge 2:01:09", "Eliud Kipchoge sets his second world record in Berlin. It is still the men’s course record."],
        ["Assefa 2:11:53", "Tigst Assefa takes more than two minutes off the women’s world record."],
        ["Assefa 2:11:04", "Assefa wins Berlin for the third time and lowers the course record to 2:11:04, about 68 seconds off the world record. Guye Adola wins the men’s race in 2:02:50."]
      ],
      records: ["Eliud Kipchoge (Kenya)", "Tigst Assefa (Ethiopia)"],
      source: ["Rebuilt from the official Berlin Marathon course (2026) on OpenStreetMap roads", "Copernicus EU-DEM 25 m terrain"]
    },
    chicago: {
      name: "Chicago Marathon", city: "Chicago", country: "United States", month: "Early October",
      shape: "Loop (starts and finishes in Grant Park)",
      start: "Grant Park", finish: "Grant Park",
      history: [
        "The modern Chicago Marathon began in 1977 as the Mayor Daley Marathon, with about 4,000 runners. Financial trouble interrupted the race in the 1980s before it got back on its feet.",
        "Today Chicago is known for being flat, big and well supported. The course passes through 29 neighbourhoods and has produced both men’s and women’s world records."
      ],
      milestones: ["First Mayor Daley Marathon", "Run as a half marathon; the full distance returns the next year", "Founding member of the Majors"],
      cityIntro: [
        "Chicago sits on the south-western shore of Lake Michigan and is the third-largest city in the United States. Rebuilt after the Great Fire of 1871, it gave the world its first skyscrapers and is still a pilgrimage site for architecture lovers.",
        "Early-October mornings are about 8–15°C, but lakefront weather changes quickly, and heat has stopped the race early before."
      ],
      profileNote: "The elevation only varies between 177 and 184 m, so the course is essentially flat. The only noticeable rise is the Roosevelt Road bridge in the last 400 m, jokingly called “Mount Roosevelt”.",
      landmarks: [
        ["Grant Park & Buckingham Fountain", "The start, inside the big lakefront park."],
        ["The Loop", "A canyon of elevated tracks and towers, where GPS readings often drift."],
        ["Lincoln Park", "The zoo and the lakefront parkland."],
        ["Lakeview turnaround", "The northernmost point of the course."],
        ["Old Town", "Victorian row houses."],
        ["West Loop & Greektown", "A restaurant strip near halfway."],
        ["United Center", "The turnaround outside the Bulls’ arena."],
        ["Pilsen", "A Mexican-American neighbourhood covered in colourful murals."],
        ["Chinatown", "The gate and lion dancers cheering runners on."],
        ["Bronzeville", "A centre of African-American culture."],
        ["Mount Roosevelt", "The last short climb."],
        ["Grant Park finish", "The finish, back by the lake."]
      ],
      events: [
        ["First Mayor Daley Marathon", "About 4,000 runners take part, beginning the modern Chicago Marathon."],
        ["Jones and Benoit Samuelson", "Steve Jones runs 2:07:13, one second off the world record, and Joan Benoit Samuelson sets an American record of 2:21:21."],
        ["Khannouchi 2:05:42", "Khalid Khannouchi breaks the men’s world record in Chicago."],
        ["Radcliffe 2:17:18", "Paula Radcliffe breaks the women’s world record in Chicago and lowers it again in London the following year."],
        ["Race stopped by heat", "In unusually hot weather, organisers halt the race about three and a half hours after the start."],
        ["Kosgei 2:14:04", "Brigid Kosgei breaks the women’s world record Radcliffe had held for 16 years."],
        ["Kiptum 2:00:35", "Kelvin Kiptum sets the men’s world record. He died in a car crash in February 2024, aged 24."],
        ["Chepngetich 2:09:56", "Ruth Chepngetich becomes the first woman under 2 hours 10 minutes. She received a three-year ban for an anti-doping violation in 2025, and the time is still listed as the world record."],
        ["Kipruto 2:01:09", "Amos Kipruto wins in the second-fastest time in Chicago history, and Hawi Feysa wins the women’s race for the second year running."]
      ],
      records: ["Kelvin Kiptum (Kenya)", "Ruth Chepngetich (Kenya)"],
      source: ["Rebuilt from the official Chicago Marathon course map (2026) on OpenStreetMap streets", "USGS 3DEP 10 m terrain"]
    },
    nyc: {
      name: "New York City Marathon", city: "New York", country: "United States", month: "First Sunday in November",
      shape: "Point-to-point (Staten Island → Central Park)",
      start: "Staten Island", finish: "Central Park",
      history: [
        "In 1970 Fred Lebow and Vince Chiappetta held the first race as laps of Central Park: 127 starters, 55 finishers and a one-dollar entry fee.",
        "In 1976, to mark the US Bicentennial, the course was expanded to run through all five boroughs, which is the format it keeps today. New York is now one of the largest marathons in the world, with more than 55,000 finishers."
      ],
      milestones: ["First race, on laps of Central Park", "First course through all five boroughs", "Founding member of the Majors", "Cancelled because of Hurricane Sandy"],
      cityIntro: [
        "New York is made up of five boroughs: Manhattan, Brooklyn, Queens, the Bronx and Staten Island. It is the largest city in the United States and a global centre of finance and culture.",
        "The race crosses five bridges, and every borough has its own neighbourhoods and style of cheering. Early-November mornings are about 5–12°C, and the start villages are often very cold."
      ],
      profileNote: "The terrain data only records the ground, so the five bridges show up at close to water level. In reality the Verrazzano-Narrows Bridge at the start and the Queensboro Bridge at 25 km are long climbs, and there is a gradual rise at the end on Fifth Avenue and in Central Park.",
      landmarks: [
        ["Verrazzano-Narrows Bridge", "The cannon fires and runners set off across the double-deck bridge above New York Harbor."],
        ["Bay Ridge", "Into Brooklyn, where the crowds begin."],
        ["Fourth Avenue, Brooklyn", "A long straight road with one band after another."],
        ["Williamsburg", "A Hasidic Jewish community right next to a hip neighbourhood."],
        ["Pulaski Bridge (halfway)", "Into Queens."],
        ["Queensboro Bridge", "A long bridge with no spectators, where all you hear are footsteps."],
        ["First Avenue “wall of sound”", "The roar as runners come off the bridge is New York’s most famous moment."],
        ["Willis Avenue Bridge & the Bronx", "A brief visit to the fifth borough."],
        ["Madison Avenue Bridge", "Back into Manhattan in Harlem."],
        ["Fifth Avenue", "A long, gradual climb along Museum Mile."],
        ["Central Park", "Rolling roads through the trees."],
        ["Columbus Circle", "The final turn back into the park."],
        ["Tavern on the Green", "The finish, on the west side of Central Park."]
      ],
      events: [
        ["The first race, in Central Park", "127 starters and 55 finishers; Gary Muhrcke wins and the entry fee is one dollar."],
        ["Through all five boroughs", "To celebrate the US Bicentennial, the course expands to today’s five-borough route."],
        ["Grete Waitz’s first win", "Norway’s Grete Waitz wins her debut in a world record and goes on to win New York nine times."],
        ["Meb wins for the US", "Meb Keflezighi becomes the first American man to win New York since 1982."],
        ["Cancelled by Hurricane Sandy", "After the hurricane devastates the city, the race is called off two days before the start."],
        ["Flanagan’s victory", "Shalane Flanagan becomes the first American woman to win New York since 1977."],
        ["Tola 2:04:58", "Tamirat Tola sets the men’s course record of 2:04:58."],
        ["Obiri 2:19:51", "Hellen Obiri sets the women’s course record of 2:19:51, the first time a woman has broken 2:20 in New York."],
        ["Almgren wins on debut", "Sweden’s Andreas Almgren wins his first marathon in 2:06:01, and Sheila Chepkirui takes her second women’s title."]
      ],
      records: ["Tamirat Tola (Ethiopia)", "Hellen Obiri (Kenya)"],
      source: ["Rebuilt from the official New York City Marathon course (2026) on OpenStreetMap roads", "USGS 3DEP 10 m terrain"]
    }
  }
};
