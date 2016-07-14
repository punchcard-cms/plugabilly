'use strict';

const _ = require('lodash');

//////////////////////////////
// contains, is, isNot, doesNotContain, exists, matches
//
// Include
//////////////////////////////
const addModule = (results, pkg) => {
  const modules = results;

  try {
    // Disabling require linter to allow us to require the actual module; ya know, the point of Plugabilly
    modules[pkg.package.name] = require(pkg.path); // eslint-disable-line global-require
  }
  catch (e) {
    if (!results.hasOwnProperty('__unrequireable')) {
      modules.__unrequireable = [];
    }
    modules.__unrequireable.push(pkg.package.name);
  }

  return modules;
};

module.exports = function filter(modules, key) {
  const packages = _.cloneDeep(modules);

  /**
    * Contains
    *
    * @param {string} search - The string to search for
    *
    * @returns {object} - list of modules;
  **/
  this.containsSync = (search) => {
    let results = {};
    packages.forEach(pkg => {
      if (_.get(pkg, `package.${key}`, '').indexOf(search) >= 0) {
        results = addModule(results, pkg);
      }
    });

    return _.cloneDeep(results);
  };

  /**
    * Does Not Contains
    *
    * @param {string} search - The string to search for
    *
    * @returns {object} - list of modules;
  **/
  this.doesNotContainSync = (search) => {
    let results = {};
    packages.forEach(pkg => {
      if (_.get(pkg, `package.${key}`, '').indexOf(search) < 0) {
        results = addModule(results, pkg);
      }
    });

    return _.cloneDeep(results);
  };

  /**
    * Is Equal To
    *
    * @param {string} search - The string to search for
    *
    * @returns {object} - list of modules;
  **/
  this.isSync = (search) => {
    let results = {};
    packages.forEach(pkg => {
      if (_.get(pkg, `package.${key}`, '') === search) {
        results = addModule(results, pkg);
      }
    });

    return _.cloneDeep(results);
  };

  /**
    * Is Not Equal To
    *
    * @param {string} search - The string to search for
    *
    * @returns {object} - list of modules;
  **/
  this.isNotSync = (search) => {
    let results = {};
    packages.forEach(pkg => {
      if (_.get(pkg, `package.${key}`, '') !== search) {
        results = addModule(results, pkg);
      }
    });

    return _.cloneDeep(results);
  };

  Object.keys(this).forEach(fltr => {
    this[fltr.replace('Sync', '')] = (search) => {
      return new Promise((resolve, reject) => {
        try {
          resolve(this[fltr](search));
        }
        catch (e) {
          reject(e);
        }
      });
    };
  });
};
