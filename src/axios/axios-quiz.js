import axios from "axios";

export default axios.create({
    baseURL: 'https://quiz-afb39-default-rtdb.firebaseio.com/'
})