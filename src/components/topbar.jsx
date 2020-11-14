import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../context/AppProvider';


const StyledWrapper = styled.div`
    background-color: #333;
    height:8vh;
    width:100vw;
    display: flex;
    justify-content: space-between;
    align-items:center;
    
    .menu{
        justify-content: space-between;
        display: flex;
        flex:1;
        padding-right:13px;
    }
    p{
        color: white;
        margin:0px
    }
    .title{
        flex:1;
        padding-left: 13px;
    }

`



const Topbar = () => {

    const { authController } = useContext(AppContext);
    const history = useHistory();

    const { user } = authController;

    const firstname = user ? user.firstname : '';
    const lastname = user ? user.lastname : '';

    const handleLogout = async () => {
        try {
            await authController.logout();
            history.replace('/login')
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <StyledWrapper>
            <div className="title">
                <Link to='/'>
                    <p>Keep it!</p>
                </Link>
            </div>
            <div className="menu">
                <p>{firstname} {lastname}</p>
                <Link to='/add-word'>
                    <p>Add Word</p>
                </Link>
                <Link to='/quiz'>
                    <p>Quiz</p>
                </Link>
                <p>History</p>
                <p onClick={handleLogout}>Logout</p>
            </div>
        </StyledWrapper>
    )
}

export default Topbar
