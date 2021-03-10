import React from 'react';
import classes from './Drawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from 'react-router-dom';

class Drawer extends React.Component {

    clickHandle = () => {
        this.props.closeMenu();
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandle}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = !this.props.isOpen ?
             `${classes.Drawer} ${classes.close}` :
             `${classes.Drawer}`;
        const links = [
            {to: '/', label: 'Список', exact: true},
        ];

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
            links.push({to: '/logout', label: 'Выйти', exact: false});
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false});
        }

        return (
            <React.Fragment>
                <nav className={cls}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.closeMenu}/> : null}
            </React.Fragment>

        );
    }
}

export default Drawer;