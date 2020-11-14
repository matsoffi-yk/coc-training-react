import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';


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
    return (
        <StyledWrapper>
            <div className="title">
                <p>Keep it!</p>
            </div>
            <div className="menu">
                <p>Tanakorn Karode</p>
                <p>Add Word</p>
                <p>Quiz</p>
                <p>History</p>
            </div>

        </StyledWrapper>
       
    )
}

export default Topbar
