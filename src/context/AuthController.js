import { useEffect, useState } from 'react'
import firebase from '../firebase'

const auth = firebase.auth()
const col = firebase.firestore().collection('users');

const localCredential = localStorage.getItem('credential');

const AuthController = () => {

    const [credential, setCredential] = useState(localCredential ? JSON.parse(localCredential) : null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (credential) {
            const unsub = col.doc(credential.user.uid).onSnapshot(snapshot => {
                setUser(snapshot.data())
            });
            return () => unsub()
        } else {
            setUser(null);
        }
    }, [credential]);

    const login = async (email, password) => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, password);
            setCredential(res);
            localStorage.setItem('credential', JSON.stringify(res));
            return res;
        } catch (e) {
            throw e;
        }
    }

    const register = async (email, password, data) => {
        try {
            const cra = await auth.createUserWithEmailAndPassword(email, password)
            const uid = cra.user.uid;
            return col.doc(uid).set({ email, ...data });
        } catch (e) {
            throw e;
        }
    }

    const logout = () => {
        localStorage.removeItem('credential');
        setCredential(null);
        return auth.signOut();
    }

    return {
        user,
        credential,
        login,
        register,
        logout
    }

}

export default AuthController
