'use strict';

const Promise = require('bluebird');
const glob = Promise.promisify(require('glob'));
const path = require('path');

module.exports = function (start) {
  var search;

  start = start ? start : process.cwd();
  search = path.join(start, 'node_modules', '*', 'package.json');

  return glob(search).then(modules => {
    return Promise.map(modules, module => {
      return {
        'path': module,
        'package': require(module)
      }
    });
  }).then(modules => {
    return modules;
  });
}

//////////////////////////////
// Use NPM for really big things
//////////////////////////////
// const exec = require('child_process').exec;

// var meta = function () {
//   return new Promise(function(resolve, reject) {
//     exec('npm ls --json --depth=0', function (err, stdout) {
//       if (err) {
//         reject(err);
//       }
//       resolve(JSON.parse(stdout));
//     });
//   });
// }

// module.exports = meta;
