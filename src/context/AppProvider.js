import React, { useState } from 'react';
import AuthController from './AuthController';

export const AppContext = React.createContext(null);

const AppProvider = (props) => {
    const authController = AuthController();

    const value = {
        authController,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;
