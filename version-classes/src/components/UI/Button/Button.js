import React from 'react';

import classes from './Button.css';

const button = ({ children, clicked, disabled, btnType }) => (
    <button
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
        disabled={disabled}
    >
        {children}
    </button>
);

export default button;