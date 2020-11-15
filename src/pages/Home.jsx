import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import styled from 'styled-components';
import { Col, Select, Row, Input } from 'antd';
import { AppContext } from '../context/AppProvider';
import { wordTypes } from '../common/labels';
import WordCard from '../components/WordCard';


const { Option } = Select;

const StyledWrapper = styled.div`

    padding: 20px 10%;

    .title {
        margin-bottom: 10px;
        display: flex;

        justify-content: space-between;
    }

    .search {
        margin-bottom: 10px;
        width: 300px;
    }


`
const Home = () => {

    const { vocabController } = useContext(AppContext);

    const { vocabs } = vocabController;

    const [displayType, setDisplayType] = useState('date');
    const [search, setSearch] = useState('');

    const createDateList = () => {
        const list = !vocabs ? {} : vocabs.reduce((prev, cur) => {
            if (cur.createdAt) {
                const dateFormat = cur.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                if (cur.word.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                    if (!prev[dateFormat]) prev[dateFormat] = []
                    prev[dateFormat].push(cur);
                }
            }
            return prev;
        }, {});
        return Object.entries(list);
    }

    const createTypeList = () => {
        const list = !vocabs ? {} : wordTypes.reduce((prev, cur) => {
            vocabs.forEach((vocab) => {
                if (vocab.word.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                    if (vocab.types.includes(cur.label)) {
                        if (!prev[cur.label])
                            prev[cur.label] = [];
                        prev[cur.label].push(vocab)
                    }
            })
            return prev;
        }, {});
        return Object.entries(list);
    }

    const createCharacterList = () => {
        const list = !vocabs ? {} : vocabs.reduce((prev, cur) => {
            const firstChar = cur.word.charAt(0).toUpperCase();
            if (cur.word.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                if (!prev[firstChar])
                    prev[firstChar] = []
                prev[firstChar].push(cur);
            }
            return prev;
        }, {});
        return Object.entries(list).sort((a, b) => a[0].localeCompare(b[0]));
    }

    let dataList = [];

    switch (displayType) {
        case 'date': dataList = createDateList(); break;
        case 'character': dataList = createCharacterList(); break;
        default: dataList = createTypeList();
    }

    return (
        <StyledWrapper>
            <div className="title">
                <div>
                    <p>Display Type</p>
                    <div>
                        <Select
                            defaultValue="date"
                            style={{ width: 120 }}
                            value={displayType}
                            onChange={value => setDisplayType(value)}
                        >
                            <Option value="date">Date</Option>
                            <Option value="character">Character</Option>
                            <Option value="type">Type</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <Input.Search
                className='search'
                placeholder='Search vocabulary'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className="data">
                {dataList
                    .filter((data) => data[1].length > 0)
                    .map((data, index) => (
                        <div key={index}>
                            <h3 className="datelist">{data[0]} </h3>
                            <Row gutter={[16, 16]}>
                                {data[1]
                                    .filter(vocab => vocab.word.toLowerCase().indexOf(search.toLowerCase()) >= 0)
                                    .sort((a, b) => a.word.localeCompare(b.word))
                                    .map((vocab, index) => (
                                        <Col xs={24} sm={24} md={12} lg={8} xl={6} key={index}>
                                            <WordCard vocab={vocab} />
                                        </Col>
                                    ))}
                            </Row>
                        </div>
                    ))}

            </div>

        </StyledWrapper>
    )
}

export default Home
