'use strict';

const path = require('path');
const fs = require('fs');
const exec = require('child_process').execSync;

/**
  * Gathers all require-able Node modules
  * @module meta
  *
  * @param {object} config - Configuration object
  *
  * @returns {array} A Array of `require`-able Node modules as an object containing their paths and their `package.json` information
**/
const meta = config => {
  const search = config ? (config.search || []) : [];
  const npm = exec('npm root').toString().trim();
  let npmModules = [];

  search.push(npm);

  search.forEach(s => {
    const dirs = fs.readdirSync(s).filter(module => {
      if (module.charAt(0) === '.') {
        return false;
      }

      return true;
    }).map(module => {
      return path.join(s, module);
    });

    npmModules = npmModules.concat(dirs);
  });

  const modules = npmModules.filter(module => {
    try {
      fs.statSync(path.join(module, 'package.json'));

      return true;
    }
    catch (e) {
      return false;
    }
  }).map(module => {
    // Disabling require linter to allow us to require the package file
    return {
      path: module,
      package: require(path.join(module, 'package.json')), // eslint-disable-line global-require
    };
  });

  return modules;
};

module.exports = meta;
