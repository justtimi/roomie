// main.js

const toggleBtn = document.querySelector(".nav-toggle");
const Links = document.querySelector(".links");
const DarkMode = document.getElementById("dark-modetoggle");

window.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (e) {
        if (!validateForm()) {
            e.preventDefault();
        } else {
            handleRegistration(e); // Call handleRegistration if form is valid
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
            errorElement.textContent = `Please enter a valid ${field.name.toLowerCase()}`;
            isValid = false;
            errorElement.classList.add("show");
        }
    });

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateRoom(room) {
    const roomPattern = /^[a-zA-Z]+[A-Z][0-9]{2}$/;

    return roomPattern.test(room);
}

toggleBtn.addEventListener("click", function () {
    Links.classList.toggle("show-links");
});

DarkMode.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// Function to handle user registration
function handleRegistration(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Collect data from the form
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstname").value;
    const surName = document.getElementById("surname").value;
    const roomNumber = document.getElementById("room-number").value;
    const phone = document.getElementById("phone").value;
    const qualities = document.getElementById("qualities").value;
    const interests = document.getElementById("interests").value;
    const profilePicture = document.getElementById("profile-picture").files[0]; // Get the file directly
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("surname", surName);
    formData.append("room-number", roomNumber);
    formData.append("phone_number", phone);
    formData.append("qualities", qualities);
    formData.append("interests", interests);
    formData.append("profile-picture", profilePicture);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);

    // Send data to the backend using Fetch API
    fetch("register.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            // Display the response message from the backend
            const messageDiv = document.getElementById("registrationMessage");
            if (data.status === "success") {
                messageDiv.textContent = "Registration successful!";
                // Optionally redirect or perform other actions
            } else {
                messageDiv.textContent = `Error: ${data.message}`;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
