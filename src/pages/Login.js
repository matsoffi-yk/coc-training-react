import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

const Login = () => {
    const { authController } = useContext(AppContext)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    console.log(authController);
    const handleLogin = () => {
        authController.login(email, password);
        console.log(email, ":", password);
    }
    return (
        <div>
            <h1>Login Page</h1>
            <label>Email</label>
            <input onChange={e => setEmail(e.target.value)} />
            <label>Password</label>
            <input onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <Link to='/register'>Register</Link>
            <Link to='/'>Login</Link>
        </div>
    )
}

export default Login
