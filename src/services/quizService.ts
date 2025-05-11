import { ref, computed } from 'vue';
import { submitAnswers as submitAnswersToFirestore } from './submitService';
import { questionsData } from '@/assets/questions';

const questions = ref(questionsData);
const currentIndex = ref(0);
type AnswerType = number | string | null;

const answers = ref<AnswerType[]>(questionsData.map(question => {
    if (question.type === 'slider') {
        return 1;
    } else if (question.type === 'trueFalse') {
        return null;
    } else if (question.type === 'multipleChoice') {
        return null;
    }
    return null;
}));

const currentQuestion = computed(() => questions.value[currentIndex.value]);

function nextQuestion() {
    if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++;
    }
}

function prevQuestion() {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
}

function updateAnswer(value: number | string | null) {
    if (currentQuestion.value.type === 'slider') {
        answers.value[currentIndex.value] = Number(value);
    } else {
        answers.value[currentIndex.value] = value;
    }
    //nextQuestion(); Para que se mueva automaticamente
}

import { Router } from 'vue-router';

async function submitAnswers(router: Router) {
    const formattedAnswers = questions.value.map((question, index) => ({
        question: question.question,
        answer: typeof answers.value[index] === 'boolean' ? (answers.value[index] ? 'Verdadero' : 'Falso') : answers.value[index] ?? 'Sin respuesta',
    }));
    try {
        await submitAnswersToFirestore({ answers: formattedAnswers });
        console.log('Quiz enviado correctamente');
        answers.value = questionsData.map(question => {
            if (question.type === 'slider') {
                return 1;
            } else if (question.type === 'trueFalse') {
                return null;
            } else if (question.type === 'multipleChoice') {
                return null;
            }
            return null;
        });
        currentIndex.value = 0;
        router.push('/close');
    } catch (error) {
        console.error('Error en el del quiz', error);
    }
}

export {
    questions,
    currentIndex,
    answers,
    currentQuestion,
    nextQuestion,
    prevQuestion,
    updateAnswer,
    submitAnswers
};