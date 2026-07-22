export type Dimension = {
  id: string;
  title: string;
  slogan: string;
  problemas: string[];
  objetivo: string;
  propuestas: string[];
};

export const planMeta = {
  title: "Plan de Gobierno Municipal",
  subtitle: "Distrito de Pueblo Nuevo",
  location: "Provincia de Chincha · Región Ica",
  period: "Período 2027 – 2030",
  tagline: "Un distrito seguro, moderno, ordenado e inclusivo",
};

export const presentacion = `El distrito de Pueblo Nuevo constituye uno de los principales centros urbanos de la provincia de Chincha y enfrenta importantes desafíos relacionados con la seguridad ciudadana, el crecimiento urbano, la infraestructura vial, el ordenamiento territorial, la generación de empleo, la limpieza pública y la modernización de los servicios municipales.

Nuestra propuesta de gobierno tiene como finalidad construir un distrito seguro, moderno, ordenado, inclusivo y competitivo, donde la gestión municipal esté orientada a resultados, con transparencia, participación ciudadana y una adecuada administración de los recursos públicos.`;

export const ideario = {
  principios: [
    "Transparencia en la gestión pública",
    "Honestidad y lucha frontal contra la corrupción",
    "Participación ciudadana",
    "Desarrollo sostenible",
    "Igualdad de oportunidades",
    "Inclusión social",
    "Protección del medio ambiente",
    "Eficiencia en el uso de los recursos públicos",
  ],
  valores: [
    "Integridad",
    "Responsabilidad",
    "Solidaridad",
    "Respeto",
    "Justicia",
    "Vocación de servicio",
    "Trabajo en equipo",
  ],
};

export const vision = `Al 2030, Pueblo Nuevo será un distrito seguro, moderno, limpio, ordenado y competitivo, con servicios públicos eficientes, infraestructura de calidad, oportunidades para todos sus ciudadanos y una gestión municipal transparente que promueva el desarrollo económico, social y ambiental.`;

