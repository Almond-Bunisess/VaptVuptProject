import firebase from 'firebase';
import { initializeApp } from "firebase";

const firebaseConfig = {
  apiKey: 'AIzaSyAJ9QR9v2attcsSS9iA3O7aqJdQEVEZsvY',

  authDomain: 'atividade03-e732f.firebaseapp.com',

  databaseURL: 'https://atividade03-e732f-default-rtdb.firebaseio.com/',

  projectId: 'atividade03-e732f',
};

if (!firebase.apps.length) {
  firebase.initializeApp = initializeApp(firebaseConfig);
}

export default firebase;