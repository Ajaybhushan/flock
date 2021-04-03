import React, { useReducer, createContext } from 'react';

export const AppContext = createContext();

const INITIAL_STATE = {
    isLoggedIn: Boolean(localStorage.getItem('token'))
};

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            if (action.payload.isLoggedIn) {
                localStorage.setItem('token', action.payload.user.token);
                localStorage.setItem('userId', action.payload.user.id);
                localStorage.setItem('emailId', action.payload.user.email);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('emailId');
            }
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.user && action.payload.user.token,
                userId: action.payload.user && action.payload.user.id
            };
        default:
            return INITIAL_STATE;
    }
};

// Create a provider for components to consume and subscribe to changes
export const AppContextProvider = props => {
    return <AppContext.Provider value={useReducer(appReducer, INITIAL_STATE)}>{props.children}</AppContext.Provider>;
};
