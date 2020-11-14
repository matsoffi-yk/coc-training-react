import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppProvider';

const StyledWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .container{
        width: 50vw;
        height: 77vh;
        border-style: ridge;
    }
    .text{
        margin-left: 17px;
    }
    .input{
        width: 90%;
        height: 4vh;
    }
    .bnt{
        text-align: center;
        margin-top: 20px;
        padding-right: 15px;
        
    }
    .button{
        height: 30px;
        width: 100px;
    }

`

const Register = () => {
    const { authController } = useContext(AppContext)
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleCreateUser = () => {
        if (password === confirmPassword) {
            authController.register(username, email, password)
        } else { console.log("Password has Problem"); }
    }
    return (
        <StyledWrapper>
            <div className="container">
                <div className="text">
                    <p>Username</p>
                    <input type="username" onChange={e => setUsername(e.target.value)} className="input"></input>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} className="input"></input>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} className="input"></input>
                    <p>Confirm Password</p>
                    <input type="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} className="input"></input>
                    <div className="bnt">
                        <Link to='/home'>
                            <button type="button" onClick={handleCreateUser} className="button" >Register</button>

                        </Link>
                        <Link to='/'>
                            <p>back</p>
                        </Link>
                    </div>
                </div>
            </div>

        </StyledWrapper>
    )
}

export default Register;
