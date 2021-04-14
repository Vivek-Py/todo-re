import firebase from "firebase";

const fire = firebase.initializeApp({
    apiKey: "AIzaSyAQTwxBwljEvOgd9x8UmyckVncmywDrtkg",
    authDomain: "simply-todo.firebaseapp.com",
    projectId: "simply-todo",
    storageBucket: "simply-todo.appspot.com",
    messagingSenderId: "470587892630",
    appId: "1:470587892630:web:c2b520faa126248f8fb3b7"
})

export default fire

//const db = firebaseApp.firestore()