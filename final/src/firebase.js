import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyA7wAvjwERBxkLFy0g02pa188IJ-j15IXk",
  authDomain: "final-3e758.firebaseapp.com",
  databaseURL: "https://final-3e758.firebaseio.com",
  projectId: "final-3e758",
  storageBucket: "",
  messagingSenderId: "601895557355"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
