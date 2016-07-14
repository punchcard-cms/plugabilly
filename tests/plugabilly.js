import test from 'ava';

import plugabilly from '../index';
import compare from './_util';

const plugins = plugabilly();

//////////////////////////////
// Keywords
//////////////////////////////
test('keywords (Sync)', t => {
  const results = plugins.keywords().containsSync('runner');

  compare(results, 'keywords', 'contains', 'runner', t);
});

test('keywords (Async)', t => {
  return plugins.keywords().contains('runner', results => {
    compare(results, 'keywords', 'contains', 'runner', t);
  });
});


//////////////////////////////
// Keywords
//////////////////////////////
test('name (Sync)', t => {
  const results = plugins.name().containsSync('over');

  compare(results, 'name', 'contains', 'over', t);
});

test('name (Async)', t => {
  return plugins.name().contains('over', results => {
    compare(results, 'name', 'contains', 'over', t);
  });
});


//////////////////////////////
// Attribute
//////////////////////////////
test('attribute, known (Sync)', t => {
  const results = plugins.attribute('name').containsSync('over');

  compare(results, 'name', 'contains', 'over', t);
});

test('attribute, known (Async)', t => {
  return plugins.attribute('name').contains('over', results => {
    compare(results, 'name', 'contains', 'over', t);
  });
});

test('attribute, unknown (Sync)', t => {
  const results = plugins.attribute('foo').containsSync('over');

  compare(results, 'foo', 'contains', 'over', t);
});

test('attribute, unknown (Async)', t => {
  return plugins.attribute('foo').contains('over', results => {
    compare(results, 'foo', 'contains', 'over', t);
  });
});
