function generateCaptcha(length = 6) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let captcha = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    captcha += chars[randomIndex];
  }
  return captcha;
}

function setCaptcha() {
  const captchaField = document.getElementById("captchaField");
  captchaField.value = generateCaptcha();
}

function validateCaptcha() {
  const userCaptcha = document.getElementById("captchaInput").value;
  const generatedCaptcha = document.getElementById("captchaField").value;
  return userCaptcha === generatedCaptcha;
}

function displayMessage(message, color) {
  const loginMessage = document.getElementById("loginMessage");
  loginMessage.innerText = message;
  loginMessage.style.color = color;
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!validateCaptcha()) {
    displayMessage("Please complete the reCAPTCHA.", "red");
    return;
  }

  if (username === "testuser" && password === "password123") {
    displayMessage("Login successful!", "green");
  } else {
    displayMessage("Invalid username or password.", "red");
  }
}

document.getElementById("loginBtn").addEventListener("click", handleLogin);
document.getElementById("refreshCaptcha").addEventListener("click", () => {
  setCaptcha();
  document.getElementById("captchaInput").value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  setCaptcha();
});