export const dimensiones: Dimension[] = [
  {
    id: "social",
    title: "Dimensión Social",
    slogan: "Pueblo Nuevo Seguro",
    problemas: ["Incremento de la delincuencia", "Violencia familiar"],
    objetivo:
      "Mejorar la calidad de vida de toda la población mediante servicios municipales eficientes.",
    propuestas: [
      'Implementar el Programa "Pueblo Nuevo Seguro"',
      "Fortalecer el Serenazgo Municipal con nuevas unidades y mejor equipamiento",
      "Instalar cámaras de videovigilancia con detectores IA en sectores estratégicos",
      "Desarrollar campañas permanentes contra la violencia familiar y el consumo de drogas",
      "Iluminación LED en calles, parques y avenidas",
      "Recuperación de espacios públicos para las familias",
    ],
  },
  {
    id: "economica",
    title: "Dimensión Económica",
    slogan: "Emprende Pueblo Nuevo",
    problemas: [
      "Comercio informal",
      "Escaso apoyo a emprendedores",
      "Falta de oportunidades laborales",
      "Limitado desarrollo turístico",
      "Deficiente infraestructura comercial",
    ],
    objetivo:
      "Promover el crecimiento económico local mediante el fortalecimiento del emprendimiento, el comercio y la generación de empleo.",
    propuestas: [
      'Crear el programa "Emprende Pueblo Nuevo"',
      "Implementar ferias permanentes para emprendedores",
      "Crear la Bolsa Laboral Municipal",
      "Capacitar gratuitamente a emprendedores y pequeños empresarios",
      "Impulsar la formalización de negocios",
      "Modernizar el mercado municipal",
      "Promover la gastronomía y el turismo local",
      "Establecer convenios con empresas para fomentar el empleo juvenil",
    ],
  },
  {
    id: "territorial",
    title: "Dimensión Territorial y Ambiental",
    slogan: "Agua que da Vida",
    problemas: [
      "Calles deterioradas",
      "Deficiente drenaje pluvial",
      "Acumulación de residuos sólidos",
      "Escasez de áreas verdes",
      "Necesidad de fortalecer la gestión del riesgo de desastres",
    ],
    objetivo:
      "Desarrollar un distrito limpio, ordenado, resiliente, ambientalmente sostenible y con agua permanente.",
    propuestas: [
      "Pavimentación de calles y avenidas",
      "Construcción de pistas y veredas accesibles",
      "Mejoramiento del sistema de drenaje pluvial",
      "Programa integral de limpieza pública",
      "Incrementar la cantidad de áreas verdes",
      "Campañas permanentes de arborización",
      "Programa Municipal de Reciclaje",
      "Implementar un Plan Distrital de Gestión del Riesgo de Desastres",
      "Mejorar el equipamiento para limpieza pública",
      "Cámaras de vigilancia en áreas verdes y puntos de desecho",
      "Ducto de abastecimiento por gravedad del agua las 24 horas",
    ],
  },
  {
    id: "institucional",
    title: "Dimensión Institucional",
    slogan: "Gestión Transparente",
    problemas: [
      "Baja confianza en la gestión pública",
      "Trámites administrativos lentos",
      "Escasa participación ciudadana",
      "Necesidad de mayor transparencia",
    ],
    objetivo:
      "Modernizar la Municipalidad Distrital de Pueblo Nuevo mediante una gestión eficiente, transparente y participativa.",
    propuestas: [
      "Digitalizar los trámites municipales",
      "Implementar el Gobierno Digital",
      "Crear una Plataforma de Transparencia Municipal",
      "Realizar audiencias públicas descentralizadas",
      "Fortalecer el Presupuesto Participativo",
      "Implementar una aplicación móvil para reportar incidencias",
      "Capacitación permanente del personal municipal",
      "Publicación periódica del avance de obras y ejecución presupuestal",
      "Implementar mecanismos de lucha contra la corrupción",
    ],
  },
  {
    id: "salud",
    title: "Dimensión Salud Pública",
    slogan: "Salud para Todos",
    problemas: [
      "Déficit de programas para adultos mayores y personas con discapacidad",
      "Necesidad de fortalecer la atención preventiva en salud",
    ],
    objetivo:
      "Influenciar a las entidades del Estado para brindar apoyo a quienes más lo necesitan y promover conciencia mediante campañas médicas.",
    propuestas: [
      "Programas permanentes para adultos mayores",
      "Fortalecer la Oficina Municipal de Atención a Personas con Discapacidad",
      "Campañas médicas gratuitas en todos los sectores",
      "Atención preventiva para niños, madres y adultos mayores",
      "Programa de lucha contra la anemia y la desnutrición",
      "Programa de prevención contra el dengue",
      "Apoyo a personas con discapacidad y salud mental",
      "Gestión para mejorar los establecimientos de salud",
      "Construcción del hospital nivel II en Pueblo Nuevo",
    ],
  },
  {
    id: "educacion",
    title: "Dimensión Educativa y Deporte",
    slogan: "Educación para el Futuro",
    problemas: [
      "Falta de priorización hacia el sector educativo",
      "Escasos recursos y políticas para potenciar el deporte local",
    ],
    objetivo:
      "Consolidar la participación municipal en programas educativos y deportivos que incentiven a la juventud.",
    propuestas: [
      "Construir y mejorar losas deportivas",
      "Crear la Escuela Municipal de Deportes",
      "Crear la Escuela Municipal de Música, Danza y Arte",
      "Mejor infraestructura educativa",
      "Capacitación y emprendimiento para jóvenes",
      "Escuelas deportivas, música, arte y culturales",
      "Apoyo permanente a docentes y estudiantes",
      "Academia pre universitaria para egresados de secundaria",
    ],
  },
  {
    id: "transporte",
    title: "Dimensión Transporte y Seguridad Vial",
    slogan: "Transporte Seguro y Ordenado",
    problemas: [
      "Alta siniestralidad vial a nivel nacional",
      "Persistencia del transporte informal",
      "Infraestructura vial deteriorada y señalización deficiente",
    ],
    objetivo:
      "Implementar un plan integral de gestión de seguridad vial y movilidad urbana para mitigar riesgos y garantizar un entorno seguro.",
    propuestas: [
      "Sistemas de Monitoreo Inteligente (cámaras con reconocimiento de placas)",
      "Regulación del Transporte Informal (inclusión y formalización)",
      "Talleres de educación vial para conductores",
      "Campañas de sensibilización en colegios y centros comunitarios",
      "Mejoramiento de pistas y veredas",
      "Ordenamiento del transporte urbano",
      "Señalización y semaforización moderna",
      "Vías seguras para peatones y ciclistas",
      "Apoyo total a conductores de taxis y vehículos menores",
    ],
  },
];

export const rendicionCuentas = [
  "Audiencias públicas semestrales",
  "Publicación de informes de gestión",
  "Portal de transparencia actualizado",
  "Seguimiento ciudadano de las obras públicas",
  "Canales digitales para recibir sugerencias y denuncias",
];
