import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0C7KOr1YRvuX4i3YblmTClg8xqwgXKuw",
  authDomain: "e-comm-1b5f7.firebaseapp.com",
  projectId: "e-comm-1b5f7",
  storageBucket: "e-comm-1b5f7.firebasestorage.app",
  messagingSenderId: "839002785143",
  appId: "1:839002785143:web:9fd9eab5c871aefef80d72",
  measurementId: "G-S5V179HVBJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);