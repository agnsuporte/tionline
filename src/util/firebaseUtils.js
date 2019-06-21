import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-storage';
import 'firebase/firebase-database';

const firebaseConfig = {
    apiKey: "*",
    authDomain: "*",
    databaseURL: "*",
    projectId: "*",
    storageBucket: "*",
    messagingSenderId: "*",
    appId: "*"
};

const fdb = firebase.initializeApp(firebaseConfig);
const fbDatabase = Rebase.createClass(fdb.database());

export const auth = fdb.auth();
export const storage = fdb.storage();
export const fireBaseDB = fdb.database();

export default fbDatabase;