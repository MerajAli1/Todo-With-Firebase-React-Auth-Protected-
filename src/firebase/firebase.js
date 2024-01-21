// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWmp4-klgWSrtDek0rxvm9ljTvHx4q8r0",
    authDomain: "todo-auth-protection.firebaseapp.com",
    projectId: "todo-auth-protection",
    storageBucket: "todo-auth-protection.appspot.com",
    messagingSenderId: "897040255053",
    appId: "1:897040255053:web:070887e7308da0b9e67404"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db }