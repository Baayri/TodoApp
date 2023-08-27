import firebase from 'firebase/compat';


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
