'use strict';

const meta = require('./lib/meta');
const find = require('./lib/find');

meta().then(modules => {
  console.log(modules);
});

// var file = find.file('gulpfile.js');

// console.log(file);
