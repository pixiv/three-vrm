'use strict';
const path = require('path');

module.exports = path_ => path.resolve(path_) === process.cwd();
