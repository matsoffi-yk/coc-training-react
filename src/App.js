import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
