import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const inputType = props.type || 'text';
    const cls = isInvalid(props) ?
        `${classes.Input} ${classes.invalid}` :
        `${classes.Input}`;
    const htmlFor = `${inputType}-${Math.random()}`

    return (
        <div className={cls}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalid(props) ? <span>{props.errorMessage}</span> :  null}
        </div>
    );
}

export default Input;