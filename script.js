const toggleBtn = document.querySelector(".nav-toggle");
const Links = document.querySelector(".links");
const DarkMode = document.getElementById("dark-modetoggle");

toggleBtn.addEventListener("click", function () {
  Links.classList.toggle("show-links");
});

DarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const hero = document.getElementById("banner");

  hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});
