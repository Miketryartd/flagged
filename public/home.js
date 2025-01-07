// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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


async function displayPosts(){
  const posts = document.getElementById('posts');

    try{
        const q = query(collection(db, "posts"), orderBy('createdAt', 'desc'));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) =>{
            const post = doc.data();
            console.log(doc.id, " => ", doc.data());
         const li = document.createElement('li');
         const name = document.createElement('h5');
         name.innerHTML = `Posted by: <p>${post.username}</p>`;
         li.appendChild(name);
         const sub = document.createElement('p');
         sub.innerHTML = `<p>Subject of matter: ${post.subject}</p>`;
         li.appendChild(sub);
         const mses = document.createElement('h3');
         mses.innerText = post.message;
         li.appendChild(mses);
         posts.appendChild(li);


        });
    } catch (error){
        console.error('Error fetching posts/announcements:', error);
    }
}

displayPosts();