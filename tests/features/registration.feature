Feature: User Registration
  As a new user
  I want to register an account
  So that I can make purchases and track my orders

  Scenario: Successful registration with valid details
    Given I am on the registration page
    When I enter valid registration details
    And I submit the registration form
    Then I should see a welcome message
    And I should receive a confirmation email

  Scenario: Unsuccessful registration with missing details
    Given I am on the registration page
    When I enter incomplete registration details
    And I submit the registration form
    Then I should see an error message indicating missing information

  Scenario: Unsuccessful registration with invalid email
    Given I am on the registration page
    When I enter an invalid email address
    And I submit the registration form
    Then I should see an error message indicating invalid email format