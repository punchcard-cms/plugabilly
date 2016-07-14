import test from 'ava';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';

import meta from '../lib/meta';
import expected from './_modules';

test('get packages - no locals', t => {
  const modules = meta();

  t.deepEqual(modules, expected, 'All node modules included');

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

  const expectedWithLocals = _.cloneDeep(expected).concat(locals);

  // Same number of modules
  t.is(modules.length, expectedWithLocals.length, 'All node modules and local modules included');

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
