import React, { useState } from 'react'
import firebase from '../firebase'

const auth = firebase.auth()
const db = firebase.firestore()

const AuthController = () => {

    const login = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log("user", response.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const register = async (username, email, password) => {
        const cra = await auth.createUserWithEmailAndPassword(email, password)
        const uid = cra.user.uid;
        db.collection('users').doc(uid).set({ email, username })
    }

    return {
        login,
        register
    }

}

export default AuthController
