import { useEffect, useState } from 'react'
import firebase from '../firebase';

const col = firebase.firestore().collection('quizes');

const QuizController = () => {

    let [quizObj, setQuizObj] = useState(null);

    console.log(quizObj);

    useEffect(() => {

        col.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                const dataObj = doc.data();
                const data = {
                    ...dataObj,
                    createdAt: dataObj.createdAt ? dataObj.createdAt.toDate() : null
                }
                if (!quizObj) quizObj = {};
                quizObj[doc.id] = data;
            });
            setQuizObj({ ...quizObj });
        });

    }, []);

    const createQuiz = async (data) => {
        try {
            const createdAt = new Date();
            const y = createdAt.getFullYear();
            const m = createdAt.getMonth();
            const d = createdAt.getDate();
            const hr = createdAt.getHours();
            const min = createdAt.getMinutes();
            const sec = createdAt.getSeconds();
            const mil = createdAt.getMilliseconds();
            const id = `${y}-${m}-${d}-${hr}-${min}-${sec}-${mil}`;
            await col.doc(id).set({ ...data, createdAt: new Date() });
            return id;
        } catch (e) {
            throw e;
        }

    }

    const answerQuiz = async (id, page, answer) => {
        const quiz = quizObj[id];
        if (!quiz) throw new Error('Quiz not found');
        const word = quiz.words[page - 1];
        return col.doc(id).set({ ...quiz, [`answer_${word}`]: answer });
    }

    return {
        quizObj,
        quizs: quizObj ? Object.values(quizObj) : null,
        createQuiz,
        answerQuiz
    }

}

export default QuizController
