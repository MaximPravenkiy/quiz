import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";
import auth from "../../store/actions/auth";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {
    state = {
        isFormValid:  false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'E-mail',
                errorMessage: 'Введите корректный e-mail',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    login = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    }

    register = async () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    }

    submit(event) {
        event.preventDefault();
    }

    onChange = (event, control) => {
        const formControls = { ...this.state.formControls };
        const controlCurrent = { ...control };
        controlCurrent.value = event.target.value;
        controlCurrent.touched = true;
        controlCurrent.valid = this.validate(controlCurrent.value, control.validation);
        formControls[controlCurrent.type] = controlCurrent

        let isFormValid = Object.values(formControls).every(control => control.valid);

        this.setState({
            formControls,
            isFormValid
        })
    }

    validate(value, validation) {
        if (!validation) return true;

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    renderInputs = () => {
        return Object.values(this.state.formControls)
            .map((control, index) => {
                return (
                    <Input
                        key={control + index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.onChange(event, control)}
                    />
                )
            });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form className={classes.AuthForm} onSubmit={this.submit}>

                        { this.renderInputs() }

                        <Button
                            type="success"
                            onClick={this.login}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.register}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);