import React from 'react';
import classes from './Layout.module.css';
import MenuToggle from "../components/Nav/MenuToggle/MenuToggle";
import Drawer from "../components/Nav/Drawer/Drawer";
import {connect} from "react-redux";


class Layout extends React.Component {

    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({menu: !this.state.menu})
    }

    closeMenu = () => {
        this.setState({menu: false})
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isAuthenticated={this.props.isAuthenticated}
                    isOpen={this.state.menu}
                    closeMenu={this.closeMenu}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    { this.props.children }
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.authReducer.token
    }
}

export default connect(mapStateToProps)(Layout);