# chai-match-pattern

This is a general purpose JSON pattern matcher. It leverages the `lodash-match-pattern` module -- which is a `lodash` extension built on the `lodash-checkit` module -- which itself is a mashup of checking utilities from the popular `lodash` and `checkit` modules.  The primary goal of the modules is to enable the highly flexible, expressive, and resilient feature testing of JSON based APIs.

Here are the main features. You probably won't need all of them, but there's enough flexibility the building blocks will allow you to address the details of your specific us cases. All of the examples below are illustrated in the `/examples/example1/features/` as cucumber-js tests.

1. [Deep JSON matching](#deep-json-matching)
1. [Matching property types](#matching-property-types)
1. [Partial objects](#partial_object)
1. [Partial arrays](#partial_array)
1. [Omitted items](#omitted)
1. [Parameterized matchers](#parameterized)
1. [Unsorted arrays](#unsorted)
1. [Composing transforms](#composing)
1. [Multiple matchers](#multiple)
1. [Custom matchers](#custom)
1. [Matchers as Chai assertions](#chai)

## Deep JSON matching

Suppose we have the "joeUser" object below and clone it for the pattern to match: `joeUserClone = _.cloneDeep(joeUser)`. Then `expect(joeUser).to.matchPattern(joeUserClone)` will succeed as expected.
```
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
```
Deep matching of exact JSON patterns creates over specified and brittle feature tests. In practice such deep matches are only useful in small isolated feature tests and some unit tests. Just for example matching the `createDate` of the above user from a database might require some complex mocking of the database to spoof it into a testable exact value. We don't really care about exact date. All we care about is that the date behaves like a date. To this end the `chai-match-pattern` enables a rich and extensible type checking facilities.

## Matching property types

The pattern below may look a little odd at first, but main idea is that every there a bucket full of `_.isXxxx` matchers available from the `lodash` and `checkit` modules along with a few extras.
```
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
```
The available matching functions are
1. All `isXxxx` functions from `lodash`.
1. All validation functions from `checkit` with `is` prepended.
1. Case convention matchers constructed from lodash's `...Case` functions.
1. `isDateString`
1. Any `isXxxx` function you insert as a lodash mixin (see below).

To see the full list run this:
```
console.log(
  Object.keys(require('lodash-match-pattern').getLodashModule())
  .filter(function (fname) { return /^is[A-Z]/.test(fname) })
);
```
