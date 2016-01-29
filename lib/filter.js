'use strict';

//////////////////////////////
// contains, is, isNot, doesNotContain, exists, matches
//
// Include
//////////////////////////////
const addModule = function (results, pkg) {
  try {
    results[pkg.package.name] = require(pkg.package.name);
  }
  catch (e) {
    if (!results.hasOwnProperty('__unrequireable')) {
      results.__unrequireable = [];
    }
    results.__unrequireable.push(pkg.package.name);
  }
  return results;
}

module.exports = function ModuleFilter(packages, key) {
  /**
    * Contains
  **/
  this.containsSync = (search) => {
    var results = {};
    packages.forEach(pkg => {
      if (pkg.package[key] && pkg.package[key].indexOf(search) >= 0) {
        results = addModule(results, pkg);
      }
    });
    return results;
  };

  /**
    * Does Not Contains
  **/
  this.doesNotContainSync = (search) => {
    var results = {};
    packages.forEach(pkg => {
      if (pkg.package[key] && pkg.package[key].indexOf(search) < 0) {
        results = addModule(results, pkg);
      }
    });
    return results;
  };

  /**
    * Is Equal To
  **/
  this.isSync = (search) => {
    var results = {};
    packages.forEach(pkg => {
      if (pkg.package[key] && pkg.package[key] === search) {
        results = addModule(results, pkg);
      }
    });
    return results;
  };

  /**
    * Is Not Equal To
  **/
  this.isNotSync = (search) => {
    var results = {};
    packages.forEach(pkg => {
      if (pkg.package[key] && pkg.package[key] !== search) {
        results = addModule(results, pkg);
      }
    });
    return results;
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
}
