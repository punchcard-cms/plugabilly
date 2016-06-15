'use strict';

const meta = require('./lib/meta');
const ModuleFilter = require('./lib/filter');

function plugabilly(config) {
  var _modules = meta(config);

  var plug = {
    modules: _modules
  }

  /**
    * Keyword
  **/
  plug.keywords = () => {
    return new ModuleFilter(_modules, 'keywords');
  }

  /**
    * Name
  **/
  plug.name = () => {
    return new ModuleFilter(_modules, 'name');
  }

  /**
    * Attribute
  **/
  plug.attribute = (attr) => {
    return new ModuleFilter(_modules, attr);
  }

  return plug;
}

module.exports = plugabilly;
