import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Input, Form, Select, Space, Button, notification } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons'
import { AppContext } from '../context/AppProvider';

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

const types = [
    { label: 'noun', value: 'noun' },
    { label: 'verb', value: 'verb' },
    { label: 'adjective', value: 'adjective' },
    { label: 'adverb', value: 'adverb' },
    { label: 'preposition', value: 'preposition' },
    { label: 'interjection', value: 'interjection' }
]

const AddWord = () => {

    const { vocabController } = useContext(AppContext);

    const [loading, setLoading] = useState(false);
    const [vocab, setVocab] = useState({
        word: '',
        types: [],
        meanings: ['']
    })

    const handleAddMeaning = () => {
        setVocab({ ...vocab, meanings: [...vocab.meanings, ''] })
    }

    const handleRemoveMeaning = (index) => {
        setVocab({ ...vocab, meanings: vocab.meanings.filter((_, id) => index !== id) })
    }

    const changeMeaning = (index, value) => {
        setVocab({ ...vocab, meanings: vocab.meanings.map((v, id) => id === index ? value : v) })
    }

    const handleCreateWord = async () => {
        setLoading(true);
        try {
            await vocabController.addVocab(vocab);
            notification['success']({
                message: 'Success',
                description: 'Add vocabulary success'
            })
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
            <h1>Add Vocabulary</h1>
            <div className='form-item'>
                <div className='label'>
                    <label htmlFor='word'>Word</label>
                </div>
                <Input
                    id='word'
                    placeholder='English word'
                    value={vocab.word}
                    onChange={e => setVocab({ ...vocab, word: e.target.value })}
                />
            </div>
            <div className='form-item'>
                <div className='label'>
                    <label htmlFor='type'>Type</label><br />
                </div>
                <Select
                    id='type'
                    placeholder='Word type'
                    options={types}
                    mode='multiple'
                    className='select'
                    value={vocab.types}
                    onChange={values => setVocab({ ...vocab, types: values })}
                />
            </div>
            <div className='form-item'>
                <div className='label'>
                    <label>Meanings</label>
                </div>
                <div>
                    {
                        vocab.meanings.map((meaning, index) => (
                            <div key={index} className='form-item'>
                                <Space align='baseline'>
                                    <Input
                                        placeholder={`meaning ${index + 1}`}
                                        value={meaning}
                                        onChange={e => changeMeaning(index, e.target.value)}
                                    />
                                    <MinusCircleOutlined
                                        className='minus-btn'
                                        onClick={() => handleRemoveMeaning(index)}
                                    />
                                </Space>
                            </div>
                        ))
                    }
                </div>
                <div className='plus-btn'>
                    <Button block type='dashed' onClick={handleAddMeaning}> + </Button>
                </div>
            </div>
            <div>
                <Button type='primary' onClick={handleCreateWord} loading={loading}>Add new word</Button>
            </div>
        </StyledWrapper>
    )
}

export default AddWord;
