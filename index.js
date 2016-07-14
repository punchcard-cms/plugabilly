'use strict';

const meta = require('./lib/meta');
const ModuleFilter = require('./lib/filter');

const plugabilly = (config) => {
  const _modules = meta(config);

  const plug = {
    modules: _modules,
  };

  /**
    * Keyword
    *
    * @returns {object} - filtered list of required modules based on keywords
  **/
  plug.keywords = () => {
    return new ModuleFilter(_modules, 'keywords');
  };

  /**
    * Name
    *
    * @returns {object} - filtered list of required modules based on name;
  **/
  plug.name = () => {
    return new ModuleFilter(_modules, 'name');
  };

  /**
    * Attribute
    *
    * @param {string} attr - Attribute to filter on
    *
    * @returns {object} - filtered list of required module names based on attribute
  **/
  plug.attribute = (attr) => {
    return new ModuleFilter(_modules, attr);
  };

  return plug;
};

module.exports = plugabilly;
