const hero = document.getElementById("hero");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");
const welcomeWord = document.querySelector(".welcome-word");
const welcomeText = document.querySelector(".welcome-text");
const typingText = document.getElementById("typingText");
const skillsTitle = document.querySelector(".skills-title");
const skillCards = document.querySelectorAll(".skill-reveal");
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
const privacyLink = document.getElementById("privacyLink");
const termsLink = document.getElementById("termsLink");
const legalContent = document.getElementById("legalContent");
const legalTitle = document.getElementById("legalTitle");
const legalBody = document.getElementById("legalBody");
const sectionsForLegalToggle = document.querySelectorAll(".intro, .about, .skills, .projects");

const projectData = [
  {
    title: "Portfolio Website",
    description: "3D animation cartoon inspired portfolio concept used by modern companies.",
    image: "preview.png",
    previewImage: "preview.png",
    previewLink: "portfolio.html"
  },
  {
    title: "Business Landing Page",
    description: "Conversion-focused landing page for a small business with clean sections and CTA flow.",
    image: "minber.jpeg",
    previewImage: "minber.jpeg",
    previewLink: "minbertv.html"
  },
  {
    title: "Coffee Website",
    description: "A cozy coffee brand website with warm visuals, product highlights, and user-friendly navigation.",
    image: "coffee.jpeg",
    previewImage: "coffee.jpeg",
    previewLink: "etete.html"
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
        <div class="project-tech"><span>HTML</span><span>CSS</span><span>JavaScript</span></div>
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
function showLegal(type) {
  sectionsForLegalToggle.forEach((section) => {
    section.hidden = true;
  });
  legalContent.hidden = false;
  if (type === "privacy") {
    legalTitle.textContent = "Privacy Policy";
    legalBody.innerHTML = `
      <p>Welcome to my website. Your privacy is important to me. This Privacy Policy explains how information may be collected and used when you visit this website.</p>
      <h4>Information I Collect</h4>
      <p>I may collect basic information such as: Name, Email address, and messages sent through contact forms.</p>
      <h4>How Your Information Is Used</h4>
      <p>Your information may be used to: Respond to inquiries, Improve website experience, and communicate about services or projects.</p>
      <h4>Cookies and Analytics</h4>
      <p>This website may use cookies or analytics tools to understand visitor activity and improve performance.</p>
      <h4>Third-Party Services</h4>
      <p>Some third-party services or links may appear on this website. I am not responsible for the privacy practices of external websites.</p>
      <h4>Data Protection</h4>
      <p>I do my best to keep your information secure and protected.</p>
      <h4>Contact</h4>
      <p>If you have any questions about this Privacy Policy, you can contact me through the contact section of this website.</p>
    `;
  } else {
    legalTitle.textContent = "Terms & Conditions";
    legalBody.innerHTML = `
      <p>By using this website, you agree to the following terms and conditions.</p>
      <h4>Website Usage</h4>
      <p>The content on this website is provided for informational and portfolio purposes only.</p>
      <h4>Intellectual Property</h4>
      <p>All website content, designs, and projects displayed on this website belong to the website owner unless stated otherwise.</p>
      <h4>Limitations</h4>
      <p>I am not responsible for any damages or issues resulting from the use of this website or third-party links.</p>
      <h4>External Links</h4>
      <p>This website may contain links to external websites. I am not responsible for their content or services.</p>
      <h4>Changes</h4>
      <p>These terms may be updated at any time without prior notice.</p>
      <h4>Contact</h4>
      <p>For questions regarding these terms, please use the contact section of this website.</p>
    `;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

privacyLink.addEventListener("click", (event) => {
  event.preventDefault();
  showLegal("privacy");
});

termsLink.addEventListener("click", (event) => {
  event.preventDefault();
  showLegal("terms");
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
