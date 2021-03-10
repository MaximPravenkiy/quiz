import React from 'react';
import classes from './MenuToggle.module.css';

const MenuToggle = props => {
    let cls = props.isOpen ?
        `${classes.MenuToggle} fa fa-times ${classes.open}` :
        `${classes.MenuToggle} fa fa-bars`;

    return (
        <i
            className={cls}
            onClick={props.onToggle}
        />
    );
}

export default MenuToggle;