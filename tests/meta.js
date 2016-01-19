'use strict';

import test from 'ava';
import meta from '../lib/meta';
import path from 'path';
import glob from 'glob';

test('get packages', t => {
  return meta('..').then(modules => {
    var expected = glob.sync('../node_modules/*').length;

    // Same number of items returned as are available at to-level node
    t.same(modules.length, expected);

    // Each module has path, package, and package's name
    modules.forEach(function (module) {
      t.true(module.hasOwnProperty('path'));
      t.true(module.hasOwnProperty('package'));
      t.true(module.package.hasOwnProperty('name'));
    });
  });
});
