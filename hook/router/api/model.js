module.exports = async function (req, res, next, model, urlArray) {
  const id = urlArray.reduce((value, url) => value = url, null);

  switch (req.method) {
    case 'GET':
      if (id) {
        const record = await model.findOne({ id });

        if (!record) {
          return res.status(404).json({
            result: false,
            error: {
              code: 7,
              msg: 'Not found'
            }
          });
        }

        return res.json({
          result: true,
          data: record
        });
      }
      return res.json({
        result: true,
        data: await model.find()
      });
    case 'POST':
    case 'PUT':
    case 'DELETE':
      return res.json({
        result: true,
        method: req.method
      });
    default:
      return res.json({
        result: false,
        error: {
          code: 4,
          msg: `Method ${req.method} is not allowed`
        }
      });
  }
};
