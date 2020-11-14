import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddWord from './pages/AddWord';

function App() {
  return (
    <Router>
      {/* <h3>Topbar</h3> */}
      <Switch>
        <Route path='/add-word' component={AddWord} />
        <Route path='/home' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/' component={Login} />
        
      </Switch>
    </Router>
  );
}

export default App;
