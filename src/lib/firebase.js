import Firebase from "firebase/compat/app";
import firebaseAuthServices from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyCCsSmD9-UYn5cXbYP3HcGcJK202UAs2ew",
  authDomain: "instagram-clone-54296.firebaseapp.com",
  projectId: "instagram-clone-54296",
  storageBucket: "instagram-clone-54296.appspot.com",
  messagingSenderId: "584583062182",
  appId: "1:584583062182:web:444d53340e1c4a9c45ca67"
};
const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };
