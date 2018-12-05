const utils = require('../../utils');
const getAll = require('./get-all');
const modelRouter = require('./model');

module.exports = function (req, res, next, urlArray) {
  if (urlArray.length) {
    if (urlArray[0] === 'all') {
      if (req.method === 'GET') {
        return getAll.call(this, req, res, next);
      }

      return res.json({ result: false, error: { code: 5 } });
    }

    const model = utils.currentModel.call(this, urlArray[0]);

    if (!model) {
      return res.status(404).json({
        result: false,
        error: {
          status: 1,
          msg: `Model ${urlArray[0]} not found`
        }
      });
    }

    return modelRouter.call(this, req, res, next, model, urlArray.slice(1));
  }

  return res.json({
    result: true,
    msg: 'sails-hook-cms api v.0.0.0'
  });
};
