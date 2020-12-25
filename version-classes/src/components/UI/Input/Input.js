import React from 'react';

import classes from './Input.css';

const input = ({ elementType, elementConfig, value, changed, label }) => {
    let inputElement = null;

    switch(elementType) {
        case('input'):
            inputElement = (
                <input
                    className={classes.InputElement}
                    value={value}
                    onChange={changed}
                    {...elementConfig}
                />
            );
            break;
        case('textarea'):
            inputElement = (
                <textarea
                    className={classes.InputElement}
                    value={value}
                    onChange={changed}
                    {...elementConfig}
                />
            );
            break;
        case('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={value}
                    onChange={changed}
                >
                    {elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={classes.InputElement}
                    value={value}
                    onChange={changed}
                    {...elementConfig}
                />
            );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    );
}

export default input;