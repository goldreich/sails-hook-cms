const utils = require('../utils');

module.exports = function() {
  this._guard = async (req, res, next) => {
    if (this.config.policy) {
      return this.config.policy(req, res, next);
    }

    return next();
  };

  this._action = (req, res, next) => {
    const urlArray = req.url.split('/').filter(url => url && url !== this.config.prefix);

    if (urlArray.length === 0 || urlArray[0] !== 'api') {
      res.json('FRONTEND');
    } else {
      res.json('BACKEND');
    }
  };

  return [
    utils.loadModels.bind(this),
    this._guard,
    this._action
  ];
}
