
const { test } = require("@playwright/test");

const HeaderComponent = require("../pages/HeaderComponent");
const LoginPage = require("../pages/LoginPage");
const AccountInformationPage = require("../pages/AccountInformationPage");
const AccountStatusPage = require("../pages/AccountStatusPage");
const TestDataGenerator = require("../utils/TestDataGenerator");

let pageObjects;
let user;
let accountCreated = false;

test.beforeEach(async ({ page }) => {
  accountCreated = false;

  pageObjects = {
    header: new HeaderComponent(page),
    login: new LoginPage(page),
    accountInfo: new AccountInformationPage(page),
    accountStatus: new AccountStatusPage(page),
    testData: new TestDataGenerator(),
  };

  user = pageObjects.testData.generateUserProfile();
});

test("should register a new user successfully", async () => {
  const { header, login, accountInfo, accountStatus } = pageObjects;

  await header.navigateTo("/");
  await header.openSignupLoginPage();

  await login.enterSignupDetails(user.name, user.email);
  await login.clickSignup();

  await accountInfo.verifyAccountInformationPage();
  await accountInfo.fillAccountDetails(user);
  await accountInfo.submitAccountCreation();

  await accountStatus.verifyAccountCreated();
  accountCreated = true;

  await accountStatus.continueAfterAccountCreation();
  await header.verifyLoggedInAs(user.name);
});

test.afterEach(async () => {
  if (accountCreated) {
    await pageObjects.header.deleteAccount();
    await pageObjects.accountStatus.verifyAccountDeleted();
    accountCreated = false;
  }
});
