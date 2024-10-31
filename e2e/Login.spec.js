const { test, expect } = require("@playwright/test");

test.describe("Login with reCAPTCHA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/login");
  });

  test("should display an error message for invalid credentials", async ({ page }) => {
    await page.click("#refreshCaptcha");

    await page.fill("#username", "wronguser");
    await page.fill("#password", "wrongpassword");

    const captcha = await page.inputValue("#captchaField");
    await page.fill("#captchaInput", captcha);

    await page.click("#loginBtn");

    const loginMessage = await page.textContent("#loginMessage");
    expect(loginMessage).toBe("Invalid username or password.");
  });

  test("should log in successfully with valid credentials", async ({ page }) => {
    await page.click("#refreshCaptcha");

    await page.fill("#username", "testuser");
    await page.fill("#password", "password123");

    const captcha = await page.inputValue("#captchaField");
    await page.fill("#captchaInput", captcha);

    await page.click("#loginBtn");

    const loginMessage = await page.textContent("#loginMessage");
    expect(loginMessage).toBe("Login successful!");
  });

  test("should display an error message when username is empty", async ({ page }) => {
    await page.click("#refreshCaptcha");

    await page.fill("#password", "password123");

    const captcha = await page.inputValue("#captchaField");
    await page.fill("#captchaInput", captcha);

    await page.click("#loginBtn");

    const loginMessage = await page.textContent("#loginMessage");
    expect(loginMessage).toBe("Invalid username or password.");
  });

  test("should display an error message when password is empty", async ({ page }) => {
    await page.click("#refreshCaptcha");

    await page.fill("#username", "testuser");

    const captcha = await page.inputValue("#captchaField");
    await page.fill("#captchaInput", captcha);

    await page.click("#loginBtn");

    const loginMessage = await page.textContent("#loginMessage");
    expect(loginMessage).toBe("Invalid username or password.");
  });

  test("should display an error message when captcha is incorrect", async ({ page }) => {
    await page.click("#refreshCaptcha");

    await page.fill("#username", "testuser");
    await page.fill("#password", "password123");

    await page.fill("#captchaInput", "wrongcaptcha");

    await page.click("#loginBtn");

    const loginMessage = await page.textContent("#loginMessage");
    expect(loginMessage).toBe("Please complete the reCAPTCHA.");
  });

  test("should display an error message when captcha input is empty", async ({ page }) => {
    await page.click("#refreshCaptcha");

    await page.fill("#username", "testuser");
    await page.fill("#password", "password123");

    await page.fill("#captchaInput", "");

    await page.click("#loginBtn");

    const loginMessage = await page.textContent("#loginMessage");
    expect(loginMessage).toBe("Please complete the reCAPTCHA.");
  });

  test("should allow refreshing the captcha", async ({ page }) => {
    await page.click("#refreshCaptcha");

    const newCaptcha = await page.inputValue("#captchaField");

    await page.click("#refreshCaptcha");
    const refreshedCaptcha = await page.inputValue("#captchaField");

    expect(newCaptcha).not.toBe(refreshedCaptcha);
  });

  test("should reset the captcha input field after refreshing", async ({ page }) => {
    await page.click("#refreshCaptcha");

    const captcha = await page.inputValue("#captchaField");
    await page.fill("#captchaInput", captcha);

    await page.click("#refreshCaptcha");

    const captchaInput = await page.inputValue("#captchaInput");
    expect(captchaInput).toBe("");
  });
});
