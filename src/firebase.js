import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqQXr_SkrKO4x7bB8VcQ_Fa_Ro4_9nwuQ",
  authDomain: "auth-test-4b027.firebaseapp.com",
  projectId: "auth-test-4b027",
  storageBucket: "auth-test-4b027.appspot.com",
  messagingSenderId: "347065215857",
  appId: "1:347065215857:web:195f92809f437a5334e4d0"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
