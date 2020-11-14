import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { authController } = useContext(AppContext);
    const { credential } = authController;

    return (
        <Route
            {...rest}
            render={() => (
                credential ? <Component/> : (<Redirect to='/login' />)
            )}
        />
    )
}

export default ProtectedRoute
