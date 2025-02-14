import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';
import { calculatePosgrado } from './calculateService';

//Función para enviar respuestas a la base de datos
interface Answer {
  question: string;
  answer: string | number;
}

export async function submitAnswers(answers: { answers: Answer[] }): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    const timestamp = new Date().toISOString();
    const posgrado = calculatePosgrado(answers.answers);
    await addDoc(collection(db, 'answers'), { userId: user.uid, ...answers, posgrado, timestamp });
    //alert('Quiz finalizado correctamente');
  } catch (error) {
    console.error('Error añadiendo el documento: ', error);
    throw error;
  }
}

//Función para obtener las preguntas y respuestas del usuario identificado
interface UserAnswer {
  id: string;

  timestamp: string;

  answers: {

    question: string;

    answer: string | number;

  }[];

  posgrado: string;
}


export async function getUserAnswers(): Promise<UserAnswer[]> {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');
    const q = query(collection(db, 'answers'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const userAnswers = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        timestamp: data.timestamp,
        answers: data.answers,
        posgrado: data.posgrado // Obtener el campo posgrado
      };
    });
    return userAnswers;
  } catch (error) {
    console.error('Error obteniendo respuestas:', error);
    throw error;
  }
}