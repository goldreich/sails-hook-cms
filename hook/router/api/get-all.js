module.exports = async function (req, res, next) {
  if (req.method === 'GET') {
    const promises = this.models.map(model => global[model.globalId].find());
    const data = (await Promise.all(promises)).map((records, i) => ({
      identity: this.models[i].identity,
      records
    }));

    return res.json({
      result: true,
      data
    });
  } else {
    res.json({
      result: false,
      error: {
        code: 3,
        msg: '/api/all allowed only GET method'
      }
    });
  }
};
