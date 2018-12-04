module.exports = function (req, res, next) {
  if (this.models === null) {
    this.commonAttributes = this.sails.config.models.attributes;
    this.models = Object.keys(this.sails.models)
      .filter(key => key !== 'archive')
      .map(key => ({
        identity: this.sails.models[key].identity,
        globalId: this.sails.models[key].globalId,
        attributes: this.sails.models[key].attributes
      }));
  }
  return next();
};
