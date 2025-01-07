// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

onAuthStateChanged(auth, (user) =>{
    if (user){
        console.log('User is signed in:', user);
    } else {
        console.log('User is not signed in.');
        window.location.assign('/front.html');
    }
})


document.getElementById('menu').addEventListener('click', () =>{
    console.log('menu clciked');

   
    const menu = document.getElementById('menuDown');
    if (menu.style.visibility === 'visible'){
      
        menu.style.visibility = 'hidden';
    } else {
        menu.style.visibility = 'visible';
     
    }
})


document.getElementById('logout').addEventListener('click', () =>{
    signOut(auth).then(() => {
        const overlay = document.getElementById('overlay');
        setInterval(overlayIV, 1000);
        setInterval(assigned, 1000);
        function assigned(){
            window.location.assign('/front.html');
        }
        function overlayIV(){
            overlay.style.visibility = 'visible';
            assigned();
        }
     console.log('User signed out succesfully');
      }).catch((error) => {
       console.error('Error signing out user:', error);
      });
})

document.getElementById('upload').addEventListener('click', async () => {
    console.log('Upload clicked');
  
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (!subject || !message) {
      console.error('Subject and message are required.');
      alert('Please fill in both subject and message.');
      return;
    }
  

    const user = auth.currentUser;
    const username = user ? user.displayName || 'Anonymous' : 'Anonymous';
    try {
     
      await addDoc(collection(db, 'posts'), {
        subject: subject,
        message: message,
        username: username,
        createdAt: new Date().toISOString(), 
      });
      console.log('Post uploaded successfully');
      alert('Post uploaded successfully!');
    } catch (error) {
      console.error('Error uploading announcement/post:', error);
      alert('Failed to upload the post. Please try again.');
    }
  });
  