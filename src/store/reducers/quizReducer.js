import {
    FETCH_QUIZ_ERROR,
    FETCH_QUIZ_SUCCESS, FINISH_QUIZ,
    GET_QUIZES_ERROR,
    GET_QUIZES_SUCCESS, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    results: {},
    isFinished: false,
    answerResult: null,
    currentQuiz: 0,
    quiz: []
}

function quizReducer(state = initialState, action) {
    switch (action.type) {
        case GET_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes
            };
        case GET_QUIZES_ERROR:
            return {
                ...state,
                error: action.e
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: action.quiz,
            }
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                error: action.e,
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerResult: action.answerResult
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerResult: '',
                currentQuiz: action.currentQuiz
            }
        case QUIZ_RETRY:
            return {
                ...state,
                results: {},
                isFinished: false,
                answerResult: null,
                currentQuiz: 0,
            }
        default:
            return state;
    }
}

export default quizReducer;