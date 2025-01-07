

let imgCounter = 0;
let imgArray = ['images/4.jpg', 'images/8.jpg', 'images/9.jpg', 'images/7.jpg', 'images/5.jpg', 'images/6.jpg'];


function rightBtn(){
  imgCounter = (imgCounter + 1) % imgArray.length;
updateImage();
}

function leftBtn(){
    imgCounter = (imgCounter - 1 + imgArray.length) % imgArray.length;
    updateImage();
}

function updateImage(){
    const imgContainer = document.getElementById('imageContainer');
    imgContainer.src = imgArray[imgCounter];
}

async function submit() {
  const overlay = document.getElementById('overlay');
  const loader = document.getElementById("overlay1");
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');  
  const messageInput = document.getElementById('message');
  const emailError = document.getElementById('emailErr');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  
  if (!name || !email || !message) {
    nameInput.style.borderColor = 'red';
    emailInput.style.borderColor = 'red';
    messageInput.style.borderColor = 'red';
    return;
  } else {
    nameInput.style.borderColor = 'rgb(18, 144, 255)';
    emailInput.style.borderColor = 'rgb(18, 144, 255)';
    messageInput.style.borderColor = 'rgb(18, 144, 255)';
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailInput.style.borderColor = 'red';
    emailError.style.display = 'block';
    return;
  } else {
    emailInput.style.borderColor = 'rgb(18, 144, 255)';
    emailError.style.display = 'none';
  }

  const params = { name, email, message };
  const serviceID = 'service_rvj2yqs';
  const templateID = 'template_q0485co';

  try {
    console.log('Submit button clicked.');



   
    loader.style.visibility = 'visible';
    await new Promise(resolve => setTimeout(resolve, 300));
  


     



   overlay.style.visibility = 'visible';
   
   nameInput.value = '';
   emailInput.value = '';
   messageInput.value = '';
  
   loader.style.visibility = 'hidden';

    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


function escape(){
  const overlay = document.getElementById('overlay');
  console.log("escape clicked.");

  if (overlay.style.visibility === 'visible'){
    overlay.style.visibility = 'hidden';
  };
};