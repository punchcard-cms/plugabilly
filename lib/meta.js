'use strict';

const Promise = require('bluebird');
// const glob = Promise.promisify(require('glob'));
// const path = require('path');

// module.exports = function (start) {
//   var search;

//   start = start ? start : process.cwd();
//   search = path.join(start, 'node_modules', '*', 'package.json');

//   return glob(search).then(modules => {
//     return Promise.map(modules, module => {
//       return {
//         path: module,
//         package: require(module)
//       };
//     });
//   }).then(modules => {
//     return modules;
//   });
// };

// ////////////////////////////
// Use NPM for really big things
// ////////////////////////////
const exec = require('child_process').exec;

var meta = function () {
  return new Promise(function (resolve, reject) {
    exec('npm ls --json --depth=0 --long', function (err, stdout) {
      var results;
      var modules = [];

      if (err) {
        reject(err);
      }

      results = JSON.parse(stdout);
      Object.keys(results.dependencies).forEach(function (dep) {
        dep = results.dependencies[dep];
        modules.push({
          path: dep.path,
          package: dep
        });
      });
      resolve(modules);
    });
  });
};

module.exports = meta;
