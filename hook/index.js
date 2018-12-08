const path = require('path');
const fs = require('fs');

const config = require('./config');
const router = require('./router');
const utils = require('./utils');

module.exports = function sailsCms(sails) {
  // Public:
  this.sails = sails;
  this.config = config;
  this.commonAttributes = null;
  this.models = null;

  // Initializetion:
  (() => {
    const shcConfig = sails.config[config.configFileName] || null;

    if (shcConfig) {
      config.editable = true;

      Object.keys(shcConfig)
        .forEach((key) => {
          config[key] = shcConfig[key];
        });
    } else {
      const filePath = path.join(sails.config.paths.config, `${config.configFileName}.js`);

      try {
        fs.appendFileSync(filePath, utils.getDefaultConfigFile(config.configFileName));

        config.editable = true;
      } catch (error) {
        console.error(
          'Sails Hook CMS Error:',
          `Unable to create config file by path '${filePath}'`
        );
      }
    }
  })();

  // Private:
  const callRouter = (...args) => router.call(this, ...args);

  return {
    routes: {
      before: {
        ['/sails-hook-cms/*']: callRouter(),
        [`/${config.prefix ? config.prefix + '/' : ''}*`]: callRouter(),
        [`/${config.prefix}`]: callRouter()
      }
    }
  };
};
