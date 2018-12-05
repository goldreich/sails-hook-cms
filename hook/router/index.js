const path = require('path');
const fs = require('fs');

const utils = require('../utils');
const apiRouter = require('./api');

module.exports = function() {
  this._guard = async (req, res, next) => {
    if (this.config.policy) {
      return this.config.policy(req, res, next);
    }

    return next();
  };

  this._indexPage = (req, res) => {
    if (req.method === 'GET') {
      fs.readFile(path.join(__dirname, '../../dist/sails-hook-cms/index.html'), 'utf8', (err, data) => {
        res.send(data.replace('<base href="/">', `<base href="/${this.config.prefix}/">`));
      });
    } else {
      res.status(404).json({
        result: false,
        error: { code: 2 }
      });
    }
  };

  this._action = (req, res, next) => {
    const urlArray = req.url.split('/').filter(url => url && url !== this.config.prefix);

    if (urlArray[0] === 'api') {
      console.log(req.url);
      return apiRouter.call(this, req, res, next, urlArray.slice(1));
    } else if (urlArray[0]) {
      return res.sendFile(path.join(__dirname, '../../dist/sails-hook-cms/', urlArray[0]), {}, (err) => {
        if (err) {
          return this._indexPage(req, res);
        }
      });
    }

    return this._indexPage(req, res);
  };

  return [
    utils.loadModels.bind(this),
    this._guard,
    this._action
  ];
}
