'use strict';

import test from 'ava';
import path from 'path';
import _ from 'lodash';
import meta from '../lib/meta';
import process from 'child_process';
import Promise from 'bluebird';


// test skipped - needs to be upgraded to work with current npm flat install structure
test.skip('get packages', t => {
  var modules = meta();
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

test('get packages', t => {
  
  var modules = meta({search: [path.join(__dirname, './fixtures/modules')]});
  // Each module has path, package, and package's name
  modules.forEach(function (module) {
    t.true(module.hasOwnProperty('path'));
    t.true(module.hasOwnProperty('package'));
    t.true(module.package.hasOwnProperty('name'));
  });
  let modA = path.join(__dirname, './fixtures/modules', 'module-a');
  let modB = path.join(__dirname, './fixtures/modules', 'module-b');
  let modC = path.join(__dirname, './fixtures/modules', 'module-c');

  t.true(_.includes(JSON.stringify(modules), modA), 'Module A is captured');
  t.true(_.includes(JSON.stringify(modules), modB), 'Module B is captured');
  t.true(_.includes(JSON.stringify(modules), modC), 'Module C is captured');
});