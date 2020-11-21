import React from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';

const layout = ({ children }) => (
    <Aux>
        <div></div>
        <main className={classes.Content}>
            {children}
        </main>
    </Aux>
);

export default layout;