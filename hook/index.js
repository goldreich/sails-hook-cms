const config = require('./config');
const router = require('./router');

module.exports = function sailsCms(sails) {
  this.sails = sails;
  this.config = config;
  this.commonAttributes = null;
  this.models = null;

  this._callRouter = (...args) => router.call(this, ...args);

  if (sails.config.sailsCms) {
    Object.keys(sails.config.sailsCms)
      .forEach((key) => {
        config[key] = sails.config.sailsCms[key];
      });
  }

  return {
    routes: {
      before: {
        ['/sails-hook-cms/*']: this._callRouter(),
        [`/${config.prefix ? config.prefix + '/' : ''}*`]: this._callRouter(),
        [`/${config.prefix}`]: this._callRouter()
      }
    }
  };
};
