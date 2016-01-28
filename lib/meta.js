'use strict';

const exec = require('child_process').execSync;

/**
  * Gathers all require-able Node modules
  * @module meta
  *
  * @returns {Array} A Array of `require`-able Node modules as an object containing their paths and their `package.json` information
**/
const meta = function () {
    var npmModules = exec('npm ls --json --depth=0 --long');
    var results;
    var modules = [];

    results = JSON.parse(npmModules);

    Object.keys(results.dependencies).forEach(function (dep) {
      dep = results.dependencies[dep];
      modules.push({
        path: dep.path,
        package: dep
      });
    });
    return modules;
};

module.exports = meta;
