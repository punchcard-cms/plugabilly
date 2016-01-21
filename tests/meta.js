'use strict';

import test from 'ava';
import meta from '../lib/meta';
import process from 'child_process';

test('get packages', t => {
  return meta('..').then(modules => {
    process.exec('npm ls --json --depth=0 --long', function (err, stdout) {
      if (err) {
        t.fail(err);
      }
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
