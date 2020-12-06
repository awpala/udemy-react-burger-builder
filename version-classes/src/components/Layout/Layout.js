import React from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ({ children }) => (
    <Aux>
        <Toolbar />
        <main className={classes.Content}>
            {children}
        </main>
    </Aux>
);

export default layout;