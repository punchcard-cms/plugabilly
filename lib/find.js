'use strict';

const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

/**
  * Finds file by walking up a directory from a given path.
  * @ignore
  *
  * @param {string} configPath - Path to start searching from
  * @param {string} filename - File name being searched for
  *
  * @returns {string} Full path to the found file
**/
const findFile = function findFile(configPath, filename) {
  var dirname;
  var parentDirname;

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

/**
  * Finds file by walking up a directory from the current directory.
  * @exports find/file
  *
  * @param {string} filename - File name being searched for
  *
  * @returns {string} Full path to the found file
  *
**/
module.exports.file = function (filename) {
  return findFile(false, filename);
};

/**
  * Finds directory a file resides in by walking up a directory from the current directory.
  * @exports find/dirFromFile
  *
  * @param {string} filename - File name being searched for
  *
  * @returns {string} Full path to the directory the file was found in
  *
**/
module.exports.dirFromFile = function (filename) {
  return path.dirname(findFile(false, filename));
};
