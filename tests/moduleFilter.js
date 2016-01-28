'use strict';

import test from 'ava';
import ModuleFilter from '../lib/filter';
import modules from './_modules';

//////////////////////////////
// Contains
//////////////////////////////
test('containsSync - String', t => {
  var results = new ModuleFilter(modules, 'name').containsSync('over');
  t.is(Object.keys(results).length, 1);
  t.same(Object.keys(results), ['coveralls']);
});

test('containsSync - Array', t => {
  var results = new ModuleFilter(modules, 'keywords').containsSync('test');
  t.is(Object.keys(results).length, 2);
  t.same(Object.keys(results), ['ava', 'tap-diff']);
});

test('contains - String', t => {
  new ModuleFilter(modules, 'name').contains('over').then(results => {
    t.is(Object.keys(results).length, 1);
    t.same(Object.keys(results), ['coveralls']);
  });
});

test('contains - Array', t => {
  new ModuleFilter(modules, 'keywords').contains('test').then(results => {
    t.is(Object.keys(results).length, 2);
    t.same(Object.keys(results), ['ava', 'tap-diff']);
  });
});

//////////////////////////////
// Does Not Contain
//////////////////////////////
test('doesNotContainSync - String', t => {
  var results = new ModuleFilter(modules, 'name').doesNotContainSync('over');
  t.is(Object.keys(results).length, 7);
  t.same(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test('doesNotContainSync - Array', t => {
  var results = new ModuleFilter(modules, 'keywords').doesNotContainSync('test');
  t.is(Object.keys(results).length, 6);
  t.same(Object.keys(results), ['bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc']);
});

test('doesNotContain - String', t => {
  new ModuleFilter(modules, 'name').doesNotContain('over').then(results => {
    t.is(Object.keys(results).length, 7);
    t.same(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});

test('doesNotContain - Array', t => {
  new ModuleFilter(modules, 'keywords').doesNotContain('test').then(results => {
    t.is(Object.keys(results).length, 6);
    t.same(Object.keys(results), ['bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc']);
  });
});

//////////////////////////////
// Is Equal To
//////////////////////////////
test('isSync - String (not found)', t => {
  var results = new ModuleFilter(modules, 'name').isSync('over');
  t.is(Object.keys(results).length, 0);
  t.same(Object.keys(results), []);
});

test('isSync - String (found)', t => {
  var results = new ModuleFilter(modules, 'name').isSync('coveralls');
  t.is(Object.keys(results).length, 1);
  t.same(Object.keys(results), ['coveralls']);
});

test('isSync - String (found, unrequireable)', t => {
  var results = new ModuleFilter(modules, 'name').isSync('jsdoc');
  t.is(Object.keys(results).length, 1);
  t.same(Object.keys(results), ['__unrequireable']);
});

test('is - String (not found)', t => {
  new ModuleFilter(modules, 'name').is('over').then(results => {
    t.is(Object.keys(results).length, 0);
    t.same(Object.keys(results), []);
  });
});

test('is - String (found)', t => {
  new ModuleFilter(modules, 'name').is('coveralls').then(results => {
    t.is(Object.keys(results).length, 1);
    t.same(Object.keys(results), ['coveralls']);
  });
});

test('is - String (found, unrequireable)', t => {
  new ModuleFilter(modules, 'name').is('jsdoc').then(results => {
    t.is(Object.keys(results).length, 1);
    t.same(Object.keys(results), ['__unrequireable']);
    t.same(results.__unrequireable, ['jsdoc']);
  });
});

//////////////////////////////
// Is Not Equal To
//////////////////////////////
test('isNotSync - String (not found)', t => {
  var results = new ModuleFilter(modules, 'name').isNotSync('over');
  t.is(Object.keys(results).length, 8);
  t.same(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test('isNotSync - String (found)', t => {
  var results = new ModuleFilter(modules, 'name').isNotSync('coveralls');
  t.is(Object.keys(results).length, 7);
  t.is(Object.keys(results).length, 7);
  t.same(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test('isNotSync - String (found, unrequireable)', t => {
  var results = new ModuleFilter(modules, 'name').isNotSync('jsdoc');
  t.is(Object.keys(results).length, 7);
  t.same(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
});

test('isNot - String (not found)', t => {
  new ModuleFilter(modules, 'name').isNot('over').then(results => {
    t.is(Object.keys(results).length, 8);
    t.same(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});

test('isNot - String (found)', t => {
  new ModuleFilter(modules, 'name').isNot('coveralls').then(results => {
    t.is(Object.keys(results).length, 7);
    t.same(Object.keys(results), ['ava', 'bluebird', 'eslint', '__unrequireable', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});

test('isNot - String (found, unrequireable)', t => {
  new ModuleFilter(modules, 'name').isNot('jsdoc').then(results => {
    t.is(Object.keys(results).length, 7);
    t.same(Object.keys(results), ['ava', 'bluebird', 'coveralls', 'eslint', 'eslint-config-xo-space', 'nyc', 'tap-diff']);
  });
});
