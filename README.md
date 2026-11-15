# ShopSure QA Capstone Project

## 1. Project Overview

ShopSure is a QA capstone project focused on testing web application functionality through API testing and UI automation.

The project uses Postman and Newman for API testing, JavaScript utility functions for calculation validation, and Playwright for automated UI testing.

The application under test is [Automation Exercise](https://automationexercise.com/).

## 2. Tools and Technologies

- **Programming Language:** JavaScript
- **API Testing:** Postman
- **API Test Runner:** Newman
- **API Reporting:** Newman HTML Extra Reporter
- **UI Automation:** Playwright
- **Browsers:** Chromium and Firefox
- **Version Control:** Git and GitHub
- **Runtime:** Node.js

## 3. Prerequisites and Installation

Before running the project, ensure you have:

- Node.js 20.10 or later
- npm
- Git

Clone the repository:

```bash
git clone https://github.com/oyindamola-create/shopsure-qa-capstone-oyindamola.git
```

Navigate into the project directory:

```bash
cd shopsure-qa-capstone
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install chromium firefox
```

## 4. Running API Tests

The project uses Postman collections to validate API functionality.

To run the API tests using Newman:

```bash
npm run test:api
```

The HTML report is generated at:

`reports/newman/shopsure-api-report.html`

The API test collection and environment files are located in the `Postman/` directory.

## 5. Running Playwright UI Tests

The Playwright test suite covers user registration, authentication, product functionality, and shopping cart operations.

Run all tests:

```bash
npm test
```

Run individual test suites:

```bash
npm run test:registration
npm run test:auth
npm run test:product
npm run test:cart
```

Run tests in debug mode:

```bash
npm run test:registration:debug
npm run test:auth:debug
npm run test:product:debug
npm run test:cart:debug
```

The configured browsers are Chromium and Firefox.

## 6. Project Folder Structure

```text
shopsure-qa-capstone/
│
├── pages/
│   ├── BasePage.js
│   ├── HeaderComponent.js
│   ├── LoginPage.js
│   ├── AccountInformationPage.js
│   ├── AccountStatusPage.js
│   ├── ProductsPage.js
│   ├── ProductDetailPage.js
│   └── CartPage.js
│
├── tests/
│   ├── registration.spec.js
│   ├── auth.spec.js
│   ├── products.spec.js
│   └── cart.spec.js
│
├── test-data/
│   ├── registeredUser.json
│   ├── searchTerms.json
│   └── cartProducts.json
│
├── utils/
│   ├── TestDataGenerator.js
│   └── cartPriceCalculator.js
│
├── Postman/
│   ├── ShopSure API.postman_collection.json
│   ├── ShopSure Environment.postman_environment.json
│   └── api_review.md
│
├── reports/
│   └── newman/
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 7. Test Coverage

### API Testing

API testing covers the application's supported endpoints and validates:

- Successful and unsuccessful requests
- Response status codes
- Response body and data validation
- Request and response handling
- Chained API workflows

The Postman collection contains 26 requests across the API test scenarios.

### UI Automation

The Playwright test suite covers:

1. Successful user registration.
2. Login with valid credentials.
3. Login with an incorrect password.
4. Signup using an existing email address.
5. Successful logout.
6. Product search and search result validation.
7. Product detail verification.
8. Adding two products to the cart and validating quantities and totals.
9. Removing a product from the cart.

The tests are executed against Chromium and Firefox.

### JavaScript Utility Testing

Utility functions are used to:

- Parse product prices.
- Calculate individual product line totals.
- Calculate the overall cart total.

## 8. Findings and Observations

During testing, the following observations were documented:

- Product search results may not always contain the exact search term entered.
- Searching for broad terms such as `Top` and `Shirt` returned results that did not consistently match the search term.
- A more specific search term, `Sleeves Printed Top`, was used for the automated search validation.

Additional API observations and findings are documented in `Postman/api_review.md`.

---

**Note:** The registered test account credentials are maintained locally and should not be committed to the public repository.