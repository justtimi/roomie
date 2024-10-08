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

toggleBtn.addEventListener("click", function () {
  Links.classList.toggle("show-links");
});

DarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
