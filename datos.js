/* ============ DATOS DE LA TIENDA: edita aquí ============ */
const TIENDA = {
  whatsapp: "34623554090",   // número con prefijo de país, sin + ni espacios
  telefono: "+34 623 554 090",
  email: "jimcarservice.industria@gmail.com",
  moneda: "EUR",
  direccion: "Cuesta la Posadilla 2, Loja, Granada, España",   // dirección de la tienda física
  horario: "Consúltanos el horario por WhatsApp o teléfono",   // escribe aquí tu horario cuando quieras, por ejemplo: Lunes a viernes 9:00–14:00 y 17:00–20:00
  mapaConsulta: "Cuesta la Posadilla 2, Loja, Granada, España",   // texto que se busca en Google Maps
  incrustarMapa: true,                           // mapa de Google incrustado (déjalo en true al publicar la web)
  fondo: "",                                     // ruta o URL de una foto de fondo (ej. "img/taller.jpg"). Vacío = ilustración
  imagenEmpresa: "img/portada.png",                             // foto grande de "Quiénes somos" (ej. "img/tienda.jpg"). Vacío = ilustración de ejemplo
  titulo: "Vestimos y equipamos a quien trabaja",
  descripcion: [
    "JIMCARSERVIS es tu tienda de ropa de trabajo y herramientas. Reunimos prendas resistentes, calzado y protección certificada, y herramientas eléctricas y manuales para talleres, obras y fábricas.",
    "Elige tu producto, mira el precio y pídelo por WhatsApp. Te confirmamos disponibilidad y te decimos cómo recogerlo o recibirlo."
  ]
};
const CATEGORIAS = { ropa:"Ropa de trabajo", epi:"Calzado y protección", electricas:"Herramientas eléctricas", manuales:"Herramientas manuales", consumibles:"Discos y accesorios" };
/* Formato: [ref, categoría, nombre, precio, descripción, [características], [tallas opcional], [fotos opcional]] · fotos: ["img/R-001-1.jpg","img/R-001-2.jpg"] (la primera es la portada) · precios de EJEMPLO */
const DATOS = [
 ["R-001","ropa","Mono de trabajo alta visibilidad bicolor",49.9,"Mono completo con parte superior amarillo alta visibilidad y pantalón azul marino, con bandas reflectantes en torso, mangas y piernas.",["Bicolor amarillo y azul marino","Bandas reflectantes en torso, mangas y piernas","Cuello reforzado"],["44","46","48","50","52","54","56","58"],["img/R-001-1.jpg","img/R-001-2.jpg"]],
 ["R-002","ropa","Pantalón alta visibilidad con refuerzos",34.9,"Pantalón amarillo alta visibilidad con refuerzos oscuros en las rodillas y bandas reflectantes en los bajos.",["Amarillo alta visibilidad","Refuerzos en rodillas y bandas reflectantes","Bolsillos laterales y traseros"],["38","40","42","44","46","48","50","52"],["img/R-002-1.jpg","img/R-002-2.jpg"]],
 ["R-003","ropa","Chaleco alta visibilidad manga corta",8.9,"Chaleco amarillo alta visibilidad con mangas cortas, cierre de cremallera y bandas reflectantes.",["Amarillo alta visibilidad","Cierre de cremallera","Bandas reflectantes"],["S","M","L","XL","XXL"],["img/R-003-1.jpg","img/R-003-2.jpg"]],
 ["R-004","ropa","Chaleco multibolsillos gris y burdeos",27.9,"Chaleco de trabajo gris con hombros y bolsillos en burdeos, cierre de cremallera y varios bolsillos para herramienta.",["Gris con detalles burdeos","Cierre de cremallera","Múltiples bolsillos"],["S","M","L","XL","XXL"],["img/R-004-1.jpg","img/R-004-2.jpg"]],
 ["R-005","ropa","Bata de trabajo morada",24.9,"Bata larga de trabajo con solapas, cierre de botones, bolsillo en el pecho y dos bolsillos inferiores.",["Color morado","Cierre de botones","Tres bolsillos"],["S","M","L","XL","XXL","XXXL"],["img/R-005-1.jpg","img/R-005-2.jpg"]],
 ["R-006","ropa","Chaleco ejecutivo azul marino reflectante",18.9,"Chaleco azul marino con bandas reflectantes, bolsillos con solapa y portatarjetas transparente.",["Azul marino con bandas reflectantes","Cierre de cremallera","Portatarjetas y bolsillos con solapa"],["S","M","L","XL","XXL"],["img/R-006-1.jpg","img/R-006-2.jpg"]],
 ["R-007","ropa","Chaqueta bomber alta visibilidad con capucha",54.9,"Chaqueta acolchada amarillo alta visibilidad con capucha, cuello con forro, puños elásticos y bandas reflectantes.",["Amarillo alta visibilidad","Capucha y cierre frontal","Bandas reflectantes"],["M","L","XL","XXL","XXXL"],["img/R-007-1.jpg","img/R-007-2.jpg"]],
 ["R-008","ropa","Chaleco alta visibilidad multibolsillos",16.9,"Chaleco amarillo alta visibilidad con bolsillos para herramientas, portatarjetas y bandas reflectantes.",["Amarillo alta visibilidad","Bolsillos con cremallera","Portatarjetas"],["S","M","L","XL","XXL"],["img/R-008-1.jpg","img/R-008-2.jpg"]],
 ["R-009","ropa","Impermeable verde con capucha",17.9,"Impermeable largo de color verde con capucha ajustable, puños elásticos y cremallera central.",["Color verde oliva","Capucha ajustable","Puños elásticos"],["M","L","XL","XXL"],["img/R-009-1.jpg","img/R-009-2.jpg"]],
 ["E-101","epi","Botas de seguridad S3",54.90,"Bota de piel con puntera y plantilla de protección, suela antideslizante.",["EN ISO 20345 · S3","Puntera de acero","Plantilla anti-perforación"],["39","40","41","42","43","44","45","46"]],
 ["E-102","epi","Zapato de seguridad deportivo S1P",44.90,"Zapato ligero y transpirable para uso en taller y almacén.",["EN ISO 20345 · S1P","Puntera composite","Suela antideslizante"],["39","40","41","42","43","44","45","46"]],
 ["E-103","epi","Guantes anticorte nivel 5",6.50,"Guante de montaje con palma de nitrilo para manipular piezas cortantes.",["EN 388 · Corte nivel 5","Palma de nitrilo","Galga 13"],["8","9","10","11"]],
 ["E-104","epi","Guantes de soldador de cuero",8.90,"Guante de cuero con costuras reforzadas para soldadura y calor.",["EN 12477","Cuero flor","Largo 35 cm"],["9","10","11"]],
 ["E-105","epi","Casco de obra con barboquejo",12.90,"Casco ventilado con ajuste de rueda y barboquejo de tres puntos.",["EN 397","Ajuste de rueda","Ventilado"]],
 ["E-106","epi","Gafas de protección antiempañantes",5.90,"Gafas panorámicas con tratamiento antiempañante y antirrayado.",["EN 166","Policarbonato","Protección UV"]],
 ["E-107","epi","Protectores auditivos de diadema",13.50,"Orejeras acolchadas para ambientes con ruido continuo.",["EN 352-1","Atenuación SNR 27 dB","Diadema regulable"]],
 ["E-108","epi","Mascarillas FFP2 (caja de 20)",16.00,"Mascarilla autofiltrante contra polvo fino y partículas.",["EN 149 · FFP2","Caja de 20 unidades","Ajuste nasal"]],
 ["H-201","electricas","Taladro percutor 750 W",69.00,"Taladro percutor para hormigón, ladrillo y metal, con maletín.",["750 W · 2.800 rpm","Portabrocas 13 mm","Maletín incluido"]],
 ["H-202","electricas","Moladora angular 125 mm 1200 W",59.90,"Moladora para corte y desbaste con protector regulable y mango lateral.",["1200 W · 12.000 rpm","Disco 125 mm","Rosca M14"]],
 ["H-203","electricas","Atornillador a batería 18 V",84.90,"Atornillador con dos baterías de litio y cargador rápido.",["18 V · 2 baterías 2,0 Ah","Par máx. 45 Nm","Luz LED"]],
 ["H-204","electricas","Sierra circular 1200 W 185 mm",79.00,"Sierra circular para madera con guía paralela y aspiración de polvo.",["1200 W","Disco 185 mm","Corte máx. 65 mm"]],
 ["H-205","electricas","Lijadora excéntrica 300 W",49.90,"Lijadora orbital con plato de 125 mm y recogida de polvo.",["300 W","Plato 125 mm","Velocidad variable"]],
 ["H-206","electricas","Moladora angular 115 mm 850 W",39.90,"Moladora compacta y ligera para trabajos de precisión.",["850 W · 11.000 rpm","Disco 115 mm","Rosca M14"]],
 ["H-207","electricas","Sierra de calar 650 W",54.90,"Sierra de calar pendular para madera, metal y plástico.",["650 W","Corte máx. 65 mm","Guía láser"]],
 ["H-208","electricas","Pistola de calor 2000 W",24.90,"Pistola de aire caliente con dos velocidades y control de temperatura.",["2000 W","Hasta 600 °C","2 boquillas"]],
 ["M-301","manuales","Juego de llaves combinadas 12 piezas",24.90,"Llaves de acero cromo-vanadio con estuche de tela enrollable.",["Medidas 8–19 mm","Cromo-vanadio","Estuche incluido"]],
 ["M-302","manuales","Flexómetro 5 m con freno",6.90,"Cinta métrica de 5 metros con freno y clip para cinturón.",["5 m × 25 mm","Cinta con freno","Carcasa antigolpes"]],
 ["M-303","manuales","Juego de destornilladores 10 piezas",17.90,"Destornilladores planos y de estrella con mango bimaterial.",["10 piezas","Puntas magnéticas","Mango bimaterial"]],
 ["M-304","manuales","Martillo de carpintero 500 g",11.50,"Martillo con mango de fibra y cabeza de acero forjado.",["500 g","Mango de fibra","Acero forjado"]],
 ["M-305","manuales","Alicate universal 200 mm",9.90,"Alicate de corte y agarre con mangos aislados.",["200 mm","Acero forjado","Mangos aislados"]],
 ["M-306","manuales","Nivel de burbuja 60 cm",12.90,"Nivel de aluminio con tres viales y base fresada.",["60 cm","3 viales","Aluminio"]],
 ["M-307","manuales","Caja de herramientas 20 pulgadas",19.90,"Caja con bandeja interior y cierres metálicos.",["20 pulgadas","Bandeja interior","Cierres metálicos"]],
 ["C-401","consumibles","Discos de corte metal 125 mm (25 uds)",19.90,"Discos finos para corte rápido de acero e inoxidable.",["125 × 1,0 × 22,2 mm","Pack de 25","Para acero e inox"]],
 ["C-402","consumibles","Discos de desbaste 115 mm (10 uds)",14.90,"Discos de desbaste para eliminar rebabas y soldaduras.",["115 × 6,0 × 22,2 mm","Pack de 10","Para acero"]],
 ["C-403","consumibles","Juego de brocas HSS 19 piezas",21.90,"Brocas para metal de 1 a 10 mm en estuche metálico.",["Ø 1–10 mm","Acero rápido HSS","Estuche metálico"]],
 ["C-404","consumibles","Brocas widia para hormigón (5 uds)",12.90,"Brocas con punta de widia para hormigón y piedra.",["Ø 5–10 mm","Punta widia","Vástago cilíndrico"]],
 ["C-405","consumibles","Cinta aislante PVC (pack de 10)",8.50,"Cinta aislante de PVC para instalaciones eléctricas.",["19 mm × 20 m","Pack de 10","Varios colores"]],
 ["C-406","consumibles","Bridas de nylon 300 mm (100 uds)",5.50,"Bridas negras resistentes a la intemperie.",["300 × 4,8 mm","Bolsa de 100","Resistentes a UV"]]
];
const PRODUCTOS = DATOS.map(([id,cat,nombre,precio,desc,specs,tallas,foto])=>({id,cat,nombre,precio,desc,specs,tallas,fotos:Array.isArray(foto)?foto:(foto?[foto]:[])}));
const POR_PAGINA = 10;   // productos por página, aproximado: se ajusta solo para que las filas queden completas
/* ========================================================= */
