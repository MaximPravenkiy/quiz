import {
    GET_QUIZES_SUCCESS,
    GET_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR,
    QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY
} from "./actionTypes";
import axios from "axios";

function getQuizes() {
    return async dispatch => {
        try {
            const quizes = [];
            const response = await axios.get('https://quiz-afb39-default-rtdb.firebaseio.com/quizes.json');

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            });

            dispatch(getQuizesSuccess(quizes));
        } catch (e) {
            dispatch(getQuizesError(e));
        }
    }
}

function getQuizesSuccess(quizes) {
    return {
        type: GET_QUIZES_SUCCESS,
        quizes
    }
}

function getQuizesError(e) {
    return {
        type: GET_QUIZES_ERROR,
        e
    }
}



function fetchQuizById(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`https://quiz-afb39-default-rtdb.firebaseio.com/quizes/${id}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz));
        } catch (e) {
            dispatch(fetchQuizError(e));
        }

    }
}

function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

function fetchQuizError(e) {
    return {
        type: FETCH_QUIZ_ERROR,
        e
    }
}



function checkRightAnswer(answerId) {
    return (dispatch, getState) => {
        const state = getState().quizReducer;

        if (state.answerResult && state.answerResult[answerId]) return;

        const question = state.quiz[state.currentQuiz];
        const results = state.results;

        if  (question.rightAnswerId === answerId) {
            if (!results[state.currentQuiz + 1]) results[state.currentQuiz + 1] = 'success';
            dispatch(quizSetState({[answerId]: 'success'}));
            const timeout = setTimeout(() => {

                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    console.log('TUT')

                    // this.setState(prevState => ({currentQuiz : prevState.currentQuiz + 1}) );
                    dispatch(quizNextQuestion(state.currentQuiz + 1));
                }

                // this.setState(prevState => ({answerResult: ''}));
                clearTimeout(timeout);
            }, 500);
        } else {
            results[state.currentQuiz + 1] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}));
        }

    }
}

function isQuizFinished(state) {
    return state.currentQuiz + 1 === state.quiz.length;
}

function quizSetState(answerResult) {
    return {
        type: QUIZ_SET_STATE,
        answerResult
    }
}

function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

function quizNextQuestion(currentQuiz) {
    return {
        type: QUIZ_NEXT_QUESTION,
        currentQuiz
    }
}

function retry() {
    return {
        type: QUIZ_RETRY
    }
}

export {getQuizes, fetchQuizById, checkRightAnswer, retry};