'use strict';

var deepExtend = require('deepmerge');

/**
 * Define a new route
 *
 * @param  {Object} options
 * @return {Object} extended `options` with default parameters
 */
function def(options) {
  return deepExtend({
    tags: ['hapi'],
    summary: 'not-defined',
    description: 'not-defined',
    operationId: 'not-defined',
    produces: ['application/vnd.api+json'],
    parameters: [],
    responses: {
      400: {
        description: 'Bad Request',
        schema: {
          $ref: '#/definitions/Error'
        }
      },
      404: {
        description: 'Not Found',
        schema: {
          $ref: '#/definitions/Error'
        }
      },
      500: {
        description: 'Internal Server Error',
        schema: {
          $ref: '#/definitions/Error'
        }
      }
    }
  }, options);
}

module.exports = {
  '/tasks': {
    get: def({
      summary: 'List tasks',
      description: 'List all the tasks',
      operationId: 'listTasks',
      responses: {
        200: {
          description: 'List of Tasks',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Tasks'
              }
            }
          }
        }
      }
    }),

    post: def({
      summary: 'Post task',
      description: 'Post a new task',
      operationId: 'postTask',
      parameters: [{
        'in': 'body',
        name: 'newTask',
        description: 'new `Task` object to post',
        required: true,
        schema: {
          $ref: '#/definitions/NewTask'
        }
      }],
      responses: {
        201: {
          description: 'New task response',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Task'
              }
            }
          }
        }
      }
    })
  },

  '/{taskUuid}': {
    get: def({
      summary: 'Get task',
      description: 'Get a single task by uuid',
      operationId: 'getTaskByUuid',
      parameters: [{
        'in': 'path',
        name: 'taskUuid',
        description: 'Identifier of the requested task',
        type: 'string',
        format: 'uuid',
        required: true
      }],
      responses: {
        200: {
          description: 'Task response',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Task'
              }
            }
          }
        }
      }
    }),

    put: def({
      summary: 'Update task',
      description: 'Update a single task by uuid',
      operationId: 'updateTaskByUuid',
      parameters: [{
        'in': 'path',
        name: 'taskUuid',
        description: 'Identifier of the requested task',
        type: 'string',
        format: 'uuid',
        required: true
      }, {
        'in': 'body',
        name: 'updateTask',
        description: '`Task` object to update',
        required: true,
        schema: {
          $ref: '#/definitions/UpdateTask'
        }
      }],
      responses: {
        200: {
          description: 'Updated task response',
          schema: {
            type: 'object',
            required: ['data'],
            properties: {
              data: {
                $ref: '#/definitions/Task'
              }
            }
          }
        }
      }
    }),

    'delete': def({
      summary: 'Delete task',
      description: 'Delete a single task by uuid',
      operationId: 'deleteTaskByUuid',
      parameters: [{
        'in': 'path',
        name: 'taskUuid',
        description: 'Identifier of the requested task',
        type: 'string',
        format: 'uuid',
        required: true
      }],
      responses: {
        204: {
          description: 'Deleted task response'
        }
      }
    })
  }
};
