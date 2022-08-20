import { getApp } from 'firebase/app';
import {authDomain, environment} from "./config";

const firebaseApp = getApp()

firebaseApp.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: authDomain,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
});

// if (environment === 'development') {
//     firebaseApp.auth().useEmulator('http://localhost:9099/');
// }

export default firebaseApp;
