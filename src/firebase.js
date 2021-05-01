import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBFW_Z-q84A3eDvRx-aT7hARFkFq8c4Bws",
    authDomain: "todo-app-4aab1.firebaseapp.com",
    projectId: "todo-app-4aab1",
    storageBucket: "todo-app-4aab1.appspot.com",
    messagingSenderId: "63912088856",
    appId: "1:63912088856:web:678b5455d03638a65f3a6d",
    measurementId: "G-P8443ER46R"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
