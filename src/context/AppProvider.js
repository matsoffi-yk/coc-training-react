import React, { useState } from 'react';
import AuthController from './AuthController';
import VocabController from './VocabController';

export const AppContext = React.createContext(null);

const AppProvider = (props) => {
    const authController = AuthController();
    const vocabController = VocabController();

    const value = {
        authController,
        vocabController
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;
