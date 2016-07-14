const fs = require('fs');
const path = require('path');

module.exports = fs.readdirSync('../node_modules').filter(module => {
  if (module.charAt(0) === '.') {
    return false;
  }

  try {
    fs.statSync(path.join(__dirname, '..', 'node_modules', module, 'package.json'));

    return true;
  }
  catch (e) {
    return false;
  }
}).map(module => {
  const pth = path.join(__dirname, '..', 'node_modules', module);

  // Disabling require linter to allow us to require the package file
  return {
    path: pth,
    package: require(path.join(pth, 'package.json')), // eslint-disable-line global-require
  };
});
