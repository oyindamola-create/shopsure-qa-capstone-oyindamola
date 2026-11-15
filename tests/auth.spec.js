
const { test } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const HeaderComponent = require("../pages/HeaderComponent");
const LoginPage = require("../pages/LoginPage");

const registeredUser = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../test-data/registeredUser.json"),
    "utf8"
  )
);

test.describe("User Authentication", () => {
  let header;
  let login;

  test.beforeEach(async ({ page }) => {
    header = new HeaderComponent(page);
    login = new LoginPage(page);

    await header.navigateTo("/login");
  });

  test("should log in successfully with valid credentials", async () => {
    await login.enterLoginDetails(
      registeredUser.email,
      registeredUser.password
    );

    await login.clickLogin();

    await header.verifyLoggedInAs(registeredUser.name);
  });

  test("should display an error when logging in with an incorrect password", async () => {
    await login.enterLoginDetails(
      registeredUser.email,
      "WrongPassword123!"
    );

    await login.clickLogin();
    await login.verifyInvalidLoginMessage();
  });

  test("should display an error when signing up with an existing email", async () => {
    await login.enterSignupDetails(
      registeredUser.name,
      registeredUser.email
    );

    await login.clickSignup();
    await login.verifyExistingEmailMessage();
  });

  test("should log out successfully", async () => {
    await login.enterLoginDetails(
      registeredUser.email,
      registeredUser.password
    );

    await login.clickLogin();

    await header.verifyLoggedInAs(registeredUser.name);

    await header.logout();

    await login.verifyLoginPage();
    await header.verifyLoggedOut();
  });
});
