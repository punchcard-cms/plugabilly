import test from 'ava';
import path from 'path';
import _ from 'lodash';

import ModuleFilter from '../lib/filter';
import meta from '../lib/meta';
import nodeModules from './_modules';

// import modules from './_modules';

const modules = meta();
const modulesLocal = meta({ search: [path.join(__dirname, './fixtures/modules')] });

//////////////////////////////
// Contains
//////////////////////////////
test('containsSync - String', t => {
  const results = new ModuleFilter(modules, 'name').containsSync('over');
  t.is(Object.keys(results).length, 1);
  t.true(_.isEqual(Object.keys(results).sort(), ['coveralls'].sort()));
});

test('containsSync - Array', t => {
  const results = new ModuleFilter(modules, 'keywords').containsSync('runner');
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
  const results = new ModuleFilter(modulesLocal, 'name').containsSync('dule-a');
  t.is(Object.keys(results).length, 1);
  t.true(_.isEqual(Object.keys(results).sort(), ['module-a'].sort()));
});

test('containsSync - Array', t => {
  const results = new ModuleFilter(modulesLocal, 'keywords').containsSync('runner');
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
test('doesNotContainSync - String', t => {
  const results = new ModuleFilter(modules, 'name').doesNotContainSync('babel');

  const expected = nodeModules.filter(module => {
    if (_.get(module, 'package.name', '').indexOf('babel') < 0) {
      return true;
    }

    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  let item = _.pull(Object.keys(results), '__unrequireable');
  if (results.__unrequireable) {
    item = item.concat(results.__unrequireable).sort();
  }
  const values = _.isEqual(item, expected);

  t.true(values, 'Expected results are the same');
});

test('doesNotContainSync - Array', t => {
  const results = new ModuleFilter(modules, 'keywords').doesNotContainSync('test');
  const expected = nodeModules.filter(module => {
    if (_.get(module, 'package.keywords', '').indexOf('test') < 0) {
      return true;
    }

    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  let item = _.pull(Object.keys(results), '__unrequireable');
  if (results.__unrequireable) {
    item = item.concat(results.__unrequireable).sort();
  }
  const values = _.isEqual(item, expected);

  t.true(values, 'Expected results are the same');
});

test('doesNotContain - String', t => {
  return new ModuleFilter(modules, 'name').doesNotContain('babel').then(results => {
    const expected = nodeModules.filter(module => {
      if (_.get(module, 'package.name', '').indexOf('babel') < 0) {
        return true;
      }

      return false;
    }).map(module => {
      return module.package.name;
    }).sort();

    let item = _.pull(Object.keys(results), '__unrequireable');
    if (results.__unrequireable) {
      item = item.concat(results.__unrequireable).sort();
    }
    const values = _.isEqual(item, expected);

    t.true(values, 'Expected results are the same');
  });
});

test('doesNotContain - Array', t => {
  return new ModuleFilter(modules, 'keywords').doesNotContain('test').then(results => {
    const expected = nodeModules.filter(module => {
      if (_.get(module, 'package.keywords', '').indexOf('test') < 0) {
        return true;
      }

      return false;
    }).map(module => {
      return module.package.name;
    }).sort();

    let item = _.pull(Object.keys(results), '__unrequireable');
    if (results.__unrequireable) {
      item = item.concat(results.__unrequireable).sort();
    }
    const values = _.isEqual(item, expected);

    t.true(values, 'Expected results are the same');
  });
});

//////////////////////////////
// Is Equal To
//////////////////////////////
test('isSync - String (not found)', t => {
  const results = new ModuleFilter(modules, 'name').isSync('foo-bar-baz');

  const expected = nodeModules.filter(module => {
    if (_.get(module, 'package.name', '') === 'foo-bar-baz') {
      return true;
    }

    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  let item = _.pull(Object.keys(results), '__unrequireable');
  if (results.__unrequireable) {
    item = item.concat(results.__unrequireable).sort();
  }
  const values = _.isEqual(item, expected);

  t.true(values, 'Expected results are the same');
});

test('isSync - String (found)', t => {
  const results = new ModuleFilter(modules, 'name').isSync('coveralls');

  const expected = nodeModules.filter(module => {
    if (_.get(module, 'package.name', '') === 'coveralls') {
      return true;
    }

    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  let item = _.pull(Object.keys(results), '__unrequireable');
  if (results.__unrequireable) {
    item = item.concat(results.__unrequireable).sort();
  }
  const values = _.isEqual(item, expected);

  t.true(values, 'Expected results are the same');
});

test('isSync - String (found, unrequireable)', t => {
  const results = new ModuleFilter(modules, 'name').isSync('jsdoc');

  const expected = nodeModules.filter(module => {
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
    const expected = nodeModules.filter(module => {
      if (_.get(module, 'package.name', '') === 'foo-bar-baz') {
        return true;
      }

      return false;
    }).map(module => {
      return module.package.name;
    }).sort();

    let item = _.pull(Object.keys(results), '__unrequireable');
    if (results.__unrequireable) {
      item = item.concat(results.__unrequireable).sort();
    }
    const values = _.isEqual(item, expected);

    t.true(values, 'Expected results are the same');
  });
});

test('is - String (found)', t => {
  return new ModuleFilter(modules, 'name').is('coveralls').then(results => {
    const expected = nodeModules.filter(module => {
      if (_.get(module, 'package.name', '') === 'coveralls') {
        return true;
      }

      return false;
    }).map(module => {
      return module.package.name;
    }).sort();

    let item = _.pull(Object.keys(results), '__unrequireable');
    if (results.__unrequireable) {
      item = item.concat(results.__unrequireable).sort();
    }
    const values = _.isEqual(item, expected);

    t.true(values, 'Expected results are the same');
  });
});

test('is - String (found, unrequireable)', t => {
  return new ModuleFilter(modules, 'name').is('jsdoc').then(results => {
    const expected = nodeModules.filter(module => {
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

  const expected = nodeModules.filter(module => {
    if (_.get(module, 'package.name', '') !== 'foo-bar-baz') {
      return true;
    }

    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  let item = _.pull(Object.keys(results), '__unrequireable');
  if (results.__unrequireable) {
    item = item.concat(results.__unrequireable).sort();
  }
  const values = _.isEqual(item, expected);

  t.true(values, 'Expected results are the same');
});

test('isNotSync - String (found)', t => {
  const results = new ModuleFilter(modules, 'name').isNotSync('coveralls');

  const expected = nodeModules.filter(module => {
    if (_.get(module, 'package.name', '') !== 'coveralls') {
      return true;
    }

    return false;
  }).map(module => {
    return module.package.name;
  }).sort();

  let item = _.pull(Object.keys(results), '__unrequireable');
  if (results.__unrequireable) {
    item = item.concat(results.__unrequireable).sort();
  }
  const values = _.isEqual(item, expected);

  t.true(values, 'Expected results are the same');
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
    const expected = nodeModules.filter(module => {
      if (_.get(module, 'package.name', '') !== 'foo-bar-baz') {
        return true;
      }

      return false;
    }).map(module => {
      return module.package.name;
    }).sort();

    let item = _.pull(Object.keys(results), '__unrequireable');
    if (results.__unrequireable) {
      item = item.concat(results.__unrequireable).sort();
    }
    const values = _.isEqual(item, expected);

    t.true(values, 'Expected results are the same');
  });
});

test('isNot - String (found)', t => {
  return new ModuleFilter(modules, 'name').isNot('coveralls').then(results => {
    const expected = nodeModules.filter(module => {
      if (_.get(module, 'package.name', '') !== 'coveralls') {
        return true;
      }

      return false;
    }).map(module => {
      return module.package.name;
    }).sort();

    let item = _.pull(Object.keys(results), '__unrequireable');
    if (results.__unrequireable) {
      item = item.concat(results.__unrequireable).sort();
    }
    const values = _.isEqual(item, expected);

    t.true(values, 'Expected results are the same');
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
