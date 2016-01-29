'use strict';

import test from 'ava';
import plugabilly from '../index';

const plugins = plugabilly();

//////////////////////////////
// Keywords
//////////////////////////////
test('keywords (Sync)', t => {
  var results = plugins.keywords().containsSync('test');
  t.is(Object.keys(results).length, 2);
  t.same(Object.keys(results), ['ava', 'tap-diff']);
});

test('keywords (Async)', t => {
  return plugins.keywords().contains('test', results => {
    t.is(Object.keys(results).length, 2);
    t.same(Object.keys(results), ['ava', 'tap-diff']);
  });
});


//////////////////////////////
// Keywords
//////////////////////////////
test('name (Sync)', t => {
  var results = plugins.name().containsSync('over');
  t.is(Object.keys(results).length, 1);
  t.same(Object.keys(results), ['coveralls']);
});

test('name (Async)', t => {
  return plugins.name().contains('over', results => {
    t.is(Object.keys(results).length, 1);
    t.same(Object.keys(results), ['coveralls']);
  });
});


//////////////////////////////
// Attribute
//////////////////////////////
test('attribute, known (Sync)', t => {
  var results = plugins.attribute('name').containsSync('over');
  t.is(Object.keys(results).length, 1);
  t.same(Object.keys(results), ['coveralls']);
});

test('attribute, known (Async)', t => {
  return plugins.attribute('name').contains('over', results => {
    t.is(Object.keys(results).length, 1);
    t.same(Object.keys(results), ['coveralls']);
  });
});

test('attribute, unknown (Sync)', t => {
  var results = plugins.attribute('foo').containsSync('over');
  t.is(Object.keys(results).length, 0);
  t.same(Object.keys(results), []);
});

test('attribute, unknown (Async)', t => {
  return plugins.attribute('foo').contains('over', results => {
    t.is(Object.keys(results).length, 0);
    t.same(Object.keys(results), []);
  });
});
