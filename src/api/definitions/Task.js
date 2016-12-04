'use strict';

module.exports = {
  title: 'Task',
  type: 'object',
  required: [
    'uuid',
    'name',
    'description'
  ],
  properties: {
    uuid: {
      type: 'string'
    },

    name: {
      type: 'string'
    },

    description: {
      type: 'string'
    }
  }
};
