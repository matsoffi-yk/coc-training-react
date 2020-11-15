import React from 'react';
import AuthController from './AuthController';
import QuizController from './QuizController';
import VocabController from './VocabController';

export const AppContext = React.createContext(null);

const AppProvider = (props) => {
    const authController = AuthController();
    const vocabController = VocabController(authController);
    const quizController = QuizController(authController);

    const value = {
        authController,
        vocabController,
        quizController
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;
