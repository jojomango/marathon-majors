/*
  Textos en español para marathons.js.
  Los arreglos siguen el mismo orden que los datos en chino: hitos, puntos de
  interés ([nombre, nota]), momentos ([título, texto]) y récords ([hombres, mujeres]).
*/
window.MAJORS_I18N = window.MAJORS_I18N || {};
window.MAJORS_I18N.es = {
  timeline: [
    ["Cinco carreras fundadoras", "Boston, Londres, Berlín, Chicago y Nueva York forman los World Marathon Majors."],
    ["Llega Tokio", "La sexta carrera y la primera fuera de Europa y Norteamérica. Quien termina las seis recibe la medalla Six Star."],
    ["Llega Sídney", "La séptima carrera y el primer Major del hemisferio sur."],
    ["Llega Ciudad del Cabo", "Confirmada en junio de 2026 como la octava carrera y el primer Major de África."],
    ["Shanghái, en evaluación", "Su carrera del 6 de diciembre de 2026 es la segunda evaluación. Si la supera, podría convertirse en el noveno Major."]
  ],
  races: {
    tokyo: {
      name: "Maratón de Tokio", city: "Tokio", country: "Japón", month: "Principios de marzo",
      shape: "Lineal (Shinjuku → estación de Tokio), con varios tramos de ida y vuelta",
      start: "Edificio del Gobierno Metropolitano de Tokio", finish: "Estación de Tokio, lado Marunouchi",
      history: [
        "El Maratón de Tokio nació del Maratón Internacional de Tokio (carrera masculina de élite) y del Maratón Internacional Femenino de Tokio, que se alternaban desde 1981. En 2007 se fusionaron en un gran maratón popular, y unas 30.000 personas tomaron la salida en la primera edición.",
        "En 2013 Tokio se convirtió en el sexto Major y el primero de Asia. El nuevo recorrido de 2017 llevó la meta de Odaiba a la avenida Gyoko-dori, frente a la estación de Tokio, y la carrera se volvió más llana y rápida. En 2020 la pandemia la limitó a la élite, y la edición de 2021 se aplazó a marzo de 2022."
      ],
      milestones: ["Nace el Maratón Internacional de Tokio (élite)", "Primer Maratón de Tokio popular", "Entra en los World Marathon Majors", "Nuevo recorrido; la meta pasa a la estación de Tokio"],
      cityIntro: [
        "Tokio es una de las áreas metropolitanas más pobladas del mundo, nacida como ciudad castillo en la época Edo. Es un mosaico de barrios con carácter propio, como Shinjuku, Ginza y Asakusa, donde los templos antiguos conviven con los rascacielos.",
        "A principios de marzo el tiempo es seco, con unos 5–12 °C, ideal para correr. Los avituallamientos y el apoyo del público son famosos, y es habitual que la gente reparta a los corredores dulces traídos de casa."
      ],
      profileNote: "Según los datos lidar de 1 m de la Autoridad de Información Geoespacial de Japón, la salida en Shinjuku está a unos 35 m y los primeros 5 km bajan hasta unos 10 m. Después, el recorrido queda casi siempre por debajo de 10 m en los barrios bajos tradicionales, con pequeñas subidas solo en los puentes.",
      landmarks: [
        ["Edificio del Gobierno Metropolitano", "La salida, frente a las torres gemelas, con los rascacielos de Shinjuku detrás."],
        ["Iidabashi y Kagurazaka", "Por Sotobori-dori, donde termina la bajada inicial."],
        ["Ueno-hirokoji", "El giro en el extremo norte de Chuo-dori, cerca del parque Ueno y del mercado Ameyoko."],
        ["Nihonbashi", "El punto de partida de las rutas de la época Edo, custodiado por estatuas de kirin."],
        ["Kaminarimon, Asakusa", "El gran farol rojo y la calle Nakamise, con la Tokyo Skytree a la vista. Aquí se da la vuelta."],
        ["Ryogoku", "Hogar del estadio de sumo Kokugikan. La media maratón cae en Kiyosumi-dori."],
        ["Monzen-nakacho y Tomioka Hachimangu", "Un breve tramo de ida y vuelta por Eitai-dori, el más castizo del recorrido."],
        ["Ginza 4-chome", "El reloj de los almacenes Wako, con mucho público en la calle comercial."],
        ["Giro de Tamachi", "El punto más al sur, en Daiichi Keihin, antes de volver al norte por Hibiya-dori."],
        ["Zojoji y Torre de Tokio", "La torre roja y blanca junto al templo antiguo."],
        ["Hibiya y jardines del Palacio Imperial", "Junto al foso, rumbo al tramo final."],
        ["Estación de Tokio", "La meta, en Gyoko-dori, frente al edificio de ladrillo rojo de Marunouchi."]
      ],
      events: [
        ["Primer maratón popular", "Se fusionan el Maratón Internacional de Tokio y el maratón femenino, y unas 30.000 personas toman la salida en la primera edición."],
        ["Sexto Major", "Con Tokio, quien completa las seis carreras recibe la medalla Six Star. Es el primer Major fuera de Europa y Norteamérica."],
        ["Solo élite durante la pandemia", "Con la COVID-19 en expansión, se cancela la carrera popular y solo compiten los atletas de élite."],
        ["Kipchoge bate el récord", "Eliud Kipchoge gana en 2:02:40, el maratón más rápido corrido en Japón hasta entonces."],
        ["Récord masculino de 2:02:16", "Benson Kipruto gana en 2:02:16, y Sutume Kebede establece el récord femenino de entonces con 2:15:55."],
        ["Kosgei corre en 2:14:29", "Brigid Kosgei bate el récord femenino con 2:14:29, también el maratón femenino más rápido corrido en Asia. Tadese Takele revalida el título masculino."]
      ],
      records: ["Benson Kipruto (Kenia)", "Brigid Kosgei (Kenia)"],
      source: ["Reconstruido a partir del mapa oficial del Maratón de Tokio (2026) sobre calles de OpenStreetMap", "Terreno lidar de 1 m de la Autoridad de Información Geoespacial de Japón"]
    },
    boston: {
      name: "Maratón de Boston", city: "Boston", country: "Estados Unidos", month: "Abril (Patriots’ Day)",
      shape: "Lineal (Hopkinton → Boston)",
      start: "Hopkinton", finish: "Copley Square, Boylston St",
      history: [
        "Inspirada en el maratón de los Juegos Olímpicos de Atenas de 1896, la Boston Athletic Association (B.A.A.) organizó la primera carrera en 1897 con solo 15 participantes. Es el maratón anual más antiguo del mundo.",
        "Se celebra siempre en el Patriots’ Day de Massachusetts, el tercer lunes de abril. Las mujeres pueden inscribirse oficialmente desde 1972. Boston es famoso por su marca mínima (la BQ): la mayoría de los corredores deben lograr antes un tiempo determinado en otro maratón."
      ],
      milestones: ["Primera carrera, 15 participantes", "La salida se traslada a Hopkinton", "Se admite oficialmente a las mujeres", "Miembro fundador de los Majors"],
      cityIntro: [
        "Boston es una de las ciudades más antiguas de Estados Unidos, escenario clave de la Revolución estadounidense y centro académico con Harvard y el MIT.",
        "El recorrido atraviesa ocho localidades, desde pequeños pueblos hasta el centro. El tiempo a mediados de abril es imprevisible: ha habido olas de calor y también lluvia fría con viento de cara."
      ],
      profileNote: "La salida en Hopkinton está a unos 137 m y la meta a unos 3 m: un descenso neto de más de 130 m. La larga bajada inicial castiga los cuádriceps, y entre los km 25 y 34 las colinas de Newton se suceden; la última es Heartbreak Hill.",
      landmarks: [
        ["Salida en Hopkinton", "Junto a la plaza del pueblo y directamente cuesta abajo."],
        ["Framingham", "Por la Ruta 135, junto a la antigua estación."],
        ["El «túnel de gritos» de Wellesley", "Las estudiantes animan tan fuerte que se las oye a cientos de metros."],
        ["Newton Lower Falls", "El cruce del río Charles, donde empiezan las colinas."],
        ["Giro en el parque de bomberos de Newton", "A la avenida Commonwealth y a una serie de subidas."],
        ["Heartbreak Hill", "La última colina, de unos 800 m, bautizada en la carrera de 1936."],
        ["Boston College", "Estudiantes animando justo después de la cima."],
        ["Coolidge Corner", "Un cruce animado de Brookline."],
        ["Kenmore Square y el letrero de Citgo", "Junto a Fenway Park. Ver el letrero significa que queda una milla."],
        ["Derecha en Hereford, izquierda en Boylston", "Los dos últimos giros que todo corredor de Boston conoce de memoria."],
        ["Copley Square", "La meta, frente a la Biblioteca Pública de Boston."]
      ],
      events: [
        ["La primera carrera", "John J. McDermott gana entre 15 participantes. Es el maratón anual más antiguo del mundo."],
        ["La primera mujer en terminar", "Tras rechazar su inscripción, Bobbi Gibb se esconde entre arbustos cerca de la salida, se une a la carrera y termina en unas 3 horas y 21 minutos."],
        ["El dorsal de Switzer", "Kathrine Switzer se inscribe como «K. V. Switzer» y obtiene un dorsal. Un organizador intenta arrancárselo en plena carrera y las fotos se convierten en un símbolo del atletismo femenino. La categoría femenina se oficializa en 1972."],
        ["Nace la categoría en silla de ruedas", "Bob Hall termina en silla de ruedas, y Boston se convierte en uno de los primeros maratones en acoger a estos atletas."],
        ["La trampa de Rosie Ruiz", "La primera mujer en cruzar la meta, Rosie Ruiz, resulta haber ido en metro. Se le retira el título, que pasa a Jacqueline Gareau."],
        ["Atentado en la meta", "El 15 de abril dos bombas estallan cerca de la meta: 3 muertos y cientos de heridos. «Boston Strong» se convierte en el lema de la ciudad."],
        ["Meb gana para EE. UU.", "Un año después del atentado, Meb Keflezighi gana la carrera masculina, el primer estadounidense en hacerlo desde 1983."],
        ["Des Linden bajo la lluvia fría", "Con lluvia helada y fuerte viento, Des Linden se convierte en la primera estadounidense en ganar desde 1985."],
        ["Primera cancelación de la historia", "La pandemia convierte la carrera en un evento virtual. En 2021 se traslada a octubre."],
        ["Korir corre en 2:01:52", "En la 130.ª edición, John Korir gana en 2:01:52 y bate el 2:03:02 de Geoffrey Mutai, vigente desde 2011. Sharon Lokedi repite victoria en mujeres."]
      ],
      records: ["John Korir (Kenia)", "Buzunesh Deba (Etiopía)"],
      source: ["Recorrido del Maratón de Boston cartografiado en OpenStreetMap (contrastado con el mapa oficial de la B.A.A. de 2026)", "Terreno USGS 3DEP de 10 m"]
    },
    london: {
      name: "Maratón de Londres", city: "Londres", country: "Reino Unido", month: "Finales de abril",
      shape: "Lineal (Greenwich → The Mall)",
      start: "Greenwich y Blackheath", finish: "The Mall",
      history: [
        "Tras correr el Maratón de Nueva York en 1979, el excampeón olímpico de obstáculos Chris Brasher y John Disley decidieron llevar un maratón urbano a Londres. La primera edición se celebró en marzo de 1981 con unas 7.000 personas.",
        "Londres es famoso por la recaudación benéfica y es uno de los eventos de un solo día que más dinero reúne cada año, con corredores disfrazados de todas las formas posibles. La carrera masculina de élite produce récords mundiales con frecuencia."
      ],
      milestones: ["Primer Maratón de Londres", "Miembro fundador de los Majors", "Carrera de élite en circuito durante la pandemia"],
      cityIntro: [
        "Londres es la capital del Reino Unido. El Támesis atraviesa la ciudad entre dos mil años de historia, del Tower Bridge y la Torre de Londres al Palacio de Westminster.",
        "El recorrido sigue el Támesis de este a oeste y enlaza casi todos los lugares más conocidos de Londres. A finales de abril hay unos 8–16 °C."
      ],
      profileNote: "La salida en Blackheath está a unos 45 m, con una bajada clara en los primeros 3 km. Después el recorrido es casi llano junto al Támesis, en general entre 5 y 15 m.",
      landmarks: [
        ["Greenwich Park y Blackheath", "Tres salidas distintas que se unen hacia el km 5."],
        ["Cutty Sark", "Un clíper del té del siglo XIX, rodeado por la primera gran multitud."],
        ["Tower Bridge", "El tramo más famoso, con el público más ruidoso al cruzar el puente."],
        ["Media maratón en The Highway", "Desde aquí se ve a la élite al otro lado, ya en el km 35."],
        ["Canary Wharf", "Un bucle entre las torres del distrito financiero, donde el GPS suele fallar."],
        ["Torre de Londres", "De vuelta al centro junto a la fortaleza medieval."],
        ["Victoria Embankment", "Junto al río, con el London Eye a la vista."],
        ["Big Ben y Palacio de Westminster", "Frente al Parlamento y hacia Birdcage Walk."],
        ["Palacio de Buckingham", "Rodeando el Victoria Memorial."],
        ["The Mall", "La recta final sobre su asfalto rojo."]
      ],
      events: [
        ["Campeones de la mano", "En la primera edición, Dick Beardsley e Inge Simonsen cruzan la meta de la mano y comparten la victoria."],
        ["Radcliffe 2:15:25", "Paula Radcliffe logra un récord mundial femenino de 2:15:25 que dura 16 años. Sigue siendo el récord femenino de Londres."],
        ["Circuito en St James’s Park", "Durante la pandemia la carrera pasa a octubre y solo la élite corre en un circuito cerrado en St James’s Park."],
        ["Kiptum 2:01:25", "Kelvin Kiptum gana en 2:01:25, entonces el segundo maratón más rápido de la historia."],
        ["Récord mundial en carrera solo femenina", "Tigst Assefa establece el récord mundial en carrera solo femenina con 2:15:50."],
        ["Sawe baja de dos horas", "Sabastian Sawe gana en 1:59:30, el primer maratón por debajo de dos horas reconocido oficialmente y récord mundial. El segundo, Yomif Kejelcha, también corre en 1:59:41. Assefa mejora el récord en carrera solo femenina a 2:15:41."]
      ],
      records: ["Sabastian Sawe (Kenia)", "Paula Radcliffe (Reino Unido)"],
      source: ["Reconstruido a partir del recorrido oficial del Maratón de Londres sobre vías de OpenStreetMap", "Terreno Copernicus EU-DEM de 25 m"]
    },
    capetown: {
      name: "Maratón de Ciudad del Cabo", city: "Ciudad del Cabo", country: "Sudáfrica", month: "Mayo (desde 2027)",
      shape: "Circular (salida y meta en Green Point)",
      start: "Green Point", finish: "Green Point",
      history: [
        "El Maratón de Ciudad del Cabo tiene sus raíces en el Maratón de la Península de los años noventa, y la carrera urbana actual suele fecharse en 2007. Sanlam es el patrocinador principal desde 2014.",
        "Tras años de evaluación como candidata, la organización confirmó en junio de 2026 que Ciudad del Cabo será el octavo Major en 2027 y el primero de África. Desde 2027 la carrera pasa a mayo (prevista para el 23 de mayo)."
      ],
      milestones: ["Nace el actual maratón urbano", "Sanlam, patrocinador principal", "Confirmada como octavo Major", "Primera edición como Major (mayo)"],
      cityIntro: [
        "Ciudad del Cabo está en el extremo suroeste de Sudáfrica, al pie de la Montaña de la Mesa y frente al Atlántico y la bahía de la Mesa. Es la capital legislativa del país y una de las ciudades más visitadas de África.",
        "La ciudad mezcla culturas neerlandesa, británica, malaya y africana, y el colorido barrio de Bo-Kaap resume esa historia. En mayo es otoño en el hemisferio sur, más fresco que la antigua fecha de octubre."
      ],
      profileNote: "Desde 2027 la carrera pasa a mayo y el nuevo recorrido aún no se ha publicado. El recorrido y la altimetría que se muestran son un esquema basado en el mapa oficial de puntos de interés de 2026, del que también salen las distancias.",
      landmarks: [
        ["Estadio de Ciudad del Cabo", "Construido para el Mundial de 2010 entre la ciudad y el Atlántico; el primer hito del recorrido."],
        ["Mirador de la Montaña de la Mesa", "Un tramo del centro con la Montaña de la Mesa justo delante."],
        ["Fábrica Rex Trueform", "Un emblema de la industria textil en Salt River que recuerda que esta es una ciudad que trabaja."],
        ["Teatro Baxter", "Inaugurado en 1977 y conocido durante el apartheid por acoger a público de todas las razas."],
        ["Residencia presidencial Groote Schuur", "Donde Nelson Mandela y F. W. de Klerk firmaron la Minuta de Groote Schuur en 1990."],
        ["Rondebosch Common", "Un espacio abierto de 40 hectáreas que protege el fynbos amenazado de las llanuras del Cabo."],
        ["Old Biscuit Mill", "Una antigua fábrica de Woodstock, hoy tiendas de diseño y mercado de fin de semana."],
        ["Castillo de Buena Esperanza", "Fortaleza estrellada del siglo XVII de la Compañía Neerlandesa de las Indias Orientales, de las mejor conservadas."],
        ["Ayuntamiento de Ciudad del Cabo", "Edificio eduardiano de 1905 desde cuyo balcón habló Mandela tras su liberación en 1990."],
        ["Sea Point", "Junto al hotel Winchester Mansions y el paseo marítimo, al lado del Atlántico."],
        ["Faro de Green Point", "Encendido en 1824, el faro en funcionamiento más antiguo de Sudáfrica."],
        ["Meta en Green Point", "La meta, de vuelta junto al estadio."]
      ],
      events: [
        ["Sanlam, patrocinador principal", "El grupo financiero sudafricano Sanlam se convierte en patrocinador principal y la carrera empieza a crecer a nivel internacional."],
        ["Confirmada como octavo Major", "En junio la organización anuncia que Ciudad del Cabo se unirá en 2027 como primer Major de África."],
        ["Primera edición como Major", "La carrera pasa de octubre a mayo; la edición de 2027 está prevista para el 23 de mayo."]
      ]
    },
    sydney: {
      name: "Maratón de Sídney", city: "Sídney", country: "Australia", month: "Finales de agosto / principios de septiembre",
      shape: "Lineal (North Sydney → Ópera)",
      start: "Miller St, North Sydney", finish: "Ópera de Sídney",
      history: [
        "El Maratón de Sídney es un legado de los Juegos Olímpicos de 2000 y se celebra cada año desde 2001. Las primeras ediciones mantuvieron el espíritu del recorrido olímpico: salida en la orilla norte y cruce del Harbour Bridge.",
        "Sídney entró en el proceso de candidatura de los Majors en 2022 y corrió su primera edición como séptimo Major el 31 de agosto de 2025, el primero del hemisferio sur."
      ],
      milestones: ["Maratón olímpico de Sídney", "Primer Maratón de Sídney", "Se convierte en el séptimo Major"],
      cityIntro: [
        "Sídney es la mayor ciudad de Australia y se extiende alrededor de las ensenadas de Port Jackson. El Harbour Bridge y la Ópera forman uno de los perfiles urbanos más reconocibles del mundo.",
        "La carrera se celebra al final del invierno austral. Las mañanas son frescas, unos 10–18 °C, pero el recorrido tiene más desnivel que los otros Majors."
      ],
      profileNote: "Según los datos de terreno SRTM, la salida en North Sydney está a unos 90 m. Tras el puente, el recorrido baja hasta el puerto, sube y baja entre 30 y 50 m por Kensington y Centennial Park en la parte central y termina cuesta abajo hacia la Ópera. Su desnivel acumulado está entre los mayores de los Majors.",
      landmarks: [
        ["North Sydney", "La salida, en lo alto de Miller St con el Harbour Bridge delante."],
        ["Harbour Bridge de Sídney", "El único día del año en que se puede correr por la calzada principal del puente."],
        ["Barangaroo", "El nuevo frente portuario junto a The Rocks."],
        ["Darling Harbour y Pyrmont", "Por el puente de Pyrmont, con público a lo largo del paseo."],
        ["Hyde Park", "El parque del centro, junto a la catedral de St Mary."],
        ["Moore Park", "El recinto deportivo alrededor del Sydney Cricket Ground."],
        ["Giro de Kensington y Kingsford", "El punto más al sur, tras pasar por la Universidad de Nueva Gales del Sur."],
        ["Centennial Park", "El mayor parque del este de Sídney, con continuas subidas en sus avenidas."],
        ["Mrs Macquarie’s Chair", "Donde el puente y la Ópera aparecen juntos."],
        ["Ópera de Sídney", "La meta, bajo las cubiertas en forma de vela."]
      ],
      events: [
        ["Maratón olímpico de Sídney", "El etíope Gezahegne Abera gana el oro masculino y la japonesa Naoko Takahashi el femenino, en un recorrido desde North Sydney por el Harbour Bridge."],
        ["Primer Maratón de Sídney", "Nace como legado olímpico, con salida en la orilla norte y cruce del puente hacia la ciudad."],
        ["Debut como Major", "El 31 de agosto Sídney se convierte en el séptimo Major. Hailemaryam Kiros (2:06:06) y Sifan Hassan (2:18:22) establecen récords de la prueba."],
        ["Gobena corre en 2:04:42", "Addisu Gobena rebaja en 84 segundos el récord masculino con 2:04:42. Peres Jepchirchir gana con mucha ventaja en mujeres, en 2:18:31."]
      ],
      records: ["Addisu Gobena (Etiopía)", "Sifan Hassan (Países Bajos)"],
      source: ["Reconstruido a partir del recorrido oficial del Maratón de Sídney (2026) sobre vías de OpenStreetMap", "Terreno NASA SRTM de 30 m"]
    },
    berlin: {
      name: "Maratón de Berlín", city: "Berlín", country: "Alemania", month: "Finales de septiembre",
      shape: "Circular (salida y meta junto al Tiergarten)",
      start: "Straße des 17. Juni", finish: "Justo después de la Puerta de Brandeburgo",
      history: [
        "El primer Maratón de Berlín se celebró en octubre de 1974 en el bosque de Grunewald, a las afueras de Berlín Occidental, con poco más de doscientos corredores. En 1981 pasó a las calles de la ciudad.",
        "El 30 de septiembre de 1990, tres días antes de la reunificación alemana, la carrera cruzó por primera vez la Puerta de Brandeburgo y se convirtió en uno de los símbolos de la reunificación. Llano, con pocas curvas y un otoño estable, Berlín es donde más récords mundiales masculinos y femeninos se han batido."
      ],
      milestones: ["Primera carrera en el bosque de Grunewald", "Pasa a las calles de la ciudad", "Primer paso por la Puerta de Brandeburgo", "Miembro fundador de los Majors"],
      cityIntro: [
        "Berlín es la capital de Alemania y estuvo dividida por el Muro durante casi treinta años en la Guerra Fría. Hoy su historia forma parte de la calle: restos del Muro, el Reichstag y el Checkpoint Charlie son paisaje cotidiano.",
        "A finales de septiembre hay unos 10–18 °C, y con un asfalto tan llano es la primera opción para quien busca su mejor marca."
      ],
      profileNote: "Todo el recorrido está entre 35 y 55 m, con el punto más alto cerca de Wilder Eber, en el sur (hacia el km 28). Las pendientes casi no se notan, una de las razones principales de que aquí caigan tantos récords mundiales.",
      landmarks: [
        ["Straße des 17. Juni y Columna de la Victoria", "La salida, en la gran avenida que cruza el Tiergarten."],
        ["Reichstag y Cancillería", "El barrio del Gobierno junto al Spree."],
        ["Alexanderplatz y Torre de Televisión", "El corazón del antiguo Berlín Oriental."],
        ["Kreuzberg", "Bandas callejeras y barrios de inmigrantes de todo tipo."],
        ["Ayuntamiento de Schöneberg", "Donde John F. Kennedy pronunció su discurso «Ich bin ein Berliner» en 1963."],
        ["Wilder Eber", "El punto de animación más vivo del sur."],
        ["Kurfürstendamm e Iglesia Memorial Kaiser Wilhelm", "La iglesia que conserva su campanario dañado en la guerra."],
        ["Potsdamer Platz", "Dividida en dos por el Muro, cuyo trazado está marcado en el suelo."],
        ["Gendarmenmarkt", "Dos iglesias gemelas y la sala de conciertos."],
        ["Puerta de Brandeburgo", "Al cruzarla, la meta está justo delante."],
        ["Meta", "En la Straße des 17. Juni."]
      ],
      events: [
        ["La primera carrera, en el bosque", "Se celebra en el bosque de Grunewald con poco más de doscientos corredores."],
        ["A través de la Puerta de Brandeburgo", "Tres días antes de la reunificación, los corredores cruzan por primera vez la Puerta de Brandeburgo."],
        ["El primer récord mundial de Berlín", "El brasileño Ronaldo da Costa corre en 2:06:05 y abre la era de Berlín como circuito de récords."],
        ["Primera mujer por debajo de 2:20", "La japonesa Naoko Takahashi corre en 2:19:46, la primera mujer en bajar de 2 horas y 20 minutos."],
        ["Primer hombre por debajo de 2:05", "Paul Tergat bate el récord mundial con 2:04:55."],
        ["Gebrselassie 2:03:59", "Haile Gebrselassie bate el récord mundial en Berlín por segundo año seguido y se convierte en el primero por debajo de 2:04."],
        ["Primer hombre por debajo de 2:03", "Dennis Kimetto bate el récord mundial con 2:02:57."],
        ["Kipchoge 2:01:09", "Eliud Kipchoge logra en Berlín su segundo récord mundial. Sigue siendo el récord masculino de la prueba."],
        ["Assefa 2:11:53", "Tigst Assefa rebaja en más de dos minutos el récord mundial femenino."],
        ["Assefa 2:11:04", "Assefa gana Berlín por tercera vez y deja el récord de la prueba en 2:11:04, a unos 68 segundos del récord mundial. Guye Adola gana en hombres con 2:02:50."]
      ],
      records: ["Eliud Kipchoge (Kenia)", "Tigst Assefa (Etiopía)"],
      source: ["Reconstruido a partir del recorrido oficial del Maratón de Berlín (2026) sobre vías de OpenStreetMap", "Terreno Copernicus EU-DEM de 25 m"]
    },
    chicago: {
      name: "Maratón de Chicago", city: "Chicago", country: "Estados Unidos", month: "Principios de octubre",
      shape: "Circular (salida y meta en Grant Park)",
      start: "Grant Park", finish: "Grant Park",
      history: [
        "El Maratón de Chicago moderno empezó en 1977 como Mayor Daley Marathon, con unos 4.000 corredores. Problemas económicos lo interrumpieron en los años ochenta antes de volver a ponerse en pie.",
        "Hoy Chicago es conocido por ser llano, multitudinario y muy bien organizado. El recorrido atraviesa 29 barrios y ha dado récords mundiales tanto masculinos como femeninos."
      ],
      milestones: ["Primer Mayor Daley Marathon", "Se corre como media maratón; la distancia completa vuelve al año siguiente", "Miembro fundador de los Majors"],
      cityIntro: [
        "Chicago está en la orilla suroeste del lago Michigan y es la tercera ciudad más grande de Estados Unidos. Reconstruida tras el gran incendio de 1871, dio al mundo sus primeros rascacielos y sigue siendo lugar de peregrinación para los amantes de la arquitectura.",
        "A principios de octubre las mañanas rondan los 8–15 °C, pero el tiempo junto al lago cambia rápido, y el calor ya ha obligado a parar la carrera."
      ],
      profileNote: "La altitud solo varía entre 177 y 184 m, así que el recorrido es prácticamente llano. La única subida apreciable es el puente de Roosevelt Road en los últimos 400 m, al que llaman en broma «Mount Roosevelt».",
      landmarks: [
        ["Grant Park y fuente de Buckingham", "La salida, dentro del gran parque junto al lago."],
        ["The Loop", "Un cañón de vías elevadas y rascacielos donde el GPS suele desviarse."],
        ["Lincoln Park", "El zoo y los parques junto al lago."],
        ["Giro de Lakeview", "El punto más al norte del recorrido."],
        ["Old Town", "Casas adosadas victorianas."],
        ["West Loop y Greektown", "Una calle de restaurantes cerca de la media maratón."],
        ["United Center", "El giro frente al pabellón de los Bulls."],
        ["Pilsen", "Un barrio mexicano-estadounidense lleno de murales de colores."],
        ["Chinatown", "La puerta ornamental y danzas del león animando."],
        ["Bronzeville", "Un centro de la cultura afroamericana."],
        ["Mount Roosevelt", "La última subida corta."],
        ["Meta en Grant Park", "La meta, de vuelta junto al lago."]
      ],
      events: [
        ["Primer Mayor Daley Marathon", "Participan unas 4.000 personas; empieza el Maratón de Chicago moderno."],
        ["Jones y Benoit Samuelson", "Steve Jones corre en 2:07:13, a un segundo del récord mundial, y Joan Benoit Samuelson logra el récord de EE. UU. con 2:21:21."],
        ["Khannouchi 2:05:42", "Khalid Khannouchi bate en Chicago el récord mundial masculino."],
        ["Radcliffe 2:17:18", "Paula Radcliffe bate en Chicago el récord mundial femenino y lo vuelve a mejorar en Londres al año siguiente."],
        ["Carrera detenida por el calor", "Con un calor inusual, la organización detiene la carrera unas tres horas y media después de la salida."],
        ["Kosgei 2:14:04", "Brigid Kosgei bate el récord mundial femenino que Radcliffe tenía desde hacía 16 años."],
        ["Kiptum 2:00:35", "Kelvin Kiptum establece el récord mundial masculino. Murió en un accidente de tráfico en febrero de 2024, a los 24 años."],
        ["Chepngetich 2:09:56", "Ruth Chepngetich se convierte en la primera mujer por debajo de 2 horas y 10 minutos. En 2025 fue sancionada con tres años por una infracción antidopaje, y la marca sigue figurando como récord mundial."],
        ["Kipruto 2:01:09", "Amos Kipruto gana con la segunda mejor marca de la historia de Chicago, y Hawi Feysa repite victoria en mujeres."]
      ],
      records: ["Kelvin Kiptum (Kenia)", "Ruth Chepngetich (Kenia)"],
      source: ["Reconstruido a partir del mapa oficial del Maratón de Chicago (2026) sobre calles de OpenStreetMap", "Terreno USGS 3DEP de 10 m"]
    },
    nyc: {
      name: "Maratón de Nueva York", city: "Nueva York", country: "Estados Unidos", month: "Primer domingo de noviembre",
      shape: "Lineal (Staten Island → Central Park)",
      start: "Staten Island", finish: "Central Park",
      history: [
        "En 1970 Fred Lebow y Vince Chiappetta organizaron la primera carrera dando vueltas a Central Park: 127 participantes, 55 llegados a meta y un dólar de inscripción.",
        "En 1976, para celebrar el bicentenario de Estados Unidos, el recorrido se amplió a los cinco distritos, el formato que mantiene hoy. Nueva York es ahora el maratón con más corredores en meta del mundo."
      ],
      milestones: ["Primera carrera, con vueltas a Central Park", "Primer recorrido por los cinco distritos", "Miembro fundador de los Majors", "Cancelado por el huracán Sandy"],
      cityIntro: [
        "Nueva York se compone de cinco distritos: Manhattan, Brooklyn, Queens, el Bronx y Staten Island. Es la mayor ciudad de Estados Unidos y un centro mundial de las finanzas y la cultura.",
        "La carrera cruza cinco puentes, y cada distrito tiene sus propios barrios y su forma de animar. A principios de noviembre las mañanas rondan los 5–12 °C y las zonas de salida suelen ser muy frías."
      ],
      profileNote: "Los datos de terreno solo recogen el suelo, así que los cinco puentes aparecen casi al nivel del agua. En realidad, el puente Verrazzano-Narrows en la salida y el Queensboro en el km 25 son subidas largas, y al final hay una pendiente suave por la Quinta Avenida y Central Park.",
      landmarks: [
        ["Puente Verrazzano-Narrows", "Suena el cañonazo y los corredores salen por el puente de dos pisos sobre la bahía de Nueva York."],
        ["Bay Ridge", "Entrada en Brooklyn, donde empieza el público."],
        ["Cuarta Avenida, Brooklyn", "Una larga recta con una banda tras otra."],
        ["Williamsburg", "Una comunidad judía jasídica junto a un barrio de moda."],
        ["Puente Pulaski (media maratón)", "Entrada en Queens."],
        ["Puente Queensboro", "Un largo puente sin público en el que solo se oyen las pisadas."],
        ["El «muro de sonido» de la Primera Avenida", "El rugido al bajar del puente es el momento más famoso de Nueva York."],
        ["Puente Willis Avenue y el Bronx", "Una breve visita al quinto distrito."],
        ["Puente Madison Avenue", "De vuelta a Manhattan por Harlem."],
        ["Quinta Avenida", "Una subida larga y suave junto a la Milla de los Museos."],
        ["Central Park", "Toboganes entre los árboles."],
        ["Columbus Circle", "El último giro de vuelta al parque."],
        ["Tavern on the Green", "La meta, en el lado oeste de Central Park."]
      ],
      events: [
        ["La primera carrera, en Central Park", "127 participantes y 55 en meta; gana Gary Muhrcke y la inscripción cuesta un dólar."],
        ["Por los cinco distritos", "Para celebrar el bicentenario de EE. UU., el recorrido se amplía al trazado actual por los cinco distritos."],
        ["La primera victoria de Grete Waitz", "La noruega Grete Waitz gana en su debut con récord mundial y acabará ganando Nueva York nueve veces."],
        ["Meb gana para EE. UU.", "Meb Keflezighi se convierte en el primer estadounidense en ganar Nueva York desde 1982."],
        ["Cancelado por el huracán Sandy", "Tras los destrozos del huracán, la carrera se suspende dos días antes de la salida."],
        ["La victoria de Flanagan", "Shalane Flanagan se convierte en la primera estadounidense en ganar Nueva York desde 1977."],
        ["Tola 2:04:58", "Tamirat Tola establece el récord masculino de la prueba con 2:04:58."],
        ["Obiri 2:19:51", "Hellen Obiri establece el récord femenino con 2:19:51, la primera vez que una mujer baja de 2:20 en Nueva York."],
        ["Almgren gana en su debut", "El sueco Andreas Almgren gana su primer maratón en 2:06:01, y Sheila Chepkirui logra su segundo título femenino."]
      ],
      records: ["Tamirat Tola (Etiopía)", "Hellen Obiri (Kenia)"],
      source: ["Reconstruido a partir del recorrido oficial del Maratón de Nueva York (2026) sobre vías de OpenStreetMap", "Terreno USGS 3DEP de 10 m"]
    }
  }
};
