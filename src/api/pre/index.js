'use strict';

module.exports = (models) => {
  assert(_.isPlainObject(models));

  return {
    tasks: require('./tasks')(models)
  };
};
