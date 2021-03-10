import {combineReducers} from "redux";
import quizReducer from "./quizReducer";
import quizCreateReducer from "./quizCreateReducer";
import authReducer from "./authReducer";

const rootReducers = combineReducers({
    quizReducer,
    quizCreateReducer,
    authReducer
});

export default rootReducers;