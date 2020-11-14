import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'
import { Input, Form, Checkbox, Button, notification } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const StyledWrapper = styled.div`

    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .container{
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 8px;
        border: 1px solid #cecece;
        min-width: 500px;
    }

    .header {
        text-align: center;
    }

    .login-form {
        max-width: 300px;
    }
    .login-form-forgot {
        float: right;
    }
    .ant-col-rtl .login-form-forgot {
        float: left;
    }
    .login-form-button {
        width: 100%;
    }

`

const LogIn = () => {
    const { authController } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onFinish = async values => {
        setLoading(true);
        try {
            await authController.login(values.username, values.password);
            history.push('/');
        } catch (e) {
            notification['error']({
                message: 'Failed',
                description: e.message
            })
        }
        setLoading(false);
    };

    return (
        <StyledWrapper>
            <div className='container'>
                <h1 className='header'>Keep It!</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Link className="login-form-forgot" to='/register'>
                            Forgot password
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Log in
                        </Button>
                    Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </StyledWrapper>
    )
}

export default LogIn;
