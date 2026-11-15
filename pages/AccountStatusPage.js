
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class AccountStatusPage extends BasePage {
  constructor(page) {
    super(page);

    this.accountCreatedHeading = this.page.getByRole("heading", {
      name: "Account Created!",
    });

    this.accountDeletedHeading = this.page.getByRole("heading", {
      name: "Account Deleted!",
    });

    this.continueButton = this.page.getByRole("link", {
      name: "Continue",
    });
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async verifyAccountDeleted() {
    await expect(this.accountDeletedHeading).toBeVisible();
  }

  async continueAfterAccountCreation() {
    await this.continueButton.click();
  }
}

module.exports = AccountStatusPage;
