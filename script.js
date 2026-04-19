const hero = document.getElementById("hero");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");
const welcomeText = document.querySelector(".welcome-text");
const careerText = document.getElementById("careerText");
const skillsTitle = document.querySelector(".skills-title");
const skillCards = document.querySelectorAll(".skill-card");
const profileImage = document.getElementById("profileImage");
const imagePlaceholder = document.getElementById("imagePlaceholder");
const interactiveButtons = document.querySelectorAll(".interactive-btn");
const projectCard = document.getElementById("projectCard");
const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalOverlay = document.getElementById("projectModalOverlay");
const projectcard = document.getElementById("projectcard");
const projectmodal = document.getElementById("projectmodal");
const projectmodalclose = document.getElementById("projectmodalclose");
const projectmodaloverlay = document.getElementById("projectmodaloverlay");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme);
    return;
  }

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(systemDark ? "dark" : "light");
}

function openProjectModal() {
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

window.addEventListener("scroll", () => {
  hero.classList.toggle("scrolled", window.scrollY > 10);
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

projectCard.addEventListener("click", openProjectModal);
projectCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openProjectModal();
  }
});

projectModalClose.addEventListener("click", closeProjectModal);
projectModalOverlay.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("open")) {
    closeProjectModal();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  requestAnimationFrame(() => {
    welcomeText.classList.add("show");
  });

  setTimeout(() => {
    profileImage.src = "pro.png";
    profileImage.classList.add("show");
    careerText.classList.add("show");
    imagePlaceholder.style.opacity = "0";
    imagePlaceholder.style.pointerEvents = "none";
  }, 650);

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        skillsTitle.classList.add("show");
        skillCards.forEach((card, index) => {
          setTimeout(() => card.classList.add("show"), index * 110);
        });

        skillsObserver.disconnect();
      });
    },
    { threshold: 0.28 }
  );

  skillsObserver.observe(document.querySelector(".skills"));
});

interactiveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("is-clicked");
    setTimeout(() => button.classList.remove("is-clicked"), 220);
  });
});



function openprojectmodal() {
  projectmodal.classList.add("open");
  projectmodal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeprojectmodal() {
  projectmodal.classList.remove("open");
  projectmodal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

projectcard.addEventListener("click", openprojectmodal);
projectcard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openProjectModal();
  }
});

projectmodalclose.addEventListener("click", closeprojectmodal);
projectmodaloverlay.addEventListener("click", closeprojectmodal);

function openprojectmodal() {
  projectmodal.classList.add("open");
  projectmodal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeprojectmodal() {
  projectmodal.classList.remove("open");
  projectmodal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

projectcard.addEventListener("click", openprojectmodal);
projectcard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openprojectmodal();
  }
});

projectmodalclose.addEventListener("click", closeprojectmodal);
projectmodaloverlay.addEventListener("click", closeprojectmodal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectmodal.classList.contains("open")) {
    closeprojectmodal();
  }
});
