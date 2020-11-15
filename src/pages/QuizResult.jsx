import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppProvider'
import styled from 'styled-components';
import { Button, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';

const StyledWrapper = styled.div`
    
    padding: 10px 20%;

    @media(max-width: 768px) {
        padding: 10px 10%;
    }

    .top {
        text-align: center;
    }

    .choice-card {
        width: 100%;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 16px;
        box-shadow: 0 0 6px 0 rgba(0,0,0,.15);
        cursor: pointer;
        transition: .2s ease-in-out;
    }

    .choice-card.selected {
        box-shadow: 0 0 6px 0 rgba(9, 255, 0, 0.466);
        background-color: rgba(0, 255, 98, 0.171);
    }

    .choice-card.wrong {
        box-shadow: 0 0 6px 0 rgba(255, 0, 0, 0.466);
        background-color: rgba(255, 0, 0, 0.171);
    }

    .bottom-action {
        display: flex;
        justify-content: space-between;
    }

`;

const QuizResult = () => {

    const params = useParams();

    const { quizController } = useContext(AppContext);
    const { quizObj, evaluateQuiz } = quizController;

    const id = params.id;

    const quiz = quizObj ? quizObj[id] : null;
    const words = quiz ? quiz.words : [];
    const answers = !quiz ? [] : words.map((word) => quiz[`answer_${word}`]);

    const score = answers.reduce((prev, cur) => cur === 0 ? prev + 1 : prev, 0);

    useEffect(() => {
        if (score >= 0) {
            evaluateQuiz(id, score);
        }
    }, [id]);

    return (
        <StyledWrapper>
            <div className='top'>
                <h1>ยินดีด้วย !!</h1>
                <h2>คะแนนของคุณคือ</h2>
                <h2>{score} / {words.length} คะแนน</h2>
                <Space>
                    <Link to='/'>
                        <Button type='primary'>กลับหน้าแรก</Button>
                    </Link>
                    <Link to='/history'>
                        <Button type='dashed'>ดูประวัติ</Button>
                    </Link>
                </Space>
            </div>
            <h2>เฉลย</h2>
            {
                words.map((word, index) => (
                    <div className='quiz-page' key={index}>
                        <h2>{index + 1}. {word} แปลว่าอะไร ?</h2>
                        <div>
                            {
                                quiz && quiz[`choice_${word}`]
                                    .map((choice, j) => quiz[`answer_${word}`] === j || j === 0 ? (
                                        <div
                                            key={j}
                                            className={`choice-card ${j === 0 ? 'selected' : 'wrong'}`}
                                        >
                                            {choice}
                                        </div>
                                    ) : null)
                            }
                        </div>
                    </div>
                ))
            }

        </StyledWrapper>
    )
}

export default QuizResult
