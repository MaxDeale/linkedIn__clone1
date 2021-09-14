import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCz5upq3DVknYS_lgK9JEQxohHPfzep6nE',
  authDomain: 'linked-in-yt-7405d.firebaseapp.com',
  projectId: 'linked-in-yt-7405d',
  storageBucket: 'linked-in-yt-7405d.appspot.com',
  messagingSenderId: '884879279472',
  appId: '1:884879279472:web:d54612c09c2200e864bbb5',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
