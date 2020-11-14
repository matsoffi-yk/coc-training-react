import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom'
import { AppContext } from '../context/AppProvider';
import { Form, Input, Button, notification } from 'antd';

const StyledWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .container{
        width: 50vw;
        border-radius: 8px;
        box-shadow: 0 0 6px 0 rgba(0,0,0,.15);
        padding: 20px;
    }

    .header {
        text-align: center;
    }

`

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {
    const { authController } = useContext(AppContext)

    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async values => {
        setLoading(true);
        delete values['confirm'];
        console.log('Received values of form: ', values);
        const { email, password, ...data } = values;
        try {
            await authController.register(email, password, data)
            notification['success']({
                message: 'Success',
                description: 'Register success'
            });
            history.replace('/login');
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
                <h1 className='header'>Register</h1>
                <Form
                    {...formItemLayout}
                    form={form}
                    className='register-form'
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="firstname"
                        label="Firstname"
                        rules={[{ required: true, message: 'Please input your firstname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="Lastname"
                        rules={[{ required: true, message: 'Please input your lastname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Register
                        </Button>
                        Or <Link to="/login">login</Link>
                    </Form.Item>
                </Form>
            </div>
        </StyledWrapper>
    )
}

export default Register;
