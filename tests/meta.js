'use strict';

import test from 'ava';
import meta from '../lib/meta';
import process from 'child_process';
import Promise from 'bluebird';

test('get packages', t => {
  return meta('..').then(modules => {
    var exec = Promise.promisify(process.exec);
    return exec('npm ls --json --depth=0 --long').then(function (stdout) {
      var expected = JSON.parse(stdout);

      // Same number of items returned as are available at to-level node
      t.same(modules.length, Object.keys(expected.dependencies).length);

      // Each module has path, package, and package's name
      modules.forEach(function (module) {
        t.true(module.hasOwnProperty('path'));
        t.true(module.hasOwnProperty('package'));
        t.true(module.package.hasOwnProperty('name'));
      });
    });
  });
});
