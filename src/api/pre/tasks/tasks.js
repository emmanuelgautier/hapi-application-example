'use strict';

const Boom = require('boom');

module.exports = (models) => {
  assert(_.isPlainObject(models));

  const Task = models.Task;

  return {
    exists: (request, reply) => {
      Task.findById(request.params.taskUuid).then((task) => {
        if (!task) {
          return Promise.reject(Boom.notFound());
        }

        request.resources = request.resources || {};
        request.resources.task = task;

        return reply.continue();
      }).catch((err) => {
        reply(err);
      });
    }
  }
};
