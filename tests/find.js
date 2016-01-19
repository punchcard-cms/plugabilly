'use strict';

import test from 'ava';
import find from '../lib/find';
import path from 'path';

test('file: current directory', t => {
  var file = find.file('find.js');
  var expected = path.join(process.cwd(), 'find.js');

  t.same(file, expected);
});

test('file: upper directory', t => {
  var file = find.file('package.json');
  var expected = path.join(process.cwd(), '..', 'package.json');

  t.same(file, expected);
});

test('file: not found', t => {
  var file = find.file('_foo.bar');
  var expected = null;

  t.same(file, expected);
});

test('directory: current directory', t => {
  var dir = find.dirFromFile('find.js');
  var expected = path.join(process.cwd());

  t.same(dir, expected);
});

test('directory: upper directory', t => {
  var dir = find.dirFromFile('package.json');
  var expected = path.join(process.cwd(), '..');

  t.same(dir, expected);
});
