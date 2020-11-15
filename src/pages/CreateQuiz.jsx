import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Select, Space, Button, notification } from 'antd';
import { AppContext } from '../context/AppProvider';
import { dateTypes, wordTypes } from '../common/labels';
import { useHistory } from 'react-router-dom';

const StyledWrapper = styled.div`
    padding: 10px 20%;

    @media(max-width: 768px) {
        padding: 0;
    }

    .form-item {
        margin-bottom: 16px;
        max-width: 300px;
    }

    .label {
        margin-bottom: 10px;
    }

    .plus-btn {
        width: 50%;
    }

    .minus-btn {
        color: #ff9a9a;
        cursor: pointer;
    }

    .select {
        width: 100%;
    }
`;

const CreateQuiz = () => {

    const { vocabController, quizController } = useContext(AppContext);
    const { vocabs, vocabObj } = vocabController;
    const { createQuiz } = quizController;

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState({
        dateType: 'all',
        dates: [],
        wordTypes: wordTypes.map(t => t.value),
        wordCount: 10,
        choiceCount: 4,
        timeout: 60
    });

    const dateObj = !vocabs ? {} : vocabs.reduce((prev, cur) => {
        if (cur.createdAt) {
            const dateFormat = cur.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            prev[dateFormat] = '';
        }
        return prev;
    }, {});

    const dates = Object.keys(dateObj).map(d => ({ label: d, value: d }));

    const remainVocabs = !vocabs ? [] : vocabs.filter((vocab) => {
        const correctType = quiz.wordTypes.find((type) => {
            return vocab.types.includes(type);
        });
        const correctDate = quiz.dateType === 'all' || quiz.dates.find((date) => {
            if (!vocab.createdAt) return false;
            const dateFormat = vocab.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            return dateFormat === date
        });
        return correctType && correctDate;
    });

    useEffect(() => {
        if (remainVocabs.length < quiz.wordCount) {
            setQuiz({ ...quiz, wordCount: remainVocabs.length })
        }
    }, [remainVocabs]);

    const handleChangeDates = (values) => {
        setQuiz({ ...quiz, dates: values });
    }

    const handleChangeTypes = (values) => {
        setQuiz({ ...quiz, wordTypes: values })
    }

    const pickWords = () => {
        const { wordCount } = quiz;
        let source = [...remainVocabs];
        let dest = [];

        while (dest.length < wordCount) {
            const rand = Math.floor(Math.random() * source.length);
            dest.push(source[rand].word);
            source.splice(rand, 1);
        }

        return dest;
    }

    const createChoices = (word) => {
        const choices = [vocabObj[word].meanings.join(', ')];
        const source = [...vocabs];

        while (choices.length < Number(quiz.choiceCount) && source.length > 0) {
            const rand = Math.floor(Math.random() * source.length);

            if (source[rand].word !== word)
                choices.push(source[rand].meanings.join(', '));
            source.splice(rand, 1);
        }

        return choices;
    }

    const handleCreateQuiz = async () => {
        setLoading(true);
        try {
            const words = pickWords();

            if (words.length <= 0)
                throw new Error('No words')

            const choicesList = {};

            words.forEach(word => {
                choicesList[`choice_${word}`] = createChoices(word);
            });

            const id = await createQuiz({ ...quiz, words, ...choicesList });

            history.push(`/quiz/${id}/1`);
        } catch (e) {
            console.log(e);
            notification['error']({
                message: 'Failed',
                description: e.message
            })
        }
        setLoading(false);
    }

    return (
        <StyledWrapper>
            <h1>Quiz</h1>
            <div className='form-item'>
                <div className='label'>
                    <label htmlFor='date-type'>Date Type</label>
                </div>
                <Select
                    id='date-type'
                    className='select'
                    placeholder='Date type'
                    options={dateTypes}
                    value={quiz.dateType}
                    onChange={value => setQuiz({ ...quiz, dateType: value })}
                />
            </div>
            {
                quiz.dateType === 'specific' && (
                    <div className='form-item'>
                        <div className='label'>
                            <label htmlFor='date'>Date</label>
                        </div>
                        <Select
                            id='date'
                            placeholder='Dates'
                            className='select'
                            options={dates}
                            value={quiz.dates}
                            mode='multiple'
                            onChange={handleChangeDates}
                        />
                    </div>
                )
            }
            <div className='form-item'>
                <div className='label'>
                    <label htmlFor='type'>Types</label><br />
                </div>
                <Select
                    id='type'
                    placeholder='Word type'
                    options={wordTypes}
                    mode='multiple'
                    className='select'
                    value={quiz.wordTypes}
                    onChange={handleChangeTypes}
                />
            </div>
            <div className='form-item'>
                <div className='label'>
                    <label htmlFor='word-count'>Word count</label>
                </div>
                <div>
                    <Space>
                        <Input
                            id='word-count'
                            placeholder='Word Count'
                            type='number'
                            value={quiz.wordCount}
                            onChange={e => setQuiz({ ...quiz, wordCount: e.target.value })}
                        />
                        <span> / {remainVocabs.length} </span>
                    </Space>
                </div>
            </div>
            <div className='form-item'>
                <div className='label'>
                    <label htmlFor='choice-count'>Choice count</label>
                </div>
                <div>
                    <Input
                        id='choice-count'
                        placeholder='Choice count'
                        type='number'
                        value={quiz.choiceCount}
                        onChange={e => setQuiz({ ...quiz, choiceCount: e.target.value })}
                    />
                </div>
            </div>
            <div className='form-item'>
                <div className='label'>
                    <label htmlFor='timeout'>Timeout</label>
                </div>
                <div>
                    <Space>
                        <Input
                            id='timeout'
                            placeholder='Timeout'
                            type='number'
                            value={quiz.timeout}
                            onChange={e => setQuiz({ ...quiz, timeout: e.target.value })}
                        />
                        <span> Seconds </span>
                    </Space>
                </div>
            </div>
            <div>
                <Button
                    type='primary'
                    onClick={handleCreateQuiz}
                    loading={loading}
                >
                    Start quiz
                </Button>
            </div>
        </StyledWrapper>
    )
}

export default CreateQuiz;
