import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

const StyledWrapper = styled.div`

    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .container{
        width: 40vw;
        height: 50vh;
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

const LogIn = () => {
    const { authController } = useContext(AppContext)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleLogin = () => {
        authController.login(email, password);
        console.log(email, ":", password);
    }
    return (
        <StyledWrapper>
            <div className="container">
                <div className="text">
                    <label>Email</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} className="input"></input>
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} className="input"></input>
                    <div className="bnt">
                        <Link to='/home'>
                            <button type="button" onClick={handleLogin} className="button" >Login</button>

                        </Link>
                        <Link to='/register'>
                            <p>register</p>
                        </Link>
                    </div>
                </div>
            </div>

        </StyledWrapper>
    )
}

export default LogIn;
