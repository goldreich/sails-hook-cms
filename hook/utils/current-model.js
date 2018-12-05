module.exports = function (identity) {
  return this.models
    .filter(model => model.identity === identity)
    .map(model => global[model.globalId])
    .reduce((value, model) => value = model, null);
};
