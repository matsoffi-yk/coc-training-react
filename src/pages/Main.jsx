import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Topbar from '../components/Topbar';
import AddWord from './AddWord';
import Home from './Home';
import CreateQuiz from './CreateQuiz';
import Quiz from './Quiz';
import QuizResult from './QuizResult';

const Main = () => {
    return (
        <div>
            <Topbar />
            <Switch>
                <Route path='/quiz/:id/result' component={QuizResult} />
                <Route path='/quiz/:id/:page' component={Quiz} />
                <Route path='/add-word' component={AddWord} />
                <Route path='/quiz' component={CreateQuiz} />
                <Route path='/' component={Home} />
            </Switch>
        </div>

    )
}

export default Main
