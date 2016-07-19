'use strict'; // eslint-disable-line strict

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const localPath = path.join(__dirname, 'fixtures', 'modules');
const locals = fs.readdirSync(localPath).filter(module => {
  if (module.charAt(0) === '.') {
    return false;
  }

  try {
    fs.statSync(path.join(__dirname, 'fixtures', 'modules', module, 'package.json'));

    return true;
  }
  catch (e) {
    return false;
  }
}).map(module => {
  const pth = path.join(__dirname, 'fixtures', 'modules', module);

  // Disabling require linter to allow us to require the package file
  return {
    path: pth,
    package: require(path.join(pth, 'package.json')), // eslint-disable-line global-require
  };
});

const nodeModules = fs.readdirSync('../node_modules').filter(module => {
  if (module.charAt(0) === '.') {
    return false;
  }

  try {
    fs.statSync(path.join(__dirname, '..', 'node_modules', module, 'package.json'));

    return true;
  }
  catch (e) {
    return false;
  }
}).map(module => {
  const pth = path.join(__dirname, '..', 'node_modules', module);

  // Disabling require linter to allow us to require the package file
  return {
    path: pth,
    package: require(path.join(pth, 'package.json')), // eslint-disable-line global-require
  };
});

module.exports.node = nodeModules;

module.exports.local = _.cloneDeep(nodeModules).concat(locals);
