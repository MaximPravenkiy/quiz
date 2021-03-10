function createControl(config, validation) {
    return {
       ...config,
       validation,
       valid: !validation,
       touched: false,
       value: ''
    }
}

function validate(value, validation = null) {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

function validateForm(formControls) {
    let isFormValid = Object.values(formControls).every(control => control.valid);

    return isFormValid;
}

export {createControl, validate, validateForm};