import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {getQuizes} from "../../store/actions/quiz";

class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.getQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.props.quizes.length !== 0 ?
                            <ul>
                                {this.renderQuizes()}
                            </ul> :
                            <Loader/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quizes: state.quizReducer.quizes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuizes: () => dispatch(getQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);