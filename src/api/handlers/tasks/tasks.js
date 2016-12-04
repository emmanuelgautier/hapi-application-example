'use strict';

const Boom = require('boom');

module.exports = (pre, models) => {
  assert(_.isPlainObject(pre));
  assert(_.isPlainObject(models));

  const Task = models.Task;

  return {
    $get: (request, reply) => {
      Task.findAll().then((tasks) => {
        reply(tasks);
      }).catch((err) => {
        reply(err);
      })
    },

    $post: (request, reply) => {
      Task.create(request.payload).then((task) => {
        reply(task).code(201);
      }).catch((err) => {
        reply(err);
      });
    },

    '{taskUuid}': {
      $get: [
        pre.exists,
        (request, reply) => {
          let task = request.resources.task;

          reply(task);
        }
      ],

      $put: [
        pre.exists,
        (request, reply) => {
          let task = request.resources.task;

          task.update(request.payload).then((task) => {
            reply(task);
          }).catch((err) => {
            reply(err);
          });
        }
      ],

      $delete: [
        pre.exists,
        (request, reply) => {
          let task = request.resources.task;

          task.destroy().then(() => {
            reply().code(204);
          }).catch((err) => {
            reply(err);
          });
        }
      ]
    }
  };
};
