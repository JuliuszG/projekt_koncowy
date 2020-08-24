import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCF8euqUFvIP-fDiBOY55fx3sCKykY9KrA",
    authDomain: "projekt-koncowy-cl.firebaseapp.com",
    databaseURL: "https://projekt-koncowy-cl.firebaseio.com",
    projectId: "projekt-koncowy-cl",
    storageBucket: "projekt-koncowy-cl.appspot.com",
    messagingSenderId: "1459480864",
    appId: "1:1459480864:web:a667db4ca17c606a7ecf45"
  };

export const fireBase = firebase.initializeApp(firebaseConfig);