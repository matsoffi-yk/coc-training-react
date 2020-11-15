import React from 'react'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons'

const StyledWrapper = styled.div`
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 0 6px 0 rgba(0,0,0,.15);

    display: flex;

    .main {
        flex: 1;
        margin-right: 8px;
    }

    .delete-icon {
        color: #ff8383;
        cursor: pointer;
    }
`

const WordCard = ({ vocab, onDelete }) => {
    return (
        <StyledWrapper >
            <div className='main'>
                <div><b>{vocab.word}</b> ({vocab.types.join(', ')})</div>
                <div>{vocab.meanings.join(', ')}</div>
            </div>
            <div><DeleteOutlined className='delete-icon' onClick={() => onDelete && onDelete(vocab.word)} /></div>
        </StyledWrapper>
    )
}

export default WordCard
