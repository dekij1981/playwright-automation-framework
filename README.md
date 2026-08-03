# Playwright TypeScript Automation Framework

A portfolio test automation framework built with **Playwright** and **TypeScript**.

This project demonstrates modern UI test automation practices using the Page Object Model (POM), reusable fixtures, environment-based configuration and CI execution. The framework is being continuously refactored and expanded to showcase production-style automation architecture and engineering best practices.

---

# Features

- ✅ Playwright Test Runner
- ✅ TypeScript
- ✅ Page Object Model (POM)
- ✅ Custom Fixtures
- ✅ Environment Configuration (.env)
- ✅ HTML Reports
- ✅ Parallel Execution
- ✅ CI Ready (GitHub Actions)
- ✅ Prettier Formatting
- 🚧 API Automation (In Progress)
- 🚧 Smoke & Regression Suites (In Progress)

---

# Tech Stack

| Technology     | Purpose                |
| -------------- | ---------------------- |
| Playwright     | UI Automation          |
| TypeScript     | Test Development       |
| Node.js        | Runtime                |
| GitHub Actions | Continuous Integration |
| Prettier       | Code Formatting        |

---

# Current Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── src/
│   ├── fixtures/
│   ├── pages/
│   └── tests/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/dekij1981/playwright-automation-framework.git
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Running Tests

Run all tests

```bash
npm test
```

Run in headed mode

```bash
npm run test:headed
```

Run in Playwright UI Mode

```bash
npm run test:ui
```

TypeScript validation

```bash
npm run typecheck
```

Format the project

```bash
npm run format
```

Check formatting

```bash
npm run format:check
```

---

# Reports

After test execution you can open the latest Playwright HTML Report:

```bash
npm run report
```

---

# Current Test Coverage

## User Authentication

- Login with valid credentials
- Login with invalid credentials

## User Registration

- Successful user registration

## Contact Us

- Submit Contact Us form successfully

---

# Roadmap

This repository is currently being refactored step by step to become a production-style Playwright automation framework.

Upcoming improvements include:

- Refactor Playwright configuration
- Improve Page Object architecture
- Shared Components
- Typed Test Data Models
- Environment validation
- API Client
- API Automation
- API-assisted UI tests
- Smoke suite
- Regression suite
- GitHub Actions improvements
- ESLint
- Advanced reporting
- Network mocking
- Visual testing
- Accessibility testing

---

# Project Status

**Current Version**

```
v1.0.0 (Work in Progress)
```

The framework is actively evolving through incremental refactoring, with every architectural decision documented and committed separately.

---

# Author

**Dejan Jovanovic**

Senior QA Automation Engineer

GitHub

https://github.com/dekij1981

---

# License

MIT License
