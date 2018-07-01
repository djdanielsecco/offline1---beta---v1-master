// declaracoes globais

var fireb = require('firebase/app');
require("firebase/firestore");
 window.firebase = fireb;
export const configFirebase = {
    apiKey: "AIzaSyB2_pWdYuz81LRMdUoQVQsb6gl0LeL4MvQ",
    authDomain: "ativador-55a4a.firebaseapp.com",
    databaseURL: "https://ativador-55a4a.firebaseio.com",
    projectId: "ativador-55a4a",
    storageBucket: "ativador-55a4a.appspot.com",
    messagingSenderId: "773521340935"};


export const  urlTree = 'https://ativador-55a4a.firebaseio.com/trees.json';
export const url2 = 'https://ativador-55a4a.firebaseio.com/posts.json';

export const pushTokem = "BLz0-8r3lk5i_QxLruRzKDVZ9EUHWkLiS7E1e3Veal0j1WpYcCz6COpD_Zr8UH5C95-DhMuZIYYXDs44MTXCNls";

export const dataData = [];
export function noty(z, x, w) {
    var x,
        z,
        w;
    var newdata = {
        type: z,
        title: x,
        message: w
    };
    dataData.push(newdata);
    console.log(dataData);
    return dataData;
};
/*
///////////////////////


import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// You have to put your own settings here
firebase.initializeApp({
  apiKey: 'AIzaSyCZGnRjXMrhBeTTvOOwxAag-dXdkXA1Pxc',
  authDomain: 'cloudlogicdev.firebaseapp.com',
  databaseURL: 'https://cloudlogicdev.firebaseio.com',
  projectId: 'cloudlogicdev',
  storageBucket: 'cloudlogicdev.appspot.com',
  messagingSenderId: '885070654778'
})

export default firebase

//////////////////////////////////


import firebase from './firebase'

const db = firebase.firestore()

export default db






*/