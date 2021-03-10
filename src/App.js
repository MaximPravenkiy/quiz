import React, {Component} from "react";
import './App.css';
import Layout from "./hoc/Layout";
import {Redirect, Route, Switch} from 'react-router-dom';
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/' exact component={QuizList}/>
                <Redirect to='/' />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/quiz-creator' component={QuizCreator}/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/' exact component={QuizList}/>
                    <Route path='/logout' component={Logout}/>
                    <Redirect to='/' />
                </Switch>
            );
        }

        return (
            <div className="App">
                <Layout>
                    { routes }
                </Layout>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.authReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
