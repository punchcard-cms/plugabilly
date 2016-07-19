'use strict'; // eslint-disable-line strict

const _ = require('lodash');

const nodeModules = require('./_modules');

const compareTest = (results, prop, compare, value, t, modules) => {
  const expected = modules.filter(module => {
    if (compare === 'contains') {
      if (_.get(module, `package.${prop}`, '').indexOf(value) >= 0) {
        return true;
      }
    }
    else if (compare === 'not contain') {
      if (_.get(module, `package.${prop}`, '').indexOf(value) < 0) {
        return true;
      }
    }
    else if (compare === 'is') {
      if (_.get(module, `package.${prop}`, '') === value) {
        return true;
      }
    }
    else if (compare === 'is not') {
      if (_.get(module, `package.${prop}`, '') !== value) {
        return true;
      }
    }


    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  let item = _.pull(Object.keys(results), '__unrequireable').sort();
  if (results.__unrequireable) {
    item = item.concat(results.__unrequireable).sort();
  }
  const values = _.isEqual(item, expected);

  t.true(values, 'Expected results are the same');
};

module.exports = (results, prop, compare, value, t) => {
  compareTest(results, prop, compare, value, t, nodeModules.node);
};

module.exports.local = (results, prop, compare, value, t) => {
  compareTest(results, prop, compare, value, t, nodeModules.local);
};
