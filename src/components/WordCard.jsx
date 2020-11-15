import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 0 6px 0 rgba(0,0,0,.15);
`

const WordCard = ({ vocab }) => {
    return (
        <StyledWrapper>
            <div><b>{vocab.word}</b> ({vocab.types.join(', ')})</div>
            <div>{vocab.meanings.join(', ')}</div>
        </StyledWrapper>
    )
}

export default WordCard
