'use strict';

module.exports = {
  title: 'UpdateTask',
  type: 'object',
  required: [
    'name',
    'description'
  ],
  properties: {
    name: {
      type: 'string'
    },

    description: {
      type: 'string'
    }
  }
};
