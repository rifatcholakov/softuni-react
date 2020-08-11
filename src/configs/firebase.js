import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyCgCg9vCwQuNtlnpE73zMfSNct5YcHdQD8',
    authDomain: 'thenews-42b1a.firebaseapp.com',
    databaseURL: 'https://thenews-42b1a.firebaseio.com',
    projectId: 'thenews-42b1a',
    storageBucket: 'thenews-42b1a.appspot.com',
    messagingSenderId: '918410792137',
    appId: '1:918410792137:web:a5ad8113db61bf64095118'
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
