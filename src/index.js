import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Styles/style.css';
import App from './App';
import { AppContextProvider } from './Stores/AppStore';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <AppContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppContextProvider>,
    document.getElementById('root')
);
