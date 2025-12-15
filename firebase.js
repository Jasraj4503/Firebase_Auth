// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUicck5FU0KB45z3d_BCJsI4wA3-PSe7k",
  authDomain: "book-store-301ec.firebaseapp.com",
  projectId: "book-store-301ec",
  storageBucket: "book-store-301ec.firebasestorage.app",
  messagingSenderId: "825636483640",
  appId: "1:825636483640:web:35af8d379c1c46c50b6ccd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth