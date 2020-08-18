import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBNvhbi-nAwQgK4sLrCXcbPeJTeQ1HXCYU",
    authDomain: "mealdeliveryapp-bfbed.firebaseapp.com",
    databaseURL: "https://mealdeliveryapp-bfbed.firebaseio.com",
    projectId: "mealdeliveryapp-bfbed",
    storageBucket: "mealdeliveryapp-bfbed.appspot.com",
    messagingSenderId: "908471658082",
    appId: "1:908471658082:web:eab3229aeae5553b2b133b"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
  