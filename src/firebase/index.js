import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import config from './config';

try {
    firebase.initializeApp(config);
} catch (e) {
    console.log(e);
}

export default firebase;