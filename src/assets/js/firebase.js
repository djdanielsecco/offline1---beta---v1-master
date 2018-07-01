import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

// You have to put your own settings here
firebase.initializeApp({
apiKey: "AIzaSyB2_pWdYuz81LRMdUoQVQsb6gl0LeL4MvQ",
    authDomain: "ativador-55a4a.firebaseapp.com",
    databaseURL: "https://ativador-55a4a.firebaseio.com",
    projectId: "ativador-55a4a",
    storageBucket: "ativador-55a4a.appspot.com",
    messagingSenderId: "773521340935"
})

export default firebase