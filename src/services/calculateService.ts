import { questionsData } from '../assets/questions';
import { posgradoData } from '../assets/posgrados';

interface Answer {
    question: string;
    answer: string | number;
}

interface AreaPoints {
    [key: string]: number;
}

export function calculatePosgrado(answers: Answer[]): string {
    const areaPoints: AreaPoints = {
        'Logística y Cadena de Suministro': 0,
        'Materiales': 0,
        'Ingeniería Eléctrica': 0,
        'Nanotecnología': 0,
        'Tecnología Energética': 0,
        'Energías Térmica y Renovable': 0,
        'Sistemas': 0,
        'Automotriz': 0,
        'Aeronáutica': 0,
        'Tecnologías de la Información': 0,
        'Manufactura': 0,
        'Mecánica': 0,
        'Telecomunicaciones': 0,
        'Mecatrónica': 0,
        'Innovación Tecnológica': 0,
        'Dirección de Procesos Formativos': 0,
        'Producción y Calidad': 0,
        'Comercio Internacional': 0,
        'Relaciones Industriales': 0,
        'Finanzas': 0,
    };

    answers.forEach(answer => {
        const question = questionsData.find(q => q.question === answer.question);
        if (question) {
            if (question.type === 'slider' && typeof answer.answer === 'number') {
                const values = typeof question.values === 'function'
                    ? question.values(answer.answer)
                    : question.values[answer.answer];
                Object.keys(values).forEach(key => {
                    areaPoints[key] += values[key];
                });
            } else if (typeof answer.answer === 'string') {
                const values = question.values[answer.answer];
                Object.keys(values).forEach(key => {
                    areaPoints[key] += values[key];
                });
            }
        }
    });

    let closestPosgrado;
    let minDifference = Infinity;

    posgradoData.forEach(posgrado => {
        if (posgrado.areaPoints) {
            let difference = 0;
            Object.keys(posgrado.areaPoints).forEach(area => {
                difference += Math.abs((areaPoints[area] || 0) - posgrado.areaPoints[area]);
            });

            if (difference < minDifference) {
                minDifference = difference;
                closestPosgrado = posgrado;
            }
        }
    });

    return closestPosgrado && closestPosgrado.name ? closestPosgrado.name : 'No se encontró un posgrado adecuado';
}