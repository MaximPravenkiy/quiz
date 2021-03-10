import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {checkRightAnswer, fetchQuizById, retry} from "../../store/actions/quiz";

class Quiz extends React.Component {

    toQuizList = () => {
        this.props.history.push('/');
    }

    componentDidMount = () => {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retry();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.quiz.length === 0 ?
                            <Loader/> :
                            this.props.isFinished ?
                                <FinishedQuiz
                                    countQuestion={this.props.quiz}
                                    quizLength={this.props.quiz.length}
                                    results={this.props.results}
                                    retry={this.props.retry}
                                    toQuizList={this.toQuizList}
                                />
                                :
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.currentQuiz].answers}
                                    question={this.props.quiz[this.props.currentQuiz].question}
                                    checkRightAnswer={this.props.checkRightAnswer}
                                    quizLength={this.props.quiz.length}
                                    currentQuiz={this.props.currentQuiz}
                                    answerResult={this.props.answerResult}
                                />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.quizReducer.results,
        isFinished: state.quizReducer.isFinished,
        answerResult: state.quizReducer.answerResult,
        currentQuiz: state.quizReducer.currentQuiz,
        quiz: state.quizReducer.quiz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        checkRightAnswer: answerId => dispatch(checkRightAnswer(answerId)),
        retry: () =>  dispatch(retry())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);