// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwUw3m-nhqfdGuyxnsqHNvVa-aOgSp-MI",
  authDomain: "todo-app-7ea5b.firebaseapp.com",
  projectId: "todo-app-7ea5b",
  storageBucket: "todo-app-7ea5b.appspot.com",
  messagingSenderId: "958579446937",
  appId: "1:958579446937:web:1059e015f4a34cf051d408"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;