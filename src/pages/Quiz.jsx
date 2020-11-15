import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext } from '../context/AppProvider';
import { Button, notification, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const StyledWrapper = styled.div`
    padding: 10px 20%;

    @media(max-width: 768px) {
        padding: 0;
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
        box-shadow: 0 0 6px 0 rgba(0, 98, 255, 0.466);
        background-color: rgba(0, 98, 255, 0.171);
    }

    .bottom-action {
        display: flex;
        justify-content: space-between;
    }

`;

const Quiz = () => {

    const history = useHistory();
    const params = useParams();

    const { quizController } = useContext(AppContext);
    const { quizObj } = quizController;

    const [selected, setSelected] = useState(-1);
    const [loading, setLoading] = useState(false);

    const id = params.id;
    const page = params.page;

    const quiz = quizObj ? quizObj[id] : null;
    const words = quiz ? quiz.words : [];
    const word = words[page - 1];
    const choices = quiz ? quiz[`choice_${word}`] : [];

    const handleAnswer = async () => {
        setLoading(true);
        try {
            await quizController.answerQuiz(id, page, selected);
            if (page < words.length) {
                history.push(`/quiz/${id}/${+page + 1}`)
            } else {
                history.push(`/quiz/${id}/result`);
            }
        } catch (e) {
            notification['error']({
                message: 'Failed',
                description: 'Fail to answer the quiz'
            })
        }
        setLoading(false);
    }

    return (
        <StyledWrapper>
            <h1>{page}. {word} แปลว่าอะไร ?</h1>
            <div>
                {
                    choices.map((choice, index) => (
                        <div
                            key={index}
                            className={`choice-card ${selected === index ? 'selected' : ''}`}
                            onClick={() => setSelected(index)}
                        >
                            {index + 1}. {choice}
                        </div>
                    ))
                }
            </div>
            <div className='bottom-action'>
                <Space className='action'>
                    <Button type='primary' onClick={handleAnswer} loading={loading}>ตอบ</Button>
                    <div>{page} / {words.length}</div>
                </Space>
                <Space>
                    <ClockCircleOutlined />
                    <span>1:00</span>
                </Space>
            </div>
        </StyledWrapper>
    )
}

export default Quiz;
