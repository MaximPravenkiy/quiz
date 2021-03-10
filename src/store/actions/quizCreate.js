import {ADD_QUESTION, RESET_TEST} from "./actionTypes";
import axios from "axios";

function addQuestion(questionItem) {
    return {
        type: ADD_QUESTION,
        questionItem
    }
}

function createTest() {
    return async (dispatch, getState) => {
        await axios.post('https://quiz-afb39-default-rtdb.firebaseio.com/quizes.json', getState().quizCreateReducer.quiz);
        dispatch(resetQuiz());
    }
}

function resetQuiz() {
    return {
        type: RESET_TEST
    }
}

export {addQuestion, createTest}