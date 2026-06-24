document.addEventListener("DOMContentLoaded", function () {
  // ===== CAROUSEL AUTO-SLIDING =====
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselDots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  const slideDuration = 5000; // 5 seconds

  function showSlide(index) {
    carouselSlides.forEach((slide) => slide.classList.remove("active"));
    carouselDots.forEach((dot) => dot.classList.remove("active"));

    carouselSlides[index].classList.add("active");
    carouselDots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
  }

  // Auto-advance carousel every 5 seconds
  if (carouselSlides.length > 0) {
    setInterval(nextSlide, slideDuration);

    // Manual dot click navigation
    carouselDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  // ===== SPA NAVIGATION =====
  const navLinks = document.querySelectorAll(".nav-link");
  const tabSections = document.querySelectorAll(".tab-section");
  const overviewButtons = document.querySelectorAll(".card-button");

  function setActiveTab(tabId) {
    tabSections.forEach((section) => {
      section.classList.toggle("active", section.id === tabId);
    });

    // Update navbar links active state
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.tab === tabId);
    });

    // Scroll to top when changing tabs
    window.scrollTo(0, 0);
  }

  // Navbar navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.dataset.tab;
      if (tabId) {
        setActiveTab(tabId);
      }
    });
  });

  // Overview card buttons
  overviewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      if (tabId) {
        setActiveTab(tabId);
      }
    });
  });

  // ===== AUTHENTICATION =====
  const authModal = document.getElementById("authModal");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const closeModal = document.getElementById("closeModal");
  const registerBtn = document.getElementById("registerBtn");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const profileName = document.getElementById("profileName");
  const profileAvatar = document.getElementById("profileAvatar");
  const authButtons = document.getElementById("authButtons");

  function showModal() {
    authModal.classList.remove("hide");
  }

  function closeModalWindow() {
    authModal.classList.add("hide");
  }

  function setUserProfile(name) {
    profileName.textContent = name;
    profileAvatar.textContent = name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("");
    authButtons.classList.add("hide");
    logoutBtn.classList.remove("hide");
  }

  function resetProfile() {
    profileName.textContent = "Guest User";
    profileAvatar.textContent = "GU";
    authButtons.classList.remove("hide");
    logoutBtn.classList.add("hide");
  }

  const storedName = localStorage.getItem("cyaUserName");
  if (storedName) {
    setUserProfile(storedName);
  }

  loginBtn.addEventListener("click", showModal);
  closeModal.addEventListener("click", closeModalWindow);
  authModal.addEventListener("click", function (event) {
    if (event.target === authModal) {
      closeModalWindow();
    }
  });

  registerBtn.addEventListener("click", function () {
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!fullName || !email || !password) {
      return;
    }

    localStorage.setItem("cyaUserName", fullName);
    setUserProfile(fullName);
    closeModalWindow();
    fullNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  });

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("cyaUserName");
    resetProfile();
  });

  // ===== FAQ ACCORDION =====
  const faqCards = document.querySelectorAll(".faq-card");
  faqCards.forEach((card) => {
    const questionButton = card.querySelector(".faq-question");
    if (questionButton) {
      questionButton.addEventListener("click", function () {
        card.classList.toggle("open");
      });
    }
  });

  // Set home page as default on load
  setActiveTab("home");
});
