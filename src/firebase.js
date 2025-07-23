import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIMizXa-27WLVrqu9oIfETmOlDjJ1jnl4",
  authDomain: "service-desk-3733b.firebaseapp.com",
  projectId: "service-desk-3733b",
  storageBucket: "service-desk-3733b.appspot.com",
  messagingSenderId: "874484655765",
  appId: "1:874484655765:web:dea9c9e4e651f682fadd9c",
  measurementId: "G-L907E7560M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { app, analytics };
