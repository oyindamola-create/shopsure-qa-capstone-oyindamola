
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailInput = this.page.getByRole("textbox", {
      name: "Email Address"
    });

    this.passwordInput = this.page.getByRole("textbox", {
      name: "Password"
    });

    this.loginButton = this.page.getByRole("button", {
      name: "Login"
    });
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
        name: "Login to your account"
      })
    ).toBeVisible();
  }
}

module.exports = LoginPage;
