import { db, auth } from '@/firebase';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { questionsData } from '@/assets/questions';
import { posgradoData } from '@/assets/posgrados';

export async function getMetrics() {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const answersSnapshot = await getDocs(collection(db, 'answers'));
    return {
        totalUsers: usersSnapshot.size,
        totalResponses: answersSnapshot.size,
    };
}

function initializeSliderQuestion(question) {
    const responses = Array(question.max - question.min + 1).fill(0);
    return {
        question: question.question,
        options: Array.from({ length: question.max - question.min + 1 }, (_, i) => (i + question.min).toString()),
        responses: responses
    };
}

function initializeTrueFalseQuestion(question) {
    return {
        question: question.question,
        options: ['Verdadero', 'Falso'],
        responses: [0, 0]
    };
}

function intializeMultipleChoiceQuestion(question) {
    return {
        question: question.question,
        options: question.options,
        responses: question.options.map(() => 0)
    };
}

export async function getQuestions() {
    const answersSnapshot = await getDocs(collection(db, 'answers'));
    const answers = answersSnapshot.docs.map(doc => doc.data());

    const questionMap = questionsData.reduce((acc, question) => {
        if (question.type === 'slider') {
            acc[question.question] = initializeSliderQuestion(question);
        } else if (question.type === 'trueFalse') {
            acc[question.question] = initializeTrueFalseQuestion(question);
        } else {
            acc[question.question] = intializeMultipleChoiceQuestion(question);
        }
        return acc;
    }, {});

    answers.forEach(answerDoc => {
        answerDoc.answers.forEach(answer => {
            const question = questionMap[answer.question];
            if (question) {
                const optionIndex = question.options.indexOf(answer.answer.toString());
                if (optionIndex !== -1) {
                    question.responses[optionIndex]++;
                }
            }
        });
    });

    return Object.values(questionMap);
}

export async function getPosgradosWithCounts() {
    const posgradosCount = {};

    posgradoData.forEach(posgrado => {
        posgradosCount[posgrado.name] = 0;
    });

    const answersSnapshot = await getDocs(collection(db, 'answers'));

    answersSnapshot.forEach(doc => {
        const data = doc.data();
        const posgrado = data.posgrado;
        if (posgradosCount[posgrado] !== undefined) {
            posgradosCount[posgrado]++;
        }
    });

    return posgradosCount;
}

export function subscribeToUserAuth(callback: (isAdmin: boolean) => void) {
    const user = auth.currentUser;
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                const isAdmin = userData.isAdmin;
                localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
                callback(isAdmin);
            }
        });

        return unsubscribe;
    }
    return null;


}