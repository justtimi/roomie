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
    { id: "password", name: "Password" },
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

document.getElementByClassName('fill').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = this.email.value;
    const password = this.password.value;

    fetch('https://roomie.infinityfreeapp.com/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'email': email,
            'password': password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirect to another page, e.g., search.html
            window.location.href = 'search.html';
        } else {
            // Show error message
            document.getElementById('error-message').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    });
});


toggleBtn.addEventListener("click", function () {
  Links.classList.toggle("show-links");
});

DarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
