export const questions = [
  // --- Multiple Choice ---
  {
    type: 'multipleChoice',
    position: 1,
    question: '¿Qué aspecto es más importante para ti al elegir un posgrado?',
    options: [
      'Desarrollo tecnológico',
      'Liderazgo organizacional',
      'Especialización técnica',
      'Gestión de proyectos',
    ],
    values: {
      'Desarrollo tecnológico': {
        Nanotecnología: 10,
        'Tecnologías de la Información': 10,
        'Ingeniería Eléctrica': 5,
      },
      'Liderazgo organizacional': { Administración: 15, Negocios: 10 },
      'Especialización técnica': { Mecánica: 10, Sistemas: 10, Materiales: 10 },
      'Gestión de proyectos': { Logística: 10, 'Cadena de Suministro': 10 },
    },
  },
  {
    type: 'multipleChoice',
    position: 2,
    question: '¿Dónde te gustaría aplicar tus conocimientos?',
    options: [
      'Empresas tecnológicas',
      'Sector energético',
      'Sector académico',
      'Sector manufacturero',
    ],
    values: {
      'Empresas tecnológicas': { 'Tecnologías de la Información': 10, 'Ciencia de Datos': 10 },
      'Sector energético': { 'Energías Renovables': 10, Energía: 10 },
      'Sector académico': { Nanotecnología: 10, Materiales: 10 },
      'Sector manufacturero': { Manufactura: 10, Mecánica: 10 },
    },
  },
  {
    type: 'multipleChoice',
    position: 3,
    question: '¿Qué prefieres desarrollar?',
    options: ['Software', 'Hardware', 'Soluciones híbridas', 'Infraestructura energética'],
    values: {
      Software: { Sistemas: 10, Cómputo: 10 },
      Hardware: { Electrónica: 10, Mecatrónica: 10 },
      'Soluciones híbridas': { Automatización: 10, 'Industria Inteligente': 10 },
      'Infraestructura energética': { Energía: 10, Sostenibilidad: 10 },
    },
  },
  {
    type: 'multipleChoice',
    position: 4,
    question: '¿Qué tipo de impacto quieres generar?',
    options: ['Empresarial', 'Ambiental', 'Tecnológico', 'Social'],
    values: {
      Empresarial: { Negocios: 10, 'Gestión de Tecnología': 10 },
      Ambiental: { Sostenibilidad: 15 },
      Tecnológico: { 'Inteligencia Artificial': 10, Nanotecnología: 10 },
      Social: { Logística: 10, Electromovilidad: 10 },
    },
  },
  {
    type: 'multipleChoice',
    position: 5,
    question: '¿Cuál es tu enfoque de trabajo preferido?',
    options: ['Investigación', 'Implementación', 'Optimización', 'Planificación estratégica'],
    values: {
      Investigación: { Nanotecnología: 10, Materiales: 10 },
      Implementación: { Electrónica: 10, Automatización: 10 },
      Optimización: { 'Ciencia de Datos': 10, Logística: 10 },
      'Planificación estratégica': { Administración: 10, 'Cadena de Suministro': 10 },
    },
  },
  {
    type: 'multipleChoice',
    position: 6,
    question: '¿Con qué tecnología te interesa trabajar?',
    options: ['Robótica', 'Energía solar', 'Machine Learning', 'Blockchain'],
    values: {
      Robótica: { Mecatrónica: 10, Automatización: 10 },
      'Energía solar': { 'Energías Renovables': 10, Sostenibilidad: 10 },
      'Machine Learning': { 'Inteligencia Artificial': 15, 'Ciencia de Datos': 10 },
      Blockchain: { 'Tecnologías de la Información': 10, Sistemas: 10 },
    },
  },

  // --- Slider ---
  {
    type: 'slider',
    position: 7,
    question: '¿Qué tanto te interesa la investigación aplicada?',
    min: 1,
    max: 5,
    sliderLogics: [
      { type: 'range', area: 'Nanotecnología', minPoints: 4, maxPoints: 5 },
      { type: 'range', area: 'Energías Renovables', minPoints: 4, maxPoints: 5 },
      { type: 'range', area: 'Materiales', minPoints: 4, maxPoints: 5 },
    ],
  },
  {
    type: 'slider',
    position: 8,
    question: '¿Qué tanto te interesa trabajar en ambientes industriales?',
    min: 1,
    max: 5,
    sliderLogics: [
      { type: 'range', area: 'Manufactura', minPoints: 3, maxPoints: 5 },
      { type: 'range', area: 'Mecatrónica', minPoints: 3, maxPoints: 5 },
    ],
  },
  {
    type: 'slider',
    position: 9,
    question: '¿Qué tan cómodo te sientes programando?',
    min: 1,
    max: 5,
    sliderLogics: [
      { type: 'range', area: 'Sistemas', minPoints: 3, maxPoints: 5 },
      { type: 'range', area: 'Cómputo', minPoints: 3, maxPoints: 5 },
    ],
  },
  {
    type: 'slider',
    position: 10,
    question: '¿Qué tanto te interesan temas de sustentabilidad?',
    min: 1,
    max: 5,
    sliderLogics: [
      { type: 'range', area: 'Sostenibilidad', minPoints: 3, maxPoints: 5 },
      { type: 'range', area: 'Energía', minPoints: 3, maxPoints: 5 },
    ],
  },
  {
    type: 'slider',
    position: 11,
    question: '¿Qué tanto te motiva la resolución de problemas logísticos complejos?',
    min: 1,
    max: 5,
    sliderLogics: [
      { type: 'range', area: 'Logística', minPoints: 3, maxPoints: 5 },
      { type: 'range', area: 'Cadena de Suministro', minPoints: 3, maxPoints: 5 },
    ],
  },

  // --- True/False ---
  {
    type: 'trueFalse',
    position: 12,
    question: '¿Te gustaría trabajar en un entorno académico?',
    values: {
      Verdadero: { Nanotecnología: 10, Materiales: 10 },
      Falso: { Administración: 10, 'Industria Inteligente': 5 },
    },
  },
  {
    type: 'trueFalse',
    position: 13,
    question: '¿Prefieres implementar soluciones en campo que diseñar teorías?',
    values: {
      Verdadero: { Electromovilidad: 10, Automatización: 10 },
      Falso: { 'Ciencia de Datos': 10, Sistemas: 10 },
    },
  },
  {
    type: 'trueFalse',
    position: 14,
    question: '¿Te interesa trabajar en el desarrollo de ciudades inteligentes?',
    values: {
      Verdadero: { 'Industria Inteligente': 10, Electromovilidad: 10 },
      Falso: { Mecánica: 10 },
    },
  },
  {
    type: 'trueFalse',
    position: 15,
    question: '¿Te interesa emprender una empresa basada en tecnología?',
    values: {
      Verdadero: { 'Gestión de Tecnología': 10, Negocios: 10 },
      Falso: { Sistemas: 5 },
    },
  },
]
