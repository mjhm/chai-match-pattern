'use strict';

var matchPattern = require('lodash-match-pattern');

var chaiMatchPattern = function (_chai, utils) {
  var Assertion = _chai.Assertion;

  function assertMatchPattern(pattern) {
    var obj = this._obj;
    var check = matchPattern(obj, pattern);

    this.assert(
      !check,
      check,
      'expected #{this} to not match the given pattern',
      obj
    );
  }

  Assertion.addMethod('matchPattern', assertMatchPattern);

  var lodashModule = matchPattern.getLodashModule()

  Object.keys(lodashModule).forEach(function (fname) {
    if (/^is\w/.test(fname)) {
      Assertion.addMethod(fname, function () {
        var argArray = Array.prototype.slice.call(arguments);
        var isArgs = [this._obj].concat(argArray);
        var check = lodashModule[fname].apply(lodashModule, isArgs);
        var fnStr = '"_.' + fname + '(' + ['testVal'].concat(argArray).join(',') + ')"';
        this.assert(
          check,
          'expected testVal=#{this} to pass ' + fnStr,
          'expected testVal=#{this} to fail ' + fnStr
        );
      });
    }
  });

};

chaiMatchPattern.use = matchPattern.use.bind(matchPattern)
chaiMatchPattern.getLodashModule = matchPattern.getLodashModule.bind(matchPattern)

module.exports = chaiMatchPattern
