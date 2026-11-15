# ShopSure QA Capstone Project

## 1. Project Overview

ShopSure is a Quality Assurance capstone project focused on testing an e-commerce web application through API testing, JavaScript utility development, and UI test automation.

The project uses Postman and Newman for API testing, JavaScript for reusable utility functions, and Playwright for automated UI testing.

The application under test is [Automation Exercise](https://automationexercise.com/), an e-commerce practice website.

The objective of this project is to validate application functionality, verify expected behaviour, identify defects, and document testing observations.

## 2. Tech Stack and Versions

| Technology        | Purpose              | Version                      |
| ----------------- | -------------------- | ---------------------------- |
| JavaScript        | Programming language | ES6+                         |
| Node.js           | JavaScript runtime   | 20.10+ (minimum requirement) |
| Playwright        | UI test automation   | 1.65.1                       |
| Postman           | API testing          | Desktop application          |
| Newman            | API test execution   | 6.1.3                        |
| Newman HTML Extra | API test reporting   | 1.23.1                       |
| Git               | Version control      | --                           |
| GitHub            | Repository hosting   | --                           |

**Browsers used:**

- Chromium
- Firefox

## 3. Prerequisites and Installation

Before running the project, ensure you have the following installed:

- Node.js 20.10 or later
- npm
- Git
- Postman (for running the collection through the Postman application)

### Clone the repository

```bash
git clone https://github.com/oyindamola-create/shopsure-qa-capstone-oyindamola.git
```

### Navigate into the project directory

```bash
cd shopsure-qa-capstone-oyindamola
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install chromium firefox
```

## 4. How to Run the Postman Collection

Postman is used to validate the application's API endpoints, while Newman allows the collection to be executed from the command line.

The exported collection and environment files are located in the `Postman/` directory.

### Run using Postman

1. Open Postman.
2. Import the ShopSure API collection.
3. Import the ShopSure environment.
4. Select the imported environment.
5. Run the collection using Collection Runner.

### Run using Newman

Execute the API test collection with:

```bash
npm run test:api
```

The Newman HTML report is generated at:

```text
reports/newman/shopsure-api-report.html
```

The collection includes positive and negative test scenarios, response validation, and chained account lifecycle tests.

## 5. How to Run Playwright Tests

Playwright is used to automate the application's user registration, authentication, product functionality, and shopping cart operations.

### Run all tests

```bash
npm test
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run tests in Chromium

```bash
npm run test:chromium
```

### Run tests in Firefox

```bash
npm run test:firefox
```

### Run individual test suites

```bash
npm run test:registration
npm run test:auth
npm run test:product
npm run test:cart
```

### Run individual test suites in debug mode

```bash
npm run test:registration:debug
npm run test:auth:debug
npm run test:product:debug
npm run test:cart:debug
```

### Run tests with one worker

```bash
npx playwright test --workers=1
```

This executes tests sequentially rather than running multiple tests simultaneously.

### View the HTML report

After running the Playwright tests, execute:

```bash
npm run report
```

This opens the generated Playwright HTML report.

## 6. Project Folder Structure

```text
shopsure-qa-capstone-oyindamola/
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

### Folder descriptions

- **pages/** – Contains page objects and reusable page interaction methods.
- **tests/** – Contains Playwright test specifications.
- **test-data/** – Stores test data used during UI automation.
- **utils/** – Contains reusable JavaScript utility functions.
- **Postman/** – Contains the exported API collection, environment, and API review document.
- **reports/** – Stores generated test reports and supporting test evidence.

## 7. Test Coverage Summary

### API Testing

The Postman collection contains 26 requests covering 8 API endpoints:

1. Products List
2. Brands List
3. Search Product
4. Create Account
5. Verify Login
6. Get User Detail by Email
7. Update Account
8. Delete Account

API test scenarios cover:

- Successful and unsuccessful requests.
- HTTP status code validation.
- Response body and data validation.
- Response headers and content type.
- Schema validation for selected endpoints.
- Chained account lifecycle operations.

### UI Automation

The Playwright test suite covers 9 functional scenarios:

1. Successful user registration.
2. Login with valid credentials.
3. Login with an incorrect password.
4. Signup using an existing email address.
5. Successful logout.
6. Product search and search result validation.
7. Product detail verification.
8. Adding two products to the cart and validating quantities and totals.
9. Removing a product from the cart.

The tests are configured to run against Chromium and Firefox.

### JavaScript Utility Functions

Two reusable utility modules support the test suite.

**TestDataGenerator.js**

- Generates unique email addresses.
- Selects random items from a list.
- Generates user profile data for registration tests.

**cartPriceCalculator.js**

- Parses product price text.
- Calculates individual product line totals.
- Calculates the overall cart total.

## 8. Findings

The following observations were recorded during testing.

### Product Search

- Product search results did not always contain the exact search term entered.
- Broad search terms such as `Top` and `Shirt` returned results that did not consistently match the search term.
- A more specific search term, `Sleeves Printed Top`, was used for automated search validation.

### Network and Test Execution

- The practice website occasionally experienced slow network responses and page loading delays.
- Some test executions resulted in intermittent navigation timeouts and elements not appearing within the expected time.
- Running tests with four workers occasionally resulted in more failures.
- Running the full test suite with one worker using `npx playwright test --workers=1` resulted in all 18 tests passing.

Additional API observations, identified issues, and recommendations are documented in `Postman/api_review.md`.

---

