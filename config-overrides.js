'use strict';
const {
  override,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra');

module.exports = override(
  fixBabelImports('antd', {
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
  })
);
