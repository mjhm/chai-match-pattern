Feature: Basic chai-match-pattern

  Background:
    Given I have a basic user

  Scenario: The user object matches a copy of itself.
    Then the user matches the pattern
    """
    {
      "id": 43,
      "email": "joe@matchapattern.org",
      "website": "http://matchapattern.org",
      "firstName": "Joe",
      "lastName": "Matcher",
      "createDate": "2016-05-22T00:23:23.343Z",
      "tvshows": [
        "Match Game",
        "Sopranos",
        "House of Cards"
      ],
      "mother": {
        "id": 23,
        "email": "mom@aol.com"
      },
      "friends": [
        {"id": 21, "email": "bob@matchpattern.org"},
        {"id": 89, "email": "jerry@matchpattern.org"},
        {"id": 14, "email": "dan@matchpattern.org"}
      ]
    }
    """

  Scenario: The user object matches it property types.
    Then the user matches the pattern
    """
    {
      "id": "_.isInteger",
      "email": "_.isEmail",
      "website": "_.isUrl",
      "firstName": "_.isStartCase",
      "lastName": "_.isString",
      "createDate": "_.isDateString",
      "tvshows": [
        "_.isString",
        "_.isString",
        "_.isString"
      ],
      "mother": "_.isObject",
      "friends": "_.isArray"
    }
    """
