Feature: User Login
  As a user
  I want to log into the webshop
  So that I can access my account and make purchases

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the homepage
    And I should see a welcome message

  Scenario: Unsuccessful login with invalid credentials
    Given I am on the login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message