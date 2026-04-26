const hero = document.getElementById("hero");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");
const welcomeWord = document.querySelector(".welcome-word");
const welcomeText = document.querySelector(".welcome-text");
const typingText = document.getElementById("typingText");
const skillsTitle = document.querySelector(".skills-title");
const skillCards = document.querySelectorAll(".skill-card");
const profileImage = document.getElementById("profileImage");
const imagePlaceholder = document.getElementById("imagePlaceholder");
const aboutImageWrap = document.querySelector(".about__image-wrap");
const interactiveButtons = document.querySelectorAll(".interactive-btn");
const projectsSection = document.getElementById("projects");
const projectsList = document.getElementById("projectsList");
const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalOverlay = document.getElementById("projectModalOverlay");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalLink = document.getElementById("projectModalLink");
const messageForm = document.getElementById("messageForm");
const formSubmitBtn = document.getElementById("formSubmitBtn");
const toastNotification = document.getElementById("toastNotification");

const projectData = [
  {
    title: "Portfolio Website",
    description: "3D animation cartoon inspired portfolio concept used by modern companies.",
    image: "preview.png",
    previewImage: "preview.png",
    previewLink: "preview.html"
  },
  {
    title: "Business Landing Page",
    description: "Conversion-focused landing page for a small business with clean sections and CTA flow.",
    image: "minber.jpeg",
    previewImage: "minber.jpeg",
    previewLink: "minbertv.html"
  }
];

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

function renderProjects() {
  projectsList.innerHTML = "";

  projectData.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card project-card--feature reveal";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${project.title} preview`);
    card.dataset.previewImage = project.previewImage;
    card.dataset.previewLink = project.previewLink;

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-card__image" />
      <div class="project-card__body">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;

    projectsList.appendChild(card);
  });
}

function openProjectModal(card) {
  projectModalImage.src = card.dataset.previewImage;
  projectModalLink.href = card.dataset.previewLink;
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function showToast(message, type = "success") {
  toastNotification.textContent = message;
  toastNotification.className = `toast ${type} show`;
  setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 2600);
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

projectsSection.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card--feature");
  if (!card) return;
  openProjectModal(card);
});

projectsSection.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".project-card--feature");
  if (!card) return;
  event.preventDefault();
  openProjectModal(card);
});

projectModalClose.addEventListener("click", closeProjectModal);
projectModalOverlay.addEventListener("click", closeProjectModal);

messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formSubmitBtn.disabled = true;
  formSubmitBtn.textContent = "Submitting...";

  const formData = new FormData(messageForm);
  formData.append("_subject", "New portfolio contact message");
  formData.append("_captcha", "false");

  try {
    const response = await fetch("https://formsubmit.co/ajax/beytulahseid093@gmail.com", {
      method: "POST",
      body: formData
    });
    const result = await response.json();

    if (response.ok && result.success === "true") {
      messageForm.reset();
      showToast("Successfully submitted.", "success");
    } else {
      showToast("Please try again. Unable to submit.", "error");
    }
  } catch (error) {
    showToast("Please try again. Network error.", "error");
  } finally {
    formSubmitBtn.disabled = false;
    formSubmitBtn.textContent = "Submit";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("open")) {
    closeProjectModal();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  renderProjects();

  let typingIndex = 0;
  let deleting = false;
  const typingWords = ["Developer", "Designer."];
  let activeWord = 0;

  const typeEffect = () => {
    const word = typingWords[activeWord];
    if (!deleting) {
      typingText.textContent = word.slice(0, typingIndex + 1);
      typingIndex += 1;
      if (typingIndex === word.length) {
        deleting = true;
        setTimeout(typeEffect, 900);
        return;
      }
    } else {
      typingText.textContent = word.slice(0, typingIndex - 1);
      typingIndex -= 1;
      if (typingIndex === 0) {
        deleting = false;
        activeWord = (activeWord + 1) % typingWords.length;
      }
    }

    setTimeout(typeEffect, deleting ? 55 : 95);
  };

  requestAnimationFrame(() => {
    welcomeWord.classList.add("show");
    welcomeText.classList.add("show");
    typeEffect();
  });

  setTimeout(() => {
    profileImage.src = "pro.png";
    profileImage.classList.add("show");
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

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  if (aboutImageWrap) {
    revealObserver.observe(aboutImageWrap);
  }

  document.querySelectorAll(".project-card.reveal").forEach((card, index) => {
    card.style.transitionDelay = `${index * 120}ms`;
    revealObserver.observe(card);
  });
});

interactiveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("is-clicked");
    setTimeout(() => button.classList.remove("is-clicked"), 220);
  });
});

window.addProjectToSection = (project) => {
  projectData.push(project);
  renderProjects();
};
