import React from 'react';

import classes from './Backdrop.css';

const backdrop = ({ show, clicked }) => (
    show
    ? <div className={classes.Backdrop} onClick={clicked} ></div> 
    : null
);

export default backdrop;