
'use strict';

var chai = require('chai');
var expect = chai.expect;
var _ = require('lodash-checkit');
var chaiMatchPattern = require('../');
chai.use(chaiMatchPattern);

describe('chai-match-pattern', function () {
  describe('basic pattern match', function () {
    it('matches {a: 2, b: 2} with itself', function () {
      var testObj = {a: 2, b: 2};
      expect(testObj).to.matchPattern(testObj);
    });

    it('matches {a: 2, b: 2} with pattern {a: 2, b: "_.isBetween:1:3"}', function () {
      var testObj = {a: 2, b: 2};
      var pattern = {a: 2, b: "_.isBetween:1:3"}
      expect(testObj).to.matchPattern(pattern);
    });

    it('does not match {a: 2, b: 2} with pattern {a: 2, b: "_.isBetween:2:3"}', function () {
      var testObj = {a: 2, b: 2};
      var pattern = {a: 2, b: "_.isBetween:2:3"}
      expect(testObj).not.to.matchPattern(pattern);
    });
  });

  describe('standalone isXxx assertions', function () {
    it('2 isBetween(1, 3) succeeds', function () {
      expect(2).isBetween(1,3);
    });
    it('1 isBetween(1, 3) throws', function () {
      var fn = function () {
        expect(1).isBetween(1,3);
      }
      expect(fn).to.throw('expected testVal=1 to pass "_.isBetween(testVal,1,3)"');
    });

    it('2 not.isBetween(1, 3) throws', function () {
      var fn = function () {
        expect(2).not.isBetween(1,3);
      }
      expect(fn).to.throw('expected testVal=2 to fail "_.isBetween(testVal,1,3)"');
    });
  });

  describe('#use (custom lodash module)', function () {
    beforeEach(function () {
      var lodashExt = _.runInContext()
      lodashExt.mixin({
        isSmilie: function (s) {
          return s === ':)';
        }
      });
      chaiMatchPattern.use(lodashExt);
      this.smilie = ':)';
      this.winkie = ';)';
    });

    afterEach(function () {
      chaiMatchPattern.use(_);
    });

    it('succeeds with matching test data', function () {
      expect(this.smilie).to.matchPattern('_.isSmilie')
    });

    it('fails with non-matching test data', function () {
      expect(this.winkie).not.to.matchPattern('_.isSmilie')
    });
  });
});
