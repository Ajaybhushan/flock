import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { useHistory, Route } from 'react-router';
import { AppContext } from './Stores/AppStore';
const MainPage = lazy(() => import('./MainPage/MainPage'));
const LoginPage = lazy(() => import('./LoginPage/LoginPage'));

const App = () => {
    const history = useHistory();
    /*
        useContext returns an array of size 2
        [0] : state
        [1] : method to change state
    */
    const [appStore, appStoreDispatch] = useContext(AppContext);

    useEffect(() => {
        if (appStore.isLoggedIn) {
            history.push('/');
            return;
        } else {
            history.push('/login');
            return;
        }
    }, [appStore.isLoggedIn]);

    return (
        <div className='App'>
            <Suspense fallback={<div />}>
                {appStore.isLoggedIn ? <MainPage /> : <Route exact path='/login' component={LoginPage} />}
            </Suspense>
        </div>
    );
};

export default App;
