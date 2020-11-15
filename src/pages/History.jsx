import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppProvider'

const StyledWrapper = styled.div`
    padding: 10px 20%;

    .history-card{
        width: 100%;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 16px;
        box-shadow: 0 0 6px 0 rgba(0,0,0,.15);
    }
`

const History = () => {
    const { quizController } = useContext(AppContext)
    const { quizs } = quizController

    return (
        <StyledWrapper>
            <h1>ประวัติ</h1>
            {
                quizs && quizs.map((quiz, index) => (
                    <div key={index} className="history-card">
                        <p>วันที่ {quiz.createdAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                            <span> {quiz.createdAt.toLocaleTimeString()}</span>
                        </p>
                        <p>คะแนน {quiz.score ? quiz.score : 0}</p>
                    </div>
                ))
            }

        </StyledWrapper>
    )
}

export default History
