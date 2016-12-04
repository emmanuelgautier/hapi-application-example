'use strict';

module.exports = {
  title: 'NewTask',
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
