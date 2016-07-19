# Plugabilly [![Build Status](https://travis-ci.org/punchcard-cms/plugabilly.svg?branch=master)](https://travis-ci.org/punchcard-cms/plugabilly) [![Coverage Status](https://coveralls.io/repos/github/punchcard-cms/plugabilly/badge.svg?branch=master)](https://coveralls.io/github/punchcard-cms/plugabilly?branch=master)

![Pugabilly](https://cdn.rawgit.com/Snugug/plugabilly/dd9a7e3dd8fbfc3ffbbefa450e9aba50b07c6334/pugabilly.svg)

(It's a Pug Rockabilly, or a Pugabilly)

A way to dynamically load plugins with specific characteristic in to your project. Good for having an ecosystem of extensions/plugins distributed as NPM modules that can be automatically loaded by a main project.

## Installing

```bash
npm install plugabilly --save-dev
```

Plugabilly requires Node 4.x+

## Usage

Quick Sample Usage

```javascript
const plugabilly = require('plugabilly');

// Sync
const plugins = plugabilly().search().filterSync('match');

// Async
plugabilly().search().filter('match', plugins => {
  
});
```

### In-Depth Usage

Everything starts by calling `plugabilly()`. This will get a list of 0-depth dependencies that can be `require`d by your project. From there, there are [search](#search-methods) and [filter](#filter-methods) methods that can be chained off of `plugabilly()` to get the exact list of modules you need.

#### Search Methods

There are three search methods; `keywords()`, `name()`, and `attribute(attr)`. `keywords()` and `name()` have no arguments, and will set your search to the module's `keywords` and `name` attributes in their `package.json` respectively. The `attribute(attr)` method takes a string that is the name of the attribute in the module's `package.json` you'd like to search. Currently, only String and Array attributes are supported.

#### Filter Methods

There are four filter methods: `contains(search)`, `doesNotContain(search)`, `is(search)`, `isNot(search)`. All filter methods are by default asynchronous and return a Promise with the results. You can append `Sync` to the end of each method to get the synchronous version (`containsSync`, `isNotSync`, etc…).

* `contains(search|String)` - **String|Array** Determines if the search query is contained within the [search method](#search-methods) parameter and return all modules for which that is `true`. For strings, it will find the search query anywhere within the string. For arrays, it will see determine if the exact search query exists within the array.
* `doesNotContain(search|String)` - **String|Array** Determines if the search query is contained within the [search method](#search-methods) parameter and return all modules for which that is `false`. For strings, it will find the search query anywhere within the string. For arrays, it will see determine if the exact search query exists within the array.
* `is(search|String)` - **String** Determines if the search query is equal to the [search method](#search-methods) parameter and will return all modules for which that is `true`. Only works for search methods that are of type string.
* `isNot(search|String)` - **String** Determines if the search query is equal to the [search method](#search-methods) parameter and will return all modules for which that is `false`. Only works for search methods that are of type string.

### Results

The results of a Plugabilly search will be an object where each *key* is the `name` of a module found that matches the [search](#search-methods) and [filter](#filter-methods) methods requested and that key's *value* is the result of `require`-ing that module. All modules that match the search and filter criteria but cannot be `require`d will be added to a key `__unrequireable` whose value is an array of the names of said modules.

**Input**

```javascript
const plugabilly = require('plugabilly');

const plugins = plugabilly().name().contains('gulp-');

// plugins['gulp-sass-lint']() to use one of the required functions
```

**Results**

```json
{
  "gulp-sass-lint": function[Function],
  "gulp-sass": function[Function],
  "__unrequireable": [
    "not-really-a-gulp-plugin"
  ]
}
```
