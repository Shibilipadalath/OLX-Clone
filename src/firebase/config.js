import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD9Ui6au4NHR_hSzMn3fctOmrbzXKZrUSQ",
    authDomain: "olx-clone-69b69.firebaseapp.com",
    projectId: "olx-clone-69b69",
    storageBucket: "olx-clone-69b69.firebasestorage.app",
    messagingSenderId: "429081211746",
    appId: "1:429081211746:web:1e07b4735e9d8c6f2c323b",
    measurementId: "G-7JXQSZN12P"
};

export default firebase.initializeApp(firebaseConfig)
