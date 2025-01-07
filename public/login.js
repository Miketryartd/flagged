import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfp9nXPEMc46JjzDYma7xgSToRlK8Vdug",
  authDomain: "council-administration-system.firebaseapp.com",
  projectId: "council-administration-system",
  storageBucket: "council-administration-system.appspot.com",
  messagingSenderId: "100914442690",
  appId: "1:100914442690:web:16a8d0c24f624d227e265b",
  measurementId: "G-DMBG8CH0GW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


async function signInWithRole(email, password) {
  try {
  
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User signed in:', user.email);

 
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData.role;

     
      if (role === "Teacher") {
        console.log("Redirecting to Teacher Panel...");
        window.location.assign("/teacherpanel.html");
      } else if (role === "Student") {
        console.log("Redirecting to Student Panel...");
        window.location.assign("/sslgpanel.html");
      } else {
        console.error("Unknown role:", role);
        window.location.assign("/front.html"); 
      }
    } else {
      console.error("No user document found for UID:", user.uid);
    }
  } catch (error) {
    console.error("Error signing in user:", error.message);
  }
}


const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login');

loginButton.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    console.error("Email and password are required.");
    return;
  }

  signInWithRole(email, password);
});
