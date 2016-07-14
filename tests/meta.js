import test from 'ava';
import path from 'path';
import _ from 'lodash';

import meta from '../lib/meta';
import expected from './_modules';

test('get packages - no locals', t => {
  const modules = meta();

  t.deepEqual(modules, expected.node, 'All node modules included');

  // Each module has path, package, and package's name
  modules.forEach(module => {
    t.true(module.hasOwnProperty('path'));
    t.true(module.hasOwnProperty('package'));
    t.true(module.package.hasOwnProperty('name'));
  });
});

test('get packages - locals', t => {
  const localPath = path.join(__dirname, 'fixtures', 'modules');
  const modules = meta({ search: [localPath] });

  const modA = path.join(__dirname, './fixtures/modules', 'module-a');
  const modB = path.join(__dirname, './fixtures/modules', 'module-b');
  const modC = path.join(__dirname, './fixtures/modules', 'module-c');

  // Same number of modules
  t.is(modules.length, expected.local.length, 'All node modules and local modules included');

  // Each module has path, package, and package's name
  modules.forEach(module => {
    t.true(module.hasOwnProperty('path'));
    t.true(module.hasOwnProperty('package'));
    t.true(module.package.hasOwnProperty('name'));
  });

  t.true(_.includes(JSON.stringify(modules), modA), 'Module A is captured');
  t.true(_.includes(JSON.stringify(modules), modB), 'Module B is captured');
  t.true(_.includes(JSON.stringify(modules), modC), 'Module C is captured');
});
