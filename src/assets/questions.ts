export const questionsData = [
  {
    id: 1,
    type: 'multipleChoice',
    question: '¿Qué aspecto es más importante para ti al elegir una maestría?',
    options: ['Innovación tecnológica', 'Aplicación práctica', 'Avances científicos'],
    values: {
      'Innovación tecnológica': { 'Innovación Tecnológica': 10 },
      'Aplicación práctica': { 'Producción y Calidad': 10 },
      'Avances científicos': { 'Nanotecnología': 10 },
    },
  },
  {
    id: 2,
    type: 'slider',
    question: 'En una escala del 1 al 5, ¿cuánto te interesan las energías renovables?',
    min: 1,
    max: 5,
    values: (answer: number) => ({ 'Energías Térmica y Renovable': answer * 2 }),
  },
  {
    id: 3,
    type: 'trueFalse',
    question: '¿Te consideras una persona orientada a resolver problemas técnicos?',
    values: {
      'Verdadero': { 'Ingeniería Eléctrica': 5 },
      'Falso': {},
    },
  },
  {
    id: 4,
    type: 'multipleChoice',
    question: '¿Qué área de la ingeniería despierta más tu interés?',
    options: [
      'Materiales',
      'Nanotecnología',
      'Tecnologías de la información',
      'Sistemas',
    ],
    values: {
      'Materiales': { 'Materiales': 10 },
      'Nanotecnología': { 'Nanotecnología': 10 },
      'Tecnologías de la información': { 'Tecnologías de la Información': 10 },
      'Sistemas': { 'Sistemas': 10 },
    },
  },
  {
    id: 5,
    type: 'slider',
    question: 'Del 1 al 5, ¿qué tanto interés tienes en mejorar procesos logísticos?',
    min: 1,
    max: 5,
    values: (answer: number) => ({ 'Logística y Cadena de Suministro': answer * 2 }),
  },
];

/* 
* Formas de asignarle puntos por tipo de pregunta

* Opción múltiple

? value: { 
?  'Opcion 1' : { 'Area 1': 10, 'Area 2': 5},
?  }

* Slider

? values: {answer: number} => ({ 'Area 1': answer * 2 }),

* Verdadero o falso

? values: {
?   'Verdadero': { 'Area 1': 10 },
?   'Falso': {},
? }
*/
