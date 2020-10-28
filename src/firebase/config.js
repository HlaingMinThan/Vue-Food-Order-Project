import firebase from 'firebase'
import   'firebase/firestore'
import  'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAmCle5sPSJmjiCTog5_V1bZXtRzUl0klI",
  authDomain: "tha-foodstuff.firebaseapp.com",
  databaseURL: "https://tha-foodstuff.firebaseio.com",
  projectId: "tha-foodstuff",
  storageBucket: "tha-foodstuff.appspot.com",
  messagingSenderId: "493227112582",
  appId: "1:493227112582:web:18a48fe3dd9e6280d77907",
  measurementId: "G-9PQ2JCEEEM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore();
  const store=firebase.storage();
  const auth=firebase.auth();
  
  export {db,store,auth};