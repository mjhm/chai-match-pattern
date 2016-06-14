# chai-match-pattern
[![NPM Version](https://img.shields.io/npm/v/chai-match-pattern.svg)](https://www.npmjs.com/package/chai-match-pattern)
![CircleCI](https://circleci.com/gh/Originate/chai-match-pattern.svg?style=shield&circle-token=:circle-token)
[![David Dependencies](https://david-dm.org/Originate/chai-match-pattern.svg)](https://david-dm.org/Originate/chai-match-pattern)

Related Modules:
[![lodash-match-pattern](https://img.shields.io/npm/v/lodash-match-pattern.svg?label=lodash-match-pattern)](https://www.npmjs.com/package/lodash-match-pattern)
[![lodash-checkit](https://img.shields.io/npm/v/lodash-checkit.svg?label=lodash-checkit)](https://www.npmjs.com/package/lodash-checkit)

This is a Chai plugin for general purpose JavaScript Object pattern matching. It wraps the [`lodash-match-pattern`](https://github.com/originate/lodash-match-pattern) module -- which is built on the [`lodash-checkit`](https://github.com/Originate/lodash-checkit) module,  which itself is a [`lodash`](https://lodash.com/docs) extension which adds validation functionality from the popular [`checkit`](https://github.com/tgriesser/checkit) module.

SEE [`lodash-match-pattern`](https://github.com/originate/lodash-match-pattern) FOR DETAILS ON HOW TO DEFINE PATTERNS TO MATCH.


#### Basic Usage
```
npm install chai-match-pattern --save-dev
```
In your test file insert

```javascript
var chai = require('chai');
var chaiMatchPattern = require('chai-match-pattern');
chai.use(chaiMatchPattern);
var _ = chaiMatchPattern.getLodashModule(); // recommend using our lodash extension
```

Then use patterns to check your JSON with the `.matchPattern(pattern)` assertion function.  For example

```javascript
chai.expect({a: 1, b: 'abc'}).to.matchPattern({a: 1, b: _.isString});
```

Additionally any of the included `isXxxx` functions can be used directly as assertion functions. For example

```javascript
chai.expect(7.5).isBetween(7, 8);
```

Extensive details and examples about how to specify patterns can be found in the [`lodash-match-pattern`](https://github.com/originate/lodash-match-pattern) documentation.
