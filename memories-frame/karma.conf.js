module.exports = function (config) {
  config.set({
    browsers: process.env.CI ? ['ChromeHeadless'] : ['Chrome']
  });
};