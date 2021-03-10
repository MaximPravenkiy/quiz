import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.currentQuiz + 1}. </strong>
                    {props.question}
                </span>
                <small>{props.currentQuiz + 1} из {props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                checkRightAnswer={props.checkRightAnswer}
                answerResult={props.answerResult}
            />
        </div>
    );
}

export default ActiveQuiz;