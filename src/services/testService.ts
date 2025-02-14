import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface Answer {
    question: string;
    answer: string | number;
}

interface TestData {
    userId: string;
    answers: Answer[];
    posgrado: string;
    timestamp: string;
}

export async function addTestData(testData: TestData): Promise<void> {
    try {
        await addDoc(collection(db, 'answers'), testData);
        console.log('Test data added successfully');
    } catch (error) {
        console.error('Error adding test data: ', error);
        throw error;
    }
}

// Example usage
const exampleTestData: TestData = {
    userId: 'testUserId',
    answers: [
        { question: '¿Qué aspecto es más importante para ti al elegir una maestría?', answer: 'Innovación tecnológica' },
        { question: 'En una escala del 1 al 5, ¿cuánto te interesan las energías renovables?', answer: 4 },
        { question: '¿Te consideras una persona orientada a resolver problemas técnicos?', answer: 'Verdadero' },
        { question: '¿Qué área de la ingeniería despierta más tu interés?', answer: 'Nanotecnología' },
        { question: 'Del 1 al 5, ¿qué tanto interés tienes en mejorar procesos logísticos?', answer: 3 },
    ],
    posgrado: 'Maestría en Ciencias de la Ingeniería con orientación en Nanotecnología',
    timestamp: new Date().toISOString(),
};

addTestData(exampleTestData)
    .then(() => console.log('Test data added successfully'))
    .catch((error) => console.error('Error adding test data: ', error));