
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class AccountInformationPage extends BasePage {
  constructor(page) {
    super(page);

    this.mrRadio = this.page.getByRole("radio", { name: "Mr." });
    this.mrsRadio = this.page.getByRole("radio", { name: "Mrs." });

    this.passwordInput = this.page.getByTestId("password");
    this.daySelect = this.page.getByTestId("days");
    this.monthSelect = this.page.getByTestId("months");
    this.yearSelect = this.page.getByTestId("years");

    this.firstNameInput = this.page.getByTestId("first_name");
    this.lastNameInput = this.page.getByTestId("last_name");
    this.companyInput = this.page.getByTestId("company");
    this.addressInput = this.page.getByTestId("address");
    this.countrySelect = this.page.getByTestId("country");
    this.stateInput = this.page.getByTestId("state");
    this.cityInput = this.page.getByTestId("city");
    this.zipcodeInput = this.page.getByTestId("zipcode");
    this.mobileNumberInput = this.page.getByTestId("mobile_number");

    this.createAccountButton = this.page.getByTestId("create-account");
  }

  async selectTitle(title) {
    if (title === "Mr") {
      await this.mrRadio.check();
    } else if (title === "Mrs") {
      await this.mrsRadio.check();
    } else {
      throw new Error(`Invalid title: ${title}`);
    }
  }

  async fillAccountDetails(user) {
    await this.selectTitle(user.title);
    await this.passwordInput.fill(user.password);

    await this.daySelect.selectOption(user.birth_day);
    await this.monthSelect.selectOption(user.birth_month);
    await this.yearSelect.selectOption(user.birth_year);

    await this.firstNameInput.fill(user.first_name);
    await this.lastNameInput.fill(user.last_name);
    await this.companyInput.fill(user.company);
    await this.addressInput.fill(user.address);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobile_number);
  }

  async submitAccountCreation() {
    await this.createAccountButton.click();
  }

  async verifyAccountInformationPage() {
    await expect(
      this.page.getByRole("heading", { name: "Enter Account Information" })
    ).toBeVisible();
  }
}

module.exports = AccountInformationPage;
