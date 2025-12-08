Feature: Product Search
  As a user
  I want to search for products
  So that I can find items I want to purchase

  Scenario: Search for an existing product
    Given I am on the homepage
    When I enter "top" in the search bar
    And I click the search button
    Then I should see a list of products related to "top"

  Scenario: Search for a non-existing product
    Given I am on the homepage
    When I enter "unicorn" in the search bar
    And I click the search button
    Then I should see a message indicating no products were found