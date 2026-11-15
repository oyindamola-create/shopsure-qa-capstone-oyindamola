
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class HeaderComponent extends BasePage {
  constructor(page) {
    super(page);

    this.productsLink = this.page.getByRole("link", {
      name: "Products",
    });

    this.signupLoginLink = this.page.getByRole("link", {
      name: "Signup / Login",
    });

    this.logoutLink = this.page.getByRole("link", {
      name: "Logout",
    });

    this.deleteAccountLink = this.page.getByRole("link", {
      name: "Delete Account",
    });

    this.loggedInUserLabel = this.page.getByText("Logged in as");
  }

  async openSignupLoginPage() {
    await this.signupLoginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.page.keyboard.press("Escape");
    await this.deleteAccountLink.click();
  }

  async verifyLoggedInAs(userName) {
    await expect(this.loggedInUserLabel).toContainText(userName);
  }

  async verifyLoggedOut() {
    await expect(this.loggedInUserLabel).toBeHidden();
  }
}

module.exports = HeaderComponent;
