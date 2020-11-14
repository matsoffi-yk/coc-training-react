import React from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import styled from 'styled-components';
import { Col, Select ,Row } from 'antd';


const dataSource = [
    {
      date: '20 Nov 2020',
      vocab: ['a','b','c','d','e','f','g','h','j','k','o','gg','ff','df','dfd','gfg',]
    },
    {
        date: '23 Nov 2020',
        vocab: ['a','b','c','d','e','f','g','h','j','k','o','gg','ff','df','dfd','gfg',]
    },
    {
        date: '25 Nov 2020',
        vocab: ['a','b','c','d','e','f','g','h','j','k','o','gg','ff','df','dfd','gfg',]
    }
    
  ];


const { Option } = Select;

const handleChange =(value)=> {
    console.log(`selected ${value}`);
  }

const StyledWrapper = styled.div`

    .title{
        padding-left: 13px;
    }
    p{
        margin-top:5px
    }
    .data{
        padding-left: 13px;
    }
    .datelist{
        padding-top:7px;
    }


`
const Home = () => {
    console.log('dataSource');
    return (
        <StyledWrapper>
            <div className="title">
               <p >Display Type</p> 
                <div>
                    <Select defaultValue="Date" style={{ width: 120 }} >
                    <Option value="date">Date</Option>
                    <Option value="Character">Character</Option>
                    <Option value="type">Type</Option>
                    </Select>
                </div> 
            </div>
            <div className="data">
                {dataSource.map((v,index)=>(
                    <div key={index}>
                        <p className="datelist">{v.date} </p>

                        <Row>
                              {v.vocab.map((i,index2)=>(
                            <Col xs={24} sm={24} md={12} lg={8} xl={6} key={index2}>{i}</Col>
                        ))}
                        </Row>
                      
                        
                    </div>
                    

                ))}
  
            </div>
 
        </StyledWrapper>
    )
}

export default Home
