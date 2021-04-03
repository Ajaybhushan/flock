import React, { useContext } from 'react';
import { Menu, Layout, Button } from 'antd';
import 'antd/dist/antd.css';
import { Link, NavLink, Route, Switch, useHistory } from 'react-router-dom';

const { Header } = Layout;

import { AppContext } from '../Stores/AppStore';
import InputScreen from '../Components/InputScreen';
import ListView from '../Components/ListView';
import ThirdTab from '../Components/ThirdTab';
import { logoutAPI } from '../Utils/ApiCalls';
import { LOGOUT } from '../Constants/Urls';

const MainPage = props => {
    const [appStore, appStoreDispatch] = useContext(AppContext);
    const history = useHistory();

    const Logout = () => {
        logoutAPI(LOGOUT)
            .then(user => {
                setIsLoading(false);
                history.push('/login');
                appStoreDispatch({ type: 'SET_LOGIN', payload: { isLoggedIn: false, user: user } });
            })
            .catch(err => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                <NavLink to='/' style={{ padding: '20px' }}>
                    ATTENTIVE AI
                </NavLink>
                <Menu.Item key='1' style={{ marginLeft: '50%' }}>
                    <NavLink to='/'>Input Screen</NavLink>
                </Menu.Item>
                <Menu.Item key='2'>
                    <NavLink to='/listview'>List View</NavLink>
                </Menu.Item>
                <Menu.Item key='3'>
                    <NavLink to='/thirdtab'>Third Tab</NavLink>
                </Menu.Item>
                <Button onClick={Logout}>
                    <Link to='/login'>LOGOUT</Link>
                </Button>
            </Menu>
            <div>
                <Switch>
                    <Route exact path='/' component={InputScreen} />
                    <Route exact path='/listview' component={ListView} />
                    <Route exact path='/thirdtab/:id/' component={ThirdTab} />
                </Switch>
            </div>
        </div>
    );
};

export default MainPage;
