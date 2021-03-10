import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from '../../form/formFraemwork';
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {addQuestion, createTest} from "../../store/actions/quizCreate";

function  createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: `Введите вопрос`,
            errorMessage: 'Вопрос не может быть пустым',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    }

    submit(event) {
        event.preventDefault();
    }

    addQuestion = (event) => {
        const { question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        this.props.addQuestion(questionItem);

        this.setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        });
    }

    createTest = event => {
            this.setState({
                formControls: createFormControls(),
                rightAnswerId: 1,
                isFormValid: false
            });

            this.props.createTest();
    }

    change(value, controlName) {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(this.state.formControls)
        });
    }

    selectChange = (event) => {
        this.setState({rightAnswerId: +event.target.value})
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls)
            .map((inputName, index) => {
                const input = this.state.formControls[inputName];

                return (
                    <Auxiliary key={input + index}>
                        <Input
                            label={input.label}
                            value={input.value}
                            valid={input.valid}
                            shouldValidate={!!input.validation}
                            touched={input.touched}
                            errorMessage={input.errorMessage}
                            onChange={event => this.change(event.target.value, inputName)}
                        />
                        { index === 0 ? <hr/> : null }
                    </Auxiliary>
                )
            });
    }

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChange}
            options={[
                {text: '1', value: 1},
                {text: '2', value: 2},
                {text: '3', value: 3},
                {text: '4', value: 4},
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submit}>

                        { this.renderInputs() }

                        { select }

                        <Button
                           type="primary"
                           onClick={this.addQuestion}
                           disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createTest}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        quiz: state.quizCreateReducer.quiz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: questionItem => dispatch(addQuestion(questionItem)),
        createTest: () => dispatch(createTest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);