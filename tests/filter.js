import test from 'ava';
import path from 'path';
import _ from 'lodash';

import ModuleFilter from '../lib/filter';
import meta from '../lib/meta';
import nodeModules from './_modules';
import compare from './_util';

// import modules from './_modules';

const modules = meta();

const modulesLocal = meta({ search: [path.join(__dirname, 'fixtures', 'modules')] });

//////////////////////////////
// Contains
//////////////////////////////
test('containsSync - String', t => {
  const results = new ModuleFilter(modules, 'name').containsSync('over');

  compare(results, 'name', 'contains', 'over', t);
});

test('containsSync - Array', t => {
  const results = new ModuleFilter(modules, 'keywords').containsSync('runner');

  compare(results, 'keywords', 'contains', 'runner', t);
});

test('contains - String', t => {
  return new ModuleFilter(modules, 'name').contains('over').then(results => {
    compare(results, 'name', 'contains', 'over', t);
  });
});

test('contains - Array', t => {
  return new ModuleFilter(modules, 'keywords').contains('runner').then(results => {
    compare(results, 'keywords', 'contains', 'runner', t);
  });
});

test('containsSync (local) - String', t => {
  const results = new ModuleFilter(modulesLocal, 'name').containsSync('dule-a');

  compare.local(results, 'name', 'contains', 'dule-a', t);
});

test('containsSync (local) - Array', t => {
  const results = new ModuleFilter(modulesLocal, 'keywords').containsSync('runner');

  compare.local(results, 'keywords', 'contains', 'runner', t);
});

test('contains (local) - String', t => {
  return new ModuleFilter(modulesLocal, 'name').contains('dule-c').then(results => {
    compare.local(results, 'name', 'contains', 'dule-c', t);
  });
});

test('contains (local) - Array', t => {
  return new ModuleFilter(modulesLocal, 'keywords').contains('runner').then(results => {
    compare.local(results, 'keywords', 'contains', 'runner', t);
  });
});

//////////////////////////////
// Does Not Contain
//////////////////////////////
test('doesNotContainSync - String', t => {
  const results = new ModuleFilter(modules, 'name').doesNotContainSync('babel');

  compare(results, 'name', 'not contain', 'babel', t);
});

test('doesNotContainSync - Array', t => {
  const results = new ModuleFilter(modules, 'keywords').doesNotContainSync('test');

  compare(results, 'keywords', 'not contain', 'test', t);
});

test('doesNotContain - String', t => {
  return new ModuleFilter(modules, 'name').doesNotContain('babel').then(results => {
    compare(results, 'name', 'not contain', 'babel', t);
  });
});

test('doesNotContain - Array', t => {
  return new ModuleFilter(modules, 'keywords').doesNotContain('test').then(results => {
    compare(results, 'keywords', 'not contain', 'test', t);
  });
});

//////////////////////////////
// Is Equal To
//////////////////////////////
test('isSync - String (not found)', t => {
  const results = new ModuleFilter(modules, 'name').isSync('foo-bar-baz');

  compare(results, 'name', 'is', 'foo-bar-baz', t);
});

test('isSync - String (found)', t => {
  const results = new ModuleFilter(modules, 'name').isSync('coveralls');

  compare(results, 'name', 'is', 'coveralls', t);
});

test('isSync - String (found, unrequireable)', t => {
  const results = new ModuleFilter(modules, 'name').isSync('jsdoc');

  const expected = nodeModules.node.filter(module => {
    if (_.get(module, 'package.name', '') === 'jsdoc') {
      return true;
    }

    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  const values = _.isEqual(results.__unrequireable, expected);

  t.true(Object.keys(results).length === 1, 'Only unrequireable modules');
  t.true(values, 'Expected results are the same');
});

test('is - String (not found)', t => {
  return new ModuleFilter(modules, 'name').is('foo-bar-baz').then(results => {
    compare(results, 'name', 'is', 'foo-bar-baz', t);
  });
});

test('is - String (found)', t => {
  return new ModuleFilter(modules, 'name').is('coveralls').then(results => {
    compare(results, 'name', 'is', 'coveralls', t);
  });
});

test('is - String (found, unrequireable)', t => {
  return new ModuleFilter(modules, 'name').is('jsdoc').then(results => {
    const expected = nodeModules.node.filter(module => {
      if (_.get(module, 'package.name', '') === 'jsdoc') {
        return true;
      }

      return false;
    }).map(module => {
      return module.package.name;
    }).sort();

    const values = _.isEqual(results.__unrequireable, expected);

    t.true(Object.keys(results).length === 1, 'Only unrequireable modules');
    t.true(values, 'Expected results are the same');
  });
});

// //////////////////////////////
// // Is Not Equal To
// //////////////////////////////
test('isNotSync - String (not found)', t => {
  const results = new ModuleFilter(modules, 'name').isNotSync('foo-bar-baz');

  compare(results, 'name', 'is not', 'foo-bar-baz', t);
});

test('isNotSync - String (found)', t => {
  const results = new ModuleFilter(modules, 'name').isNotSync('coveralls');

  compare(results, 'name', 'is not', 'coveralls', t);
});

test('isNotSync - String (found, unrequireable)', t => {
  const results = new ModuleFilter(modules, 'name').isNotSync('jsdoc');

  if (results.hasOwnProperty('__unrequireable') && Array.isArray(results.__unrequireable)) {
    const unreq = results.__unrequireable.indexOf('jsdoc') < 0;

    t.true(unreq, 'JSDoc not in unrequireable');
  }
  else {
    t.pass('No unrequireable modules');
  }
});

test('isNot - String (not found)', t => {
  return new ModuleFilter(modules, 'name').isNot('foo-bar-baz').then(results => {
    compare(results, 'name', 'is not', 'foo-bar-baz', t);
  });
});

test('isNot - String (found)', t => {
  return new ModuleFilter(modules, 'name').isNot('coveralls').then(results => {
    compare(results, 'name', 'is not', 'coveralls', t);
  });
});

test('isNot - String (found, unrequireable)', t => {
  return new ModuleFilter(modules, 'name').isNot('jsdoc').then(results => {
    if (results.hasOwnProperty('__unrequireable') && Array.isArray(results.__unrequireable)) {
      const unreq = results.__unrequireable.indexOf('jsdoc') < 0;

      t.true(unreq, 'JSDoc not in unrequireable');
    }
    else {
      t.pass('No unrequireable modules');
    }
  });
});
