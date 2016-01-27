'use strict';

const Promise = require('bluebird');
const exec = require('child_process').exec;

/**
  * Gathers all require-able Node modules
  * @module meta
  *
  * @returns {Promise<object>} A Promise that returns an object containing node_module names and meta information about those node_modules, including their `package.json` information
**/
var meta = function () {
  return new Promise(function (resolve, reject) {
    exec('npm ls --json --depth=0 --long', function (err, stdout) {
      var results;
      var modules = [];

      if (err) {
        reject(err);
      }

      results = JSON.parse(stdout);
      Object.keys(results.dependencies).forEach(function (dep) {
        dep = results.dependencies[dep];
        modules.push({
          path: dep.path,
          package: dep
        });
      });
      resolve(modules);
    });
  });
};

module.exports = meta;
