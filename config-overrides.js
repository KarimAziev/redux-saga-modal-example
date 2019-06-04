const { paths } = require('react-app-rewired');
const path = require('path');

function createRewireAliases(aliasesOptions = {}) {
  return function(config, env) {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliasesOptions,
    };
    return config;
  };
}

const rewireAliases = createRewireAliases();

rewireAliases.aliasesOptions = createRewireAliases;

module.exports = function override(config, env) {
  const nodeModules = paths.appNodeModules;
  if (process.env.REACT_APP_ENV === 'dev') {
    config = rewireAliases.aliasesOptions({
      react: path.resolve(`${nodeModules}/react`),
      'react-dom': path.resolve(`${nodeModules}/react-dom`),
      'react-redux': path.resolve(`${nodeModules}/react-redux`),
      redux: path.resolve(`${nodeModules}/redux`),
      'redux-saga': path.resolve(`${nodeModules}/redux-saga`),
    })(config, env);
  }
  return config;
};
