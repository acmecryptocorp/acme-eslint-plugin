module.exports = function(config) {
  config.set({
    mutator: 'javascript',
    mutate: ['src/**/*.js', '!src/rules/*/assertions.js'],
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'jest',
    transpilers: ['babel'],
    coverageAnalysis: 'off',
    babel: {
      optionsFile: '.babelrc',
    },
  });
};
