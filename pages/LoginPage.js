
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailInput = this.page.getByTestId("login-email");

    this.passwordInput = this.page.getByRole("textbox", {
      name: "Password",
    });

    this.loginButton = this.page.getByRole("button", {
      name: "Login",
    });

    this.signupNameInput = this.page.getByRole("textbox", {
      name: "Name",
    });

    this.signupEmailInput = this.page.locator(
      'input[data-qa="signup-email"]'
    );

    this.signupButton = this.page.getByRole("button", {
      name: "Signup",
    });

    this.loginErrorMessage = this.page.getByText(
      "Your email or password is incorrect!"
    );

    this.signupErrorMessage = this.page.getByText(
      "Email Address already exist!"
    );
  }

  async enterLoginDetails(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async verifyLoginPage() {
    await expect(
      this.page.getByRole("heading", {
        name: "Login to your account",
      })
    ).toBeVisible();
  }

  async verifyInvalidLoginMessage() {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifyExistingEmailMessage() {
    await expect(this.signupErrorMessage).toBeVisible();
  }

  async enterSignupDetails(name, email) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async clickSignup() {
    await this.signupButton.click();
  }
}

module.exports = LoginPage;
