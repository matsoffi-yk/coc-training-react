import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../context/AppProvider';
import { MenuOutlined } from '@ant-design/icons';
import { Menu, Popover, Grid } from 'antd';

const { useBreakpoint } = Grid;

const StyledWrapper = styled.div`
    background-color: #333;
    height:64px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 20px;
    
    .menu{
        justify-content: space-between;
        display: flex;
        flex:1;
        padding-right:13px;
    }

    h2.logo{
        color: white;
        margin:0px
    }

    p {
        color: white;
        margin:0px;
        cursor: pointer;
    }

    .title {
        flex:1;
        padding-left: 13px;
    }

    .icon {
        color: white;
        cursor: pointer;
    }

`



const Topbar = () => {

    const { authController } = useContext(AppContext);
    const history = useHistory();
    const breakpoints = useBreakpoint();

    const { user } = authController;

    const firstname = user ? user.firstname : '';
    const lastname = user ? user.lastname : '';

    const selected = history.location.pathname.split('/')[1];

    const handleLogout = async () => {
        try {
            await authController.logout();
            history.replace('/login')
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <StyledWrapper>
            <div className="title">
                <Link to='/'>
                    <h2 className='logo'>Keep it!</h2>
                </Link>
            </div>
            {
                (breakpoints.md) ? (
                    <div className="menu">
                        <p>{firstname} {lastname}</p>
                        <Link to='/add-word'>
                            <p>Add Word</p>
                        </Link>
                        <Link to='/quiz'>
                            <p>Quiz</p>
                        </Link>
                        <p>History</p>
                        <p onClick={handleLogout}>Logout</p>
                    </div >
                ) : (
                        <Popover
                            placement="bottomRight"
                            content={
                                <Menu
                                    style={{ width: 256 }}
                                    selectedKeys={[selected]}
                                    mode="inline"
                                >
                                    <Menu.Item key="">
                                        <Link to='/'>Home</Link>
                                    </Menu.Item>
                                    <Menu.Item key="add-word">
                                        <Link to='/add-word'>Add word</Link>
                                    </Menu.Item>
                                    <Menu.Item key="quiz">
                                        <Link to='/quiz'>Quiz</Link>
                                    </Menu.Item>
                                    <Menu.Item key="history">
                                        <Link to='/quiz'>History</Link>
                                    </Menu.Item>
                                    <Menu.Item key="name">
                                        {firstname} {lastname}
                                    </Menu.Item>
                                    <Menu.Item key="logout" onClick={handleLogout}>
                                        Logout
                                    </Menu.Item>
                                </Menu>
                            }
                            trigger="click"
                        >
                            <MenuOutlined className='icon' />
                        </Popover>
                    )
            }
        </StyledWrapper >
    )
}

export default Topbar
