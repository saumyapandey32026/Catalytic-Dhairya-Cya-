document.addEventListener("DOMContentLoaded", function () {
  const greetingForm = document.getElementById("greetingForm");
  const greetingMessage = document.getElementById("greetingMessage");
  const userNameInput = document.getElementById("userName");
  const saveNameBtn = document.getElementById("saveNameBtn");
  const resetNameBtn = document.getElementById("resetNameBtn");
  const welcomeText = document.getElementById("welcomeText");
  const sidebarButtons = document.querySelectorAll(".sidebar-item");
  const tabSections = document.querySelectorAll(".tab-section");
  const faqCards = document.querySelectorAll(".faq-card");

  const authModal = document.getElementById("authModal");
  const loginBtn = document.getElementById("loginBtn");
  const signUpBtn = document.getElementById("signUpBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const closeModal = document.getElementById("closeModal");
  const registerBtn = document.getElementById("registerBtn");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const profileName = document.getElementById("profileName");
  const profileAvatar = document.getElementById("profileAvatar");
  const authButtons = document.getElementById("authButtons");

  function showGreeting(name) {
    welcomeText.textContent = `Welcome, ${name}! Let's start learning.`;
    greetingForm.classList.add("hide");
    greetingMessage.classList.remove("hide");
  }

  function hideGreeting() {
    greetingForm.classList.remove("hide");
    greetingMessage.classList.add("hide");
    userNameInput.value = "";
  }

  function setActiveTab(tabId) {
    tabSections.forEach((section) => {
      section.classList.toggle("active", section.id === tabId);
    });
    sidebarButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
  }

  function showModal() {
    authModal.classList.remove("hide");
  }

  function closeModalWindow() {
    authModal.classList.add("hide");
  }

  function setUserProfile(name) {
    profileName.textContent = name;
    profileAvatar.textContent = name.split(" ").map((part) => part[0]).slice(0, 2).join("");
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
    showGreeting(storedName);
    setUserProfile(storedName);
  }

  saveNameBtn.addEventListener("click", function () {
    const name = userNameInput.value.trim();
    if (!name) {
      userNameInput.focus();
      return;
    }
    localStorage.setItem("cyaUserName", name);
    showGreeting(name);
  });

  resetNameBtn.addEventListener("click", function () {
    localStorage.removeItem("cyaUserName");
    hideGreeting();
  });

  signUpBtn.addEventListener("click", showModal);
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

  sidebarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setActiveTab(this.dataset.tab);
    });
  });

  faqCards.forEach((card) => {
    const questionButton = card.querySelector(".faq-question");
    questionButton.addEventListener("click", function () {
      card.classList.toggle("open");
    });
  });

  setActiveTab("subjects");
});
