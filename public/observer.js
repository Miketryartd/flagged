// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,  onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
       
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role;
  
    
          if (role === "Teacher") {
            console.log("Redirecting to Teacher Panel");
            window.location.assign("/teacherpanel.html");
          } else if (role === "Student") {
            console.log("Redirecting to Student Panel");
            window.location.assign("/studentpanel.html");
          } else {
            console.error("Unknown role:", role);
          }
        } else {
          console.error("No user document found for UID:", user.uid);
        }
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    } else {
    
      console.log("No user signed in. Redirecting to front page.");
      window.location.assign("/front.html");
    }
  });