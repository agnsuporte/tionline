import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-storage';
import 'firebase/firebase-database';

// Initialize Firebase
// let config = {
//     apiKey: "AIzaSyA4eFi8qSfR6l3POO2-YYuTvYHrwcDE9f4",
//     authDomain: "agn-suporte-online.firebaseapp.com",
//     databaseURL: "https://agn-suporte-online.firebaseio.com",
//     projectId: "agn-suporte-online",
//     storageBucket: "agn-suporte-online.appspot.com",
//     messagingSenderId: "390197291168"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBhS25KpoKwxrNuO8U1-3BTbI_1TBULuDk",
    authDomain: "tionline-dfafc.firebaseapp.com",
    databaseURL: "https://tionline-dfafc.firebaseio.com",
    projectId: "tionline-dfafc",
    storageBucket: "tionline-dfafc.appspot.com",
    messagingSenderId: "3467808054",
    appId: "1:3467808054:web:33d9b133f03ba498"
};

const fdb = firebase.initializeApp(firebaseConfig);
const fbDatabase = Rebase.createClass(fdb.database());

export const auth = fdb.auth();
export const storage = fdb.storage();
export const fireBaseDB = fdb.database();

export default fbDatabase;