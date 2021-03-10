import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem = props => {
    let resultClass = '';

    if (props.answerResult === 'success') resultClass = classes.success;
    if (props.answerResult === 'error') resultClass = classes.error;

    return (
        <li
            className={`${classes.AnswerItem} ${resultClass}`}
            onClick={props.checkRightAnswer.bind(null, props.answer.id)}
        >
            { props.answer.text }
        </li>
    );
}

export default AnswerItem;