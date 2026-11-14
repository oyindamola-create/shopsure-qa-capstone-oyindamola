const { expect } = require("@playwright/test");

const BasePage = require("./BasePage");

class HeaderComponent extends BasePage {
  constructor(page) {
    super(page);
    this.productsLink = this.page.getByRole("link", { name: "Products" });
    this.signupLoginLink = this.page.getByRole("link", {
  name: "Signup / Login"});
  this.logoutLink = this.page.getByRole("link", { name: "Logout" });
  this.loggedInUserLabel = this.page.getByText("Logged in as");
  }

  async openSignupLoginPage() {
  await this.signupLoginLink.click();
}

async logout() {
  await this.logoutLink.click();
}

async verifyLoggedInAs(userName) {
  await expect(this.loggedInUserLabel).toContainText(userName);
}

}

module.exports = HeaderComponent;