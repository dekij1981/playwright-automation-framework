Feature: Checkout Process
  As a user
  I want to complete a purchase
  So that I can receive the products I want

  Scenario: Successful checkout with valid payment details
    Given I have added items to my cart
    And I am on the checkout page
    When I enter valid payment details
    And I confirm the purchase
    Then I should see a confirmation message
    And I should receive an order confirmation email

  Scenario: Unsuccessful checkout with invalid payment details
    Given I have added items to my cart
    And I am on the checkout page
    When I enter invalid payment details
    And I confirm the purchase
    Then I should see an error message indicating payment failure