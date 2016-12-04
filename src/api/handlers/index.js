'use strict';

module.exports = (pre, models, search) => {
  assert(_.isPlainObject(pre));
  assert(_.isPlainObject(models));

  return {
    'tasks': require('./tasks')
  };
};
