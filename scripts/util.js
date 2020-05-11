const path = require('path');

exports.root = (filePath) => path.join(path.resolve(__dirname, '../src'), filePath);
