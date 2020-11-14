import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

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

const RegisTer =()=> {
    return (

        <StyledWrapper>
            <div className="container">
                <div className="text">
                    <p>Username</p>
                    <input type="email" className="input"></input>
                    <p>Email</p>
                    <input type="email" className="input"></input>
                    <p>Password</p>
                    <input type="password" className="input"></input>
                    <p>Confirm Password</p>
                    <input type="password" className="input"></input>
                    <div className="bnt">
                        <Link to='/home'>
                             <button type="button" className="button" >Register</button>
                             
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

export default  RegisTer;
