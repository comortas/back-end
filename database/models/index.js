'use strict';

const _ = require('lodash');
const glob = require('glob');

const modelFiles = glob.sync('./*.model.js', {
  ignore: ['./index.js'],
  cwd: __dirname,
});

module.exports = _.map(modelFiles, (modPath) => {
  const model = require(modPath);
  return {
    name : model.name,
    schema : model.schema
  };
});
