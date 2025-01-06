# Playwright Automation

Welcome to the Para Bank Test Automation Repository! This repository contains all the necessary tools and scripts to automate the testing of the Para Bank web application. Our goal is to ensure the highest quality and reliability of the Para Bank application through comprehensive and efficient automated testing.

Documentation for Playwright can be found [here](https://playwright.dev/docs/intro).

## Dependencies

The following dependencies are required:

1. [Node.js](https://nodejs.org/en/) LTS
2. [Git](https://git-scm.com/download/win)

## Playwright Installation

Additional installation documentation for Playwright can be found [here](https://playwright.dev/docs/intro#installing-playwright).

1. Install Playwright and the dependencies by running the following command in the terminal window:

   ```
   npm install
   ```

## Browsers

You can run the 'npx playwright install' command to install the browsers. Note: Netskope Client must be disabled on your pc/laptop in order to do this. Otherwise, you may get certificate errors.

## Editing playwright.config.ts File

Update the username and password in the playwright.config.ts file.

const username = "<<username>>";
const password = "<<password>>";

## Running Tests

To run all tests with the default configurations, run the following command in the terminal:

```
npx playwright test
```

To run tests in headed mode:

```
npx playwright test --headed
```

To run tests with a particular project:

```
npx playwright test --project="qa"
npx playwright test --project="prod"
npx playwright test --project="chromium"
```

To run a specific test file:

```
npx playwright test home.spec.ts --project="prod" --headed
```

To run a specific test by title:

```
npx playwright test -g "perform login"
```

To run a specific tests by tag:

```
npx playwright test --grep "@homePage"
```

To run tests in UI Mode:

```
npx playwright test --ui
```

To run tests in debug mode:

```
npx playwright test --debug
```
