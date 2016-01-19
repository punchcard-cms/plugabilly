'use strict';

const meta = require('./lib/meta');
const find = require('./lib/find');

var file = find.file('gulpfile.js');

meta().then(modules => {
  console.log(modules);
});

console.log(file);
