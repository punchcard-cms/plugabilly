'use strict';

const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

const findFile = function findFile (configPath, filename) {
  var dirname,
      parentDirname;

  configPath = configPath || path.join(process.cwd(), filename);

  if (fs.existsSync(configPath)) {
    return fs.realpathSync(configPath);
  }

  dirname = path.dirname(configPath);
  parentDirname = path.dirname(dirname);

  if (dirname === HOME || dirname === parentDirname) {
    return null;
  }

  configPath = path.join(parentDirname, filename);

  return findFile(configPath, filename);
};

module.exports.file = function (filename) {
  return findFile(false, filename);
};

module.exports.dirFromFile = function (filename) {
  return path.dirname(findFile(false, filename));
}
