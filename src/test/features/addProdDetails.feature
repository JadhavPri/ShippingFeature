Feature: Conduct image field selection Functionality

  Scenario Outline: Image field Selection for output
    Given I am on the Image field selection page
    When I click on the Next arrow button from the production details page
    And I see Generate images for native files checkbox disabled
    And I click on the field to produce dropdown
    And I select <format> format
    And I see Generate images for native files checkbox enabled
    And I check Generate images for native files checkbox 
    And I add <excludeExtensions> in the Exclude these native file extention checkbox
    And I click on Next button
    Then I get navigated to the Metadat fields selection screen

    Examples:
      | format | excludeExtensions |
      | png    | jpeg,xlsx          |
