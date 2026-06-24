document.addEventListener("DOMContentLoaded", function () {
  // ===== THEME TOGGLE SYSTEM =====
  const themeToggleBtn = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;
  const body = document.body;

  // Check for saved theme preference or default to light mode
  function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      updateThemeIcons(true);
    } else {
      body.classList.remove("dark-mode");
      updateThemeIcons(false);
      localStorage.setItem("theme", "light");
    }
  }

  function updateThemeIcons(isDarkMode) {
    const sunIcon = themeToggleBtn.querySelector(".sun-icon");
    const moonIcon = themeToggleBtn.querySelector(".moon-icon");

    if (isDarkMode) {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  }

  function toggleTheme() {
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateThemeIcons(isDarkMode);
  }

  // Theme toggle button listener
  themeToggleBtn.addEventListener("click", toggleTheme);

  // Initialize theme on page load
  initializeTheme();

  // ===== CAROUSEL AUTO-SLIDING =====
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselDots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 5000;

  function showSlide(index) {
    carouselSlides.forEach((slide) => {
      slide.classList.remove("active");
    });
    carouselDots.forEach((dot) => {
      dot.classList.remove("active");
    });

    const normalizedIndex = index % carouselSlides.length;
    carouselSlides[normalizedIndex].classList.add("active");
    carouselDots[normalizedIndex].classList.add("active");
    currentSlide = normalizedIndex;
  }

  function startSlideShow() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(() => {
      showSlide((currentSlide + 1) % carouselSlides.length);
    }, slideDuration);
  }

  if (carouselSlides.length > 0) {
    showSlide(currentSlide);
    startSlideShow();

    carouselDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        startSlideShow();
      });
    });
  }

  // ===== SPA NAVIGATION =====
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const tabSections = document.querySelectorAll(".tab-section");
  const overviewButtons = document.querySelectorAll(".card-button");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function setActiveTab(tabId) {
    const validTabIds = Array.from(tabSections).map((section) => section.id);
    const activeTab = validTabIds.includes(tabId) ? tabId : "home";

    tabSections.forEach((section) => {
      section.classList.toggle("active", section.id === activeTab);
    });

    // Update navbar links active state
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.tab === activeTab);
    });

    mobileNavLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.tab === activeTab);
    });

    closeMobileMenu();

    // Persist active tab selection
    localStorage.setItem("activeTab", activeTab);

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

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.dataset.tab;
      if (tabId) {
        setActiveTab(tabId);
      }
    });
  });

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove("show");
    }
  }

  mobileMenuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (mobileMenu) {
      mobileMenu.classList.toggle("show");
    }
  });

  document.addEventListener("click", (event) => {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("show") &&
      !mobileMenu.contains(event.target) &&
      event.target !== mobileMenuToggle
    ) {
      closeMobileMenu();
    }
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
  const closeModalBtn = document.getElementById("closeModal");
  const registerBtn = document.getElementById("registerBtn");
  const authForm = document.getElementById("authForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const profileName = document.getElementById("profileName");
  const profileAvatar = document.getElementById("profileAvatar");
  const authButtons = document.getElementById("authButtons");

  function showModal() {
    authModal.classList.remove("hide");
    authModal.classList.add("show");
  }

  function closeModalWindow() {
    authModal.classList.remove("show");
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

  // Ensure modal is hidden by default
  authModal.classList.add("hide");
  authModal.classList.remove("show");

  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showModal();
  });

  closeModalBtn.addEventListener("click", closeModalWindow);

  authModal.addEventListener("click", function (event) {
    if (event.target === authModal) {
      closeModalWindow();
    }
  });

  function handleRegister(event) {
    if (event) {
      event.preventDefault();
    }

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!fullName || !email || !password) {
      return;
    }

    localStorage.setItem("cyaUserName", fullName);
    setUserProfile(fullName);
    closeModalWindow();
    authForm.reset();
  }

  registerBtn.addEventListener("click", handleRegister);
  if (authForm) {
    authForm.addEventListener("submit", handleRegister);
  }

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("cyaUserName");
    resetProfile();
  });

  // ===== FAQ ACCORDION =====
  const faqCards = document.querySelectorAll(".faq-card");
  faqCards.forEach((card) => {
    const questionButton = card.querySelector(".faq-question");
    const answerPanel = card.querySelector(".faq-answer");
    const toggleIcon = card.querySelector(".faq-toggle-icon");

    if (!questionButton || !answerPanel) return;

    questionButton.addEventListener("click", () => {
      const isOpen = card.classList.toggle("open");
      if (isOpen) {
        answerPanel.style.maxHeight = answerPanel.scrollHeight + 24 + "px";
        toggleIcon.textContent = "×";
      } else {
        answerPanel.style.maxHeight = "0";
        toggleIcon.textContent = "+";
      }
    });

    window.addEventListener("resize", () => {
      if (card.classList.contains("open")) {
        answerPanel.style.maxHeight = answerPanel.scrollHeight + 24 + "px";
      }
    });
  });

  // Restore active tab from local storage if available
  const savedTab = localStorage.getItem("activeTab");
  setActiveTab(savedTab || "home");
});
