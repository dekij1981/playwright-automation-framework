# Playwright Automation Style Guide

This document defines the core guidelines, architectural principles, and naming conventions for writing high-quality, maintainable E2E automation tests using Playwright and TypeScript.

---

## 1. Locator Strategy
* **Prioritize User-First Locators:** Always prefer Playwright's built-in accessibility locators (`getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`) as they simulate real user interactions and make tests resilient to UI changes.
* **Use Dedicated QA Attributes:** When user-first locators are not feasible, use stable, dedicated test attributes (e.g., `[data-qa="..."]`, `[data-testid="..."]`).
* **Fallback to CSS:** Use clean CSS selectors only as a last resort when semantic locators or custom QA attributes are unavailable. Avoid XPath entirely.

---

## 2. Naming Conventions
* **CamelCase Style:** Use `camelCase` for all variable names, function names, instances, and class methods (e.g., `contactUsPage`, `submitForm()`, `verifyTitle()`).
* **PascalCase Style:** Use `PascalCase` for class names, interfaces, and types (e.g., `HomePage`, `ContactUsPage`, `UserData`).
* **Descriptive Test Titles:** Write test case names and `test.step` descriptions in plain English, clearly stating the action or expected outcome.

---

## 3. Architecture & Folder Structure
Follow the principles of Clean Architecture and encapsulation. Code must be organized into distinct, modular directories within the project root:

* `tests/` – Clean spec files containing only test steps, assertions, and fixtures (no direct element selectors).
* `pages/` – Page Object Model (POM) classes encapsulating locators and page-specific actions.
* `utils/` – Reusable helpers, API clients, and common utility functions.
* `fixtures/` – Custom Playwright fixtures to automatically inject POM instances and dependencies into tests.
* `data/` – Static test resources, JSON files, or data generators (e.g., Faker.js setups).
* `config/` – Environment-specific configurations and global setup settings.

---

## 4. Stability & Best Practices
* **Strict TypeScript:** Maintain strict typing across the entire framework. The use of `any` is strictly prohibited.
* **Web-First Assertions:** Use auto-waiting assertions (e.g., `await expect(page).toHaveURL()`, `await expect(locator).toBeVisible()`) to eliminate flaky execution and race conditions.
* **No Hardcoded Pauses:** Avoid hardcoded waiting mechanisms like `page.waitForTimeout()`. Rely entirely on Playwright's smart auto-waiting and network event listeners.
* **Enforce Clean Execution Tools:** Utilize native framework features including fixtures, hooks (`beforeEach`, `afterEach`), automatic retries, network traces, and failure screenshots via the global configuration.

---

## 5. Maintainability & Code Quality
* **DRY Principle:** Keep the codebase clean, highly readable, and free of duplication. Abstract repeating patterns into reusable utilities or base components.
* **Production-Ready Standards:** Every script, component, and configuration file must adhere to modern coding standards, passing local linting (`eslint`) and formatting (`prettier`) checks prior to deployment.