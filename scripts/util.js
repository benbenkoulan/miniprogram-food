const path = require('path');

const ROOT = path.resolve(__dirname, '../src');

exports.ROOT = ROOT;

exports.getPathRelativeRoot = (filePath = '') => path.join(ROOT, filePath);
