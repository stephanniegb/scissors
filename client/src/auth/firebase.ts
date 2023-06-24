// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqXMGqNCSnvgPzoWFbHmpy2D_174Xh7xo",
  authDomain: "scissors-2c580.firebaseapp.com",
  projectId: "scissors-2c580",
  storageBucket: "scissors-2c580.appspot.com",
  messagingSenderId: "889251302323",
  appId: "1:889251302323:web:96e59cd65bfd4ca8d059c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
