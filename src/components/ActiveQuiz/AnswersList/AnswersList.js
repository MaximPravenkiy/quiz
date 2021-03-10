import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => {
    return (
        <ul className={classes.AnswersList}>
            { props.answers.map((answer, index) =>
                <AnswerItem
                    answer={answer}
                    key={index}
                    checkRightAnswer={props.checkRightAnswer}
                    answerResult={
                        props.answerResult && props.answerResult[answer.id] ?
                            props.answerResult[answer.id] :
                            null
                    }
                />) }
        </ul>
    );
}

export default AnswersList;