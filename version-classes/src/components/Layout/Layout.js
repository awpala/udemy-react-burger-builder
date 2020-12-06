import React from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ({ children }) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            {children}
        </main>
    </Aux>
);

export default layout;