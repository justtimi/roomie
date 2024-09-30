// main.js

const toggleBtn = document.querySelector(".nav-toggle");
const Links = document.querySelector(".links");
const DarkMode = document.getElementById("dark-modetoggle");

window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");

  form.addEventListener("submit", function (e) {
    if (!validateForm()) {
      e.preventDefault();
    }
  });
});

function validateForm() {
  const fields = [
    { id: "email", name: "Email", validator: validateEmail },
    { id: "firstname", name: "Firstname" },
    { id: "surname", name: "Surname" },
    { id: "room-number", name: "Room number", validator: validateRoom },
    { id: "phone", name: "WhatsApp number" },
    { id: "qualities", name: "Qualities" },
    { id: "interests", name: "Interests" },
    { id: "profile-picture", name: "Picture" },
    { id: "password", name: "Password" },
    { id: "confirm-password", name: "Password" },
  ];
  let isValid = true;
  fields.forEach(function (field) {
    const input = document.getElementById(field.id);

    const errorElement = document.getElementById(field.id + "Error");

    errorElement.textContent = "";
    errorElement.classList.remove("show");

    if (input.value.trim() === "") {
      errorElement.textContent = `${field.name} cannot be empty`;
      isValid = false;
      errorElement.classList.add("show");
    } else if (field.validator && !field.validator(input.value)) {
      errorElement.textContent = `Plese enter a valid ${field.name.toLowerCase()}`;
      isValid = false;
    }
  });

  return isValid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateRoom(room) {
  const roomPattern = /^[a-zA-z]+[A-Z][0-9][0-9]{2}$/;

  let roomDetails = {
    hall: null,
    wing: null,
    floor: null,
    room: null,
    isValid: false,
  };

  if (roomPattern.test(room)) {
    let matches = room.match(/^[a-zA-z]+[A-Z][0-9][0-9]{2}$/);

    roomDetails.hall = matches[1];
    roomDetails.wing = matches[2];
    roomDetails.floor = matches[3];
    roomDetails.room = matches[4];
    roomDetails.isValid = true;
  } else {
    return false;
  }
}

toggleBtn.addEventListener("click", function () {
  Links.classList.toggle("show-links");
});

DarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// Function to handle user registration
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  // Collect data from the form
  const email = document.getElementById("email").value;
  const firstName = document.getElementById("firstname").value;
  const surName = document.getElementById("surname").value;
  const roomNumber = document.getElementById("room-number").value;
  const phone = document.getElementById("phone").value;
  const qualities = document.getElementById("qualities").value;
  const interests = document.getElementById("interests").value;
  const profilePicture = document.getElementById("profile-picture").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Send data to the backend using Fetch API
  fetch("register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      firstName,
      surName,
      roomNumber,
      phone,
      qualities,
      interests,
      profilePicture,
      password,
      confirmPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the response message from the backend
      const messageDiv = document.getElementById("registrationMessage");
      if (data.status === "success") {
        messageDiv.textContent = "Registration successful!";
      } else {
        messageDiv.textContent = `Error: ${data.message}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
