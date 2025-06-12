let otpBox = document.querySelector(".background");
let otpbtn = document.querySelector(".otp-btn");
let button = document.querySelector(".otp-btn-verify");
let inputs = document.querySelectorAll(".otpNumber input");
let errorMsgBody = document.querySelector(".error-msg-span");
let otpPara =  document.querySelector(".otpPara")
let userInputOtp;
let initial = "+91";
let captachContainer = document.querySelector(".recaptcha-container");
let capresole = false;
let vaerify_war = document.querySelector(".verify-warning")




inputs.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {
  const currentInput = input,
    nextInput = input.nextElementSibling,
    prevInput = input.previousElementSibling;
  if (currentInput.value.length > 1) {
    currentInput.value = "";
    return;
  }
  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }

  if (e.key === "Backspace") {
    inputs.forEach((input, index2) => {
      if (index1 <= index2 && prevInput) {
        input.setAttribute("disabled", true);
        input.value = "";
        prevInput.focus();
      }
    });
  }

  if (!inputs[5].disabled && inputs[5].value !== "") {
    button.classList.add("active");
    return;
  }
  button.classList.remove("active");
});
});

window.addEventListener("load", () => inputs[0].focus());




const firebaseConfig = {
    apiKey: "AIzaSyA35CUmTba6O5-bAgI3KY1Qk5b6PvLSphw",
    authDomain: "otp-verification-26dba.firebaseapp.com",
    projectId: "otp-verification-26dba",
    storageBucket: "otp-verification-26dba.appspot.com",
    messagingSenderId: "948556910612",
    appId: "1:948556910612:web:af7d7bf730c521454d5701",
    measurementId: "G-KN702SRWC4"
  };
firebase.initializeApp(firebaseConfig);

function phoneAuth() {
  var number = document.getElementById("number").value;
  number = initial + number;
  firebase
    .auth()
    .signInWithPhoneNumber(number, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      coderesult = confirmationResult;
      
    })
    .catch(function (error) {
      otpBox.style.display = "none";
      alert(error.message);
    });
}

function render() {
  otpBox.style.display = "block";
  errorMsgBody.innerHTML = "";
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  recaptchaVerifier.render();
  phoneAuth();
}


function codeverify() {

  coderesult
    .confirm(userInputOtp)
    .then(function () {
      setTimeout(() => {
        otpBox.style.display = "none";
      }, 2000);
   
      let name = document.querySelector("#name").value;
      let mail = document.querySelector("#email").value;
      let number = document.querySelector("#number").value;
      let course = document.querySelector("#course").value;
      let quali = document.querySelector("#qualification").value;
    
      emailjs.send("service_xukw6z4", "template_z5b32h5", {
        name,
        number,
        mail,
        quali,
        course,
      });
      vaerify_war.innerHTML=""
      errorMsgBody.innerHTML = "Verified! And Details Submitted";
    })
    .catch(function (err) {
      errorMsgBody.innerHTML = "Incorrect OTP";
      otpPara.innerHTML = "Please Re-Verify Captcha."
    });
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  userInputOtp = Array.from(inputs).map((e) => parseInt(e.value.toString()[0])).join("");
  if (userInputOtp.length !== 6) {
    errorMsgBody.innerHTML = "Enter 6-digit OTP";

  } else {
    errorMsgBody.innerHTML = "Verifying...";
    codeverify();
  }
});

function verify(){
  let name = document.querySelector("#name").value;
  let mail = document.querySelector("#email").value;
  let number = document.querySelector("#number").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/; 
  const nameRegex = /^[a-zA-Z\s\-']+$/;

  const isValid = emailRegex.test(mail) && phoneRegex.test(number.replace(/\D/g, '')) && nameRegex.test(name);

  isValid ? render():vaerify_war.innerHTML="Enter Valid Input";


}

otpbtn.addEventListener("click", (e) => {

  e.preventDefault();
  if(!capresole){
    verify();
  }

});


document.addEventListener('DOMContentLoaded', function() {
  otpBox.style.position = 'absolute'; 
  otpBox.style.zIndex = '1000'; 
});


// for selecting course

// Get all card elements
const cards = document.querySelectorAll('.col');

// Add click event listeners to each card
cards.forEach(col => {
    col.addEventListener('click', () => {
        // Get the course data attribute from the clicked card
        const course = col.getAttribute('data-course');
        // Set the dropdown value to the selected course
        document.getElementById('course').value = course;


            // Scroll to the form section smoothly
            document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' });
    });
});

