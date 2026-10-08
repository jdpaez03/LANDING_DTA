// Landing copy and data — source: context/ACQUA_CONTEXT.md (brochure oct 2026, GVI schematic jul 2026).
// Do NOT add prices, appreciation, ROI or Friends & Family terms here (see §11 of the context doc).

export const FACTS = [
  { value: '50', label: 'Niveles' },
  { value: '136', label: 'Residencias' },
  { value: '6', label: 'Tipologías' },
  { value: '1,656 m²', label: 'Amenidades propias' },
  { value: '2029', label: 'Entrega estimada' },
]

export const CLUB = {
  sports: ['Estadio GNP Seguros', '8 canchas de tenis y pádel', 'Alberca semiolímpica', 'Gimnasio', 'Jogging track y vitapista', 'Tee de práctica y mini golf', 'Soccer, squash, básquetbol y voleibol'],
  social: ['Casa Club', 'Restaurante y sport bar con terraza', 'Spa', 'Salón multiusos', 'Parque acuático', 'Parque con juegos infantiles', 'Putting green'],
  services: ['Clases deportivas', 'Torneos', 'Valet parking', 'Golf cart shuttle', 'Room service', 'Seguridad 24 horas'],
}

export const AMENITIES = [
  {
    level: 'Planta baja',
    items: ['Lobby de doble altura con espejo de agua y escultura', 'Sala de espera', 'Gimnasio', 'Ludoteca', 'Salón de eventos', 'Salón privado y pantry', 'Motor lobby', 'Paquetería y buzones'],
  },
  {
    level: 'Mezzanine',
    items: ['Coworking', 'Sala de juntas', 'Administración'],
  },
  {
    level: 'Nivel 41',
    items: ['Sports bar', 'Game room', 'Wine cellar', 'Sala de estar y mirador', 'Balcón con vista a la ciudad', 'Cinco cabanas privadas con terraza', 'Sala de experiencia virtual'],
  },
]

export const TYPOLOGIES = [
  { id: 'E', name: 'Tipo E', program: '2 recámaras', interior: 102.73, terrace: 6.29, total: 109.02 },
  { id: 'A', name: 'Tipo A', program: '3 recámaras', interior: 147.32, terrace: 9.77, total: 157.09 },
  { id: 'B2', name: 'Tipo B2', program: '3 recámaras · sala de TV · servicio', interior: 169.17, terrace: 13.98, total: 183.15 },
  { id: 'B1', name: 'Tipo B1', program: '3 recámaras · sala de TV · servicio', interior: 183.08, terrace: 13.11, total: 196.16 },
  { id: 'C', name: 'Tipo C', program: '3 recámaras · sala de TV · servicio', interior: 219.07, terrace: 14.71, total: 233.78 },
  { id: 'PH', name: 'Penthouse D', program: '4 recámaras · bar y cava · cuarto de juegos', interior: 359.21, terrace: 26.25, total: 385.46 },
]

export const LOCATION = {
  address: 'Camino al Mirador 5800, Monterrey, N.L.',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Camino+al+Mirador+5800+Monterrey+Nuevo+Leon',
  nearby: ['Valle Oriente', 'San Pedro Garza García', 'Tecmilenio Las Torres', 'Parque Rufino Tamayo', 'Hospital Zambrano Hellion', 'Club Campestre', 'UANL Mederos'],
}

export const DEVELOPERS = [
  {
    name: 'PAGA Desarrollos',
    motto: 'Veinticinco años desarrollando valor.',
    text: 'Desde 2001, 34 desarrollos en México y Estados Unidos, incluyendo South Padre Island, Texas.',
  },
  {
    name: 'Grupo DAGS',
    motto: 'Trascender construyendo con valor.',
    text: 'Desarrollo, construcción e inversión con proyectos en Nuevo León, Coahuila y Nayarit.',
  },
]

export const LEGAL =
  'Imágenes, renders y planos ilustrativos basados en el diseño esquemático; sujetos a cambio sin previo aviso. Este material es informativo y no constituye una oferta. PAGA Desarrollos · Grupo DAGS.'
