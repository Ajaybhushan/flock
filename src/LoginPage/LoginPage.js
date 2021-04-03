import React, { useState, useContext } from 'react';
import { Layout, Row, Col, Input, Button } from 'antd';
import { AppContext } from '../Stores/AppStore';
import { LOGIN } from '../Constants/Urls';
import { postAPI } from '../Utils/ApiCalls';

const LoginPage = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [appStore, appStoreDispatch] = useContext(AppContext);

    const validateToken = e => {
        e.preventDefault();
        const userData = {
            email,
            password
        };
        setIsLoading(true);
        postAPI(LOGIN, userData)
            .then(user => {
                console.log(user);
                setIsLoading(false);
                appStoreDispatch({ type: 'SET_LOGIN', payload: { isLoggedIn: true, user: user } });
            })
            .catch(err => {
                setIsLoading(false);
            });
    };

    return (
        <Layout className='pageLayout'>
            <Row>
                <Col span={12} style={{ height: '100%' }}>
                    <div className='PageProductSection'></div>
                </Col>
                <Col span={12} style={{ padding: '35px' }}>
                    <div className='FormWrapper text-center'>
                        <h1>Welcome to Attentive AI</h1>
                        <br />
                        <div className='login-form'>
                            <form onSubmit={validateToken}>
                                <Input
                                    required
                                    className='fw'
                                    onChange={e => setEmail(e.target.value)}
                                    name='email'
                                    style={{ height: 40, marginBottom: '10px' }}
                                    type='text'
                                    placeholder='Enter email...'
                                />
                                <Input.Password
                                    required
                                    className='fw'
                                    onChange={e => setPassword(e.target.value)}
                                    style={{ height: 40 }}
                                    name='password'
                                    type='text'
                                    placeholder='Enter password'
                                />
                                <Button
                                    htmlType='submit'
                                    type='primary'
                                    loading={isLoading}
                                    className='mt fw'
                                    loading={isLoading}>
                                    Login
                                </Button>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
};

export default LoginPage;
