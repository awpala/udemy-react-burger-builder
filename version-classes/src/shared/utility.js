export const checkValidity = (value, rules) => {
    let isValid = true;

    const { required, minLength, maxLength, isEmail, isNumeric } = rules;

    if (required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (minLength) {
        isValid = value.length >= minLength && isValid;
    }

    if (maxLength) {
        isValid = value.length <= maxLength && isValid;
    }

    if (isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if (isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    
    return isValid;
}
