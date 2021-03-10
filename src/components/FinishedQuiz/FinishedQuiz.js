import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from "../UI/Button/Button";

const FinishedQuiz = props => {
    const countRightAnswers = Object.values(props.results).filter(item => item === 'success').length

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.countQuestion.map((quizItem, index) => (
                    <li key={index}>
                        <strong>{index + 1}. {quizItem.question}</strong>
                        <i
                            className={
                                props.results[index + 1] === 'error' ?
                                'fa fa-times ' + classes.error :
                                'fa fa-check ' + classes.success
                            }
                        />
                    </li>
                ))}
            </ul>
            <p>Правильно {countRightAnswers} из {props.quizLength}</p>
            <div>
                <Button onClick={props.retry} type="primary">Повторить</Button>
                <Button onClick={props.toQuizList} type="success">Перейти в список тестов</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz;