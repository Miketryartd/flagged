// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
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


let gender = null;

const maleBtn = document.getElementById('male');
const femaleBtn = document.getElementById('female');

maleBtn.addEventListener('click', () =>{
  if (maleBtn){
    console.log("Gender is Male");
 
   maleBtn.style.backgroundColor = 'lightBlue';
   femaleBtn.style.backgroundColor = 'White';
   gender = "Male";
   
  }
})

femaleBtn.addEventListener('click', () =>{

  if (femaleBtn){
    console.log("Gender is Female");
    femaleBtn.style.backgroundColor = 'lightPink';
    maleBtn.style.backgroundColor = 'White';
    gender = "Female";
  
   
  }
})

const teacherCheckbox = document.getElementById('teacher');
const studentCheckbox = document.getElementById('student');

teacherCheckbox.addEventListener('click', () => {
  if (teacherCheckbox.checked) {
    studentCheckbox.checked = false; 
    console.log('teacher clicked');
  }
});


studentCheckbox.addEventListener('click', () => {
  if (studentCheckbox.checked) {
    teacherCheckbox.checked = false; 
    console.log('student clicked');
  }
});

document.getElementById('signup').addEventListener('click', async () => {
  console.log('Sign up clicked');

  const tlabel = document.getElementById('tlabel');
  const slabel = document.getElementById('slabel');

  const completeOverlay = document.getElementById('overlayy');
  const overlay = document.getElementById('overlay');
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const bd = document.getElementById('birthday').value;
  const contact = document.getElementById('contact').value;

  const emaill = document.getElementById('email');
  const namee = document.getElementById('name');
  const passwordd = document.getElementById('password');
  const bdd = document.getElementById('birthday');
  const contactt = document.getElementById('contact');


  if (!email || !name || !password || !bd || !contact ){
  emaill.style.borderColor = 'red';
  namee.style.borderColor = 'red';
  passwordd.style.borderColor = 'red';
  bdd.style.borderColor = 'red';
  contactt.style.borderColor = 'red';
    return;
  };

 


  let role = null;
  

  if (teacherCheckbox.checked){
    role = "Teacher";
  } else if(studentCheckbox.checked){
    role = "Student";
  };
  

  if (!role){
    console.error("Please select a occupation.");
   
    return;
  }

  if (!gender){
    console.error("Please select your gender.");
    maleBtn.style.borderColor = 'red';
    return;
  }

 


  try {
  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name
    });
    console.log('Username:', name);

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      birthday: bd,
      role: role,
      gender: gender,
      contact: contact,
      createdAt: new Date().toISOString(),
    });
  

    sendEmailVerification(user).then(() => {
      console.log('Email verification sent to:', email);
    });
  overlay.style.visibility = 'visible';

  const verificationCheck = setInterval(async () =>{
    await user.reload();
    if (user.emailVerified){
      clearInterval( verificationCheck);
      console.log('Email has been verified.');
      overlay.style.visibility = 'hidden';
      overlayy.style.visibility = 'visible';

    }
  }, 3000);
  
  emaill.value = '';
  namee.value = '';
  passwordd.value = '';
  bdd.value = '';
  contactt.value = '';

  
  teacherCheckbox.checked = false;
  studentCheckbox.checked = false;

 
  maleBtn.style.backgroundColor = 'white';
  femaleBtn.style.backgroundColor = 'white';
  gender = null;

  emaill.style.borderColor = '';
  namee.style.borderColor = '';
  passwordd.style.borderColor = '';
  bdd.style.borderColor = '';
  contactt.style.borderColor = '';
  


    console.log("User signed up and document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
});


document.getElementById('escape').addEventListener('click', () =>{
  console.log('escape clicked');
  const completeReg = document.getElementById('overlayy');

  if (completeReg.style.visibility === 'visible'){
    completeReg.style.visibility = 'hidden';
  };
})