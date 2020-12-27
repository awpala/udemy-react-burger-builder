import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({ isAuth }) => (
    <ul className={classes.NavigationItems} >
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
        {!isAuth
            ? <NavigationItem link="/auth" >Authenticate</NavigationItem>
            : <NavigationItem link="/logout" >Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;