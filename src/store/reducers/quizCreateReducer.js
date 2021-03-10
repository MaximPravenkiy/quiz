import {ADD_QUESTION, RESET_TEST} from "../actions/actionTypes";

const initialState = {
    quiz: []
};

function quizCreateReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.questionItem]
            };
        case RESET_TEST:
            return {
                ...state,
                quiz: []
            };
        default:
            return state;
    }
}

export default quizCreateReducer;