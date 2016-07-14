import test from 'ava';
import path from 'path';
import _ from 'lodash';
import meta from '../lib/meta';
import process from 'child_process';
import Promise from 'bluebird';


// test skipped - needs to be upgraded to work with current npm flat install structure
test.skip('get packages', t => {
  const modules = meta();
  const exec = Promise.promisify(process.exec);

  return exec('npm ls --json --depth=0 --long').then(stdout => {
    const expected = JSON.parse(stdout);

    // Same number of items returned as are available at to-level node
    t.same(modules.length, Object.keys(expected.dependencies).length);

    // Each module has path, package, and package's name
    modules.forEach(module => {
      t.true(module.hasOwnProperty('path'));
      t.true(module.hasOwnProperty('package'));
      t.true(module.package.hasOwnProperty('name'));
    });
  });
});

test('get packages', t => {
  const modules = meta({ search: [path.join(__dirname, './fixtures/modules')] });
  const modA = path.join(__dirname, './fixtures/modules', 'module-a');
  const modB = path.join(__dirname, './fixtures/modules', 'module-b');
  const modC = path.join(__dirname, './fixtures/modules', 'module-c');

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
