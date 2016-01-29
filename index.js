'use strict';

const meta = require('./lib/meta');
const ModuleFilter = require('./lib/filter');

// Plugabilly
//
// Main interface for Plugabilly. Grabs all available Node modules via [meta](meta.html). Makes all module available to the end user, as well as the [search methods](https://github.com/Snugug/plugabilly#search-methods) for searching and filtering the results.
function plugabilly() {
  var _modules = meta();

  var plug = {
    modules: _modules
  }

  // Keywords
  //
  // [Search Method](https://github.com/Snugug/plugabilly#search-methods) for searching through keywords.
  //
  // **Parameters**
  //
  // | Parameter | Type   | Description |
  // | :-------: |:------:| :----------:|
  // | none      | - | - |
  //
  // **Return**
  //
  // Returns [filter methods](filter.html) filtered by the `keywords` attribute.
  //
  // To use: `plugabilly().keywords()`
  plug.keywords = () => {
    return new ModuleFilter(_modules, 'keywords');
  }

  // Name
  //

  //
  // **Parameters**
  //
  // | Parameter | Type   | Description |
  // | :-------: |:------:| :----------:|
  // | none      | - | - |
  //
  // **Return**
  //
  // Returns [filter methods](filter.html) filtered by the `name` attribute.
  //
  // To use: `plugabilly().name()`
  plug.name = () => {
    return new ModuleFilter(_modules, 'name');
  }

  // Attribute
  //
  // [Search Method](https://github.com/Snugug/plugabilly#search-methods) for searching a provided attribute.
  //
  // **Parameters**
  //
  // | Parameter | Type   | Description |
  // | :-------: |:------:| :----------:|
  // | attr      | string | name of attribute to search |
  //
  // **Return**
  //
  // Returns [filter methods](filter.html) filtered by the provided attribute.
  //
  // To use: `plugabilly().name()`
  plug.attribute = (attr) => {
    return new ModuleFilter(_modules, attr);
  }

  return plug;
}

module.exports = plugabilly;
