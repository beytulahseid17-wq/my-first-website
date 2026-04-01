const hero = document.getElementById("hero");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const welcomeText = document.querySelector(".welcome-text");
const profileImage = document.getElementById("profileImage");
const imagePlaceholder = document.getElementById("imagePlaceholder");
const interactiveButtons = document.querySelectorAll(".interactive-btn");
const skillButtons = document.querySelectorAll(".skill-btn");
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.setAttribute("data-theme", savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.setAttribute("data-theme", "dark");
}

const applyThemeIcon = () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  themeToggle.textContent = isDark ? "☀️" : "🌙";
};

applyThemeIcon();

themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  applyThemeIcon();
});

window.addEventListener("scroll", () => {
  hero.classList.toggle("scrolled", window.scrollY > 10);
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    welcomeText.classList.add("show");
  });

  setTimeout(() => {
    profileImage.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80";
    profileImage.classList.add("show");
    imagePlaceholder.style.opacity = "0";
    imagePlaceholder.style.pointerEvents = "none";
  }, 650);

  skillButtons.forEach((button, index) => {
    setTimeout(() => {
      button.classList.add("show");
    }, 300 + index * 120);
  });
});

interactiveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("is-clicked");
    setTimeout(() => button.classList.remove("is-clicked"), 220);
  });
});
