'use strict';

import test from 'ava';
import path from 'path';
import ModuleFilter from '../lib/filter';
import meta from '../lib/meta';
import _ from 'lodash';
import exec from 'child_process';

//import modules from './_modules';

const modules = meta();
const modulesLocal = meta({search: [path.join(__dirname, './fixtures/modules')]});
//////////////////////////////
// Contains
//////////////////////////////
test('containsSync - String', t => {
  var results = new ModuleFilter(modules, 'name').containsSync('over');
  t.is(Object.keys(results).length, 1);
  t.true(_.isEqual(Object.keys(results).sort(), ['coveralls'].sort()));
});

test('containsSync - Array', t => {
  var results = new ModuleFilter(modules, 'keywords').containsSync('runner');
  t.is(Object.keys(results).length, 2);
  t.true(_.isEqual(Object.keys(results).sort(), ['ava', 'ava-init'].sort()));
});

test('contains - String', t => {
  return new ModuleFilter(modules, 'name').contains('over').then(results => {
    t.is(Object.keys(results).length, 1);
    t.true(_.isEqual(Object.keys(results).sort(), ['coveralls'].sort()));
  });
});

test('contains - Array', t => {
  return new ModuleFilter(modules, 'keywords').contains('runner').then(results => {
    t.is(Object.keys(results).length, 2);
    t.true(_.isEqual(Object.keys(results).sort(), ['ava', 'ava-init'].sort()));
  });
});

test('containsSync - String', t => {
  var results = new ModuleFilter(modulesLocal, 'name').containsSync('dule-c');
  t.is(Object.keys(results).length, 1);
  t.true(_.isEqual(Object.keys(results).sort(), ['module-c'].sort()));
});

test('containsSync - Array', t => {
  var results = new ModuleFilter(modulesLocal, 'keywords').containsSync('runner');
  t.is(Object.keys(results).length, 3);
  t.true(_.isEqual(Object.keys(results).sort(), ['ava', 'ava-init', 'module-b'].sort()));
});

test('contains - String', t => {
  return new ModuleFilter(modulesLocal, 'name').contains('dule-c').then(results => {
    t.is(Object.keys(results).length, 1);
    t.true(_.isEqual(Object.keys(results).sort(), ['module-c'].sort()));
  });
});

test('contains - Array', t => {
  return new ModuleFilter(modulesLocal, 'keywords').contains('runner').then(results => {
    t.is(Object.keys(results).length, 3);
    t.true(_.isEqual(Object.keys(results).sort(), ['ava', 'ava-init', 'module-b'].sort()));
  });
});

//////////////////////////////
// Does Not Contain
//////////////////////////////
test.skip('doesNotContainSync - String', t => {
  var results = new ModuleFilter(modules, 'name').doesNotContainSync('over');
  t.is(Object.keys(results).length, 7);
  t.is(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test.skip('doesNotContainSync - Array', t => {
  var results = new ModuleFilter(modules, 'keywords').doesNotContainSync('test');
  t.is(Object.keys(results).length, 6);
  t.is(Object.keys(results), ['bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc']);
});

test.skip('doesNotContain - String', t => {
  return new ModuleFilter(modules, 'name').doesNotContain('over').then(results => {
    t.is(Object.keys(results).length, 7);
    t.is(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});

test.skip('doesNotContain - Array', t => {
  return new ModuleFilter(modules, 'keywords').doesNotContain('test').then(results => {
    t.is(Object.keys(results).length, 6);
    t.is(Object.keys(results), ['bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc']);
  });
});

//////////////////////////////
// Is Equal To
//////////////////////////////
test.skip('isSync - String (not found)', t => {
  var results = new ModuleFilter(modules, 'name').isSync('over');
  t.is(Object.keys(results).length, 0);
  t.is(Object.keys(results), []);
});

test.skip('isSync - String (found)', t => {
  var results = new ModuleFilter(modules, 'name').isSync('coveralls');
  t.is(Object.keys(results).length, 1);
  t.is(Object.keys(results), ['coveralls']);
});

test.skip('isSync - String (found, unrequireable)', t => {
  var results = new ModuleFilter(modules, 'name').isSync('jsdoc');
  t.is(Object.keys(results).length, 1);
  t.is(Object.keys(results), ['__unrequireable']);
});

test.skip('is - String (not found)', t => {
  return new ModuleFilter(modules, 'name').is('over').then(results => {
    t.is(Object.keys(results).length, 0);
    t.is(Object.keys(results), []);
  });
});

test.skip('is - String (found)', t => {
  return new ModuleFilter(modules, 'name').is('coveralls').then(results => {
    t.is(Object.keys(results).length, 1);
    t.is(Object.keys(results), ['coveralls']);
  });
});

test.skip('is - String (found, unrequireable)', t => {
  return new ModuleFilter(modules, 'name').is('jsdoc').then(results => {
    t.is(Object.keys(results).length, 1);
    t.is(Object.keys(results), ['__unrequireable']);
    t.is(results.__unrequireable, ['jsdoc']);
  });
});

//////////////////////////////
// Is Not Equal To
//////////////////////////////
test.skip('isNotSync - String (not found)', t => {
  var results = new ModuleFilter(modules, 'name').isNotSync('over');
  t.is(Object.keys(results).length, 8);
  t.is(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test.skip('isNotSync - String (found)', t => {
  var results = new ModuleFilter(modules, 'name').isNotSync('coveralls');
  t.is(Object.keys(results).length, 7);
  t.is(Object.keys(results).length, 7);
  t.is(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test.skip('isNotSync - String (found, unrequireable)', t => {
  var results = new ModuleFilter(modules, 'name').isNotSync('jsdoc');
  t.is(Object.keys(results).length, 7);
  t.is(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test.skip('isNot - String (not found)', t => {
  return new ModuleFilter(modules, 'name').isNot('over').then(results => {
    t.is(Object.keys(results).length, 8);
    t.is(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});

test.skip('isNot - String (found)', t => {
  return new ModuleFilter(modules, 'name').isNot('coveralls').then(results => {
    t.is(Object.keys(results).length, 7);
    t.is(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});

test.skip('isNot - String (found, unrequireable)', t => {
  return new ModuleFilter(modules, 'name').isNot('jsdoc').then(results => {
    t.is(Object.keys(results).length, 7);
    t.is(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});
