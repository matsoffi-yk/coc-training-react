import React, { useState } from 'react'
import firebase from '../firebase'

const auth = firebase.auth()
const AuthController = () => {

    const login = (email, password) => {
        console.log();
        auth
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log("user",response.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return {
        login
    }

}

export default AuthController
