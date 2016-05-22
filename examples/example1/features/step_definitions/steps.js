
var chai = require('chai');
var chaiMatchPattern = require('../../../../../chai-match-pattern');
chai.use(chaiMatchPattern);
var expect = chai.expect

module.exports = function () {
  var self = this;
  self.Given(/^I have a basic user$/, function () {
    self.user = {
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
        {"id": 14, "email": "dan@matchpattern.org"},
      ]
    }
  });

  self.Then(/^the user matches the pattern$/, function (targetPattern) {
    try {
      var targetJson = JSON.parse(targetPattern);
    }
    catch (err) {
      throw new Error("JSON.parse: Can't parse #{targetPattern} " + err.message);
    }
    expect(self.user).to.matchPattern(targetJson);
  });
};
