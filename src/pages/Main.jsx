import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Topbar from '../components/Topbar';
import AddWord from './AddWord';
import Home from './Home';
import Quiz from './Quiz';

const Main = () => {
    return (
        <div>
            <Topbar />
            <Switch>
                <Route path='/add-word' component={AddWord} />
                <Route path='/quiz' component={Quiz} />
                <Route path='/' component={Home} />
            </Switch>
        </div>

    )
}

export default Main
