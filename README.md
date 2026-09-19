# Playwright TypeScript Automation Framework

[![Playwright CI](https://github.com/dekij1981/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/dekij1981/playwright-automation-framework/actions/workflows/playwright.yml)

A production-style test automation framework built with **Playwright** and **TypeScript**.

The project demonstrates maintainable UI test automation architecture, reusable Page Objects, custom fixtures, typed test data, environment-based configuration, automated CI execution, Docker support, and HTML test reporting.

The framework is developed incrementally with a focus on clean architecture, test stability, maintainability, and real-world QA engineering practices.

## Live Test Report

The latest Playwright HTML report from the `main` branch is published automatically through GitHub Pages:

**[View latest Playwright report](https://dekij1981.github.io/playwright-automation-framework/)**

---

## Features

- ✅ Playwright Test Runner
- ✅ TypeScript
- ✅ Page Object Model
- ✅ Custom Playwright Fixtures
- ✅ Typed Test Data Models
- ✅ Dynamic Test Data Generation
- ✅ Environment Configuration
- ✅ Parallel Test Execution
- ✅ Retry Strategy for CI
- ✅ HTML Reports
- ✅ Trace, Screenshot and Video on Failure
- ✅ Prettier
- ✅ ESLint
- ✅ TypeScript Static Type Checking
- ✅ GitHub Actions CI
- ✅ Automated Quality Gates
- ✅ GitHub Pages Report Publishing
- ✅ Docker Support
- 🚧 API Automation
- 🚧 Smoke and Regression Suites
- 🚧 Network Mocking
- 🚧 Visual Testing
- 🚧 Accessibility Testing

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Playwright | UI and E2E test automation |
| TypeScript | Test development and type safety |
| Node.js | JavaScript runtime |
| GitHub Actions | Continuous Integration |
| GitHub Pages | Playwright report publishing |
| Docker | Reproducible test execution environment |
| ESLint | Static code analysis |
| Prettier | Code formatting |

---

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── src/
│   ├── data/
│   │   ├── registration.ts
│   │   └── users.ts
│   │
│   ├── fixtures/
│   │   └── page-objects.ts
│   │
│   ├── pages/
│   │   ├── AccountInfoPage.ts
│   │   ├── ContactUsPage.ts
│   │   ├── HomePage.ts
│   │   └── SignupLoginPage.ts
│   │
│   ├── tests/
│   │   ├── ContactUs.spec.ts
│   │   ├── LoginTest.spec.ts
│   │   └── RegisterUserTest.spec.ts
│   │
│   └── utils/
│
├── .dockerignore
├── .env.example
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── Dockerfile
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md