'use strict';

const Hapi = require('hapi');
const Swaggerize = require('swaggerize-hapi');

module.exports = (JSONPackage, config, logger, models) => {
  assert(_.isPlainObject(JSONPackage));
  assert(_.isPlainObject(config));
  assert(_.isPlainObject(models));

  const server = new Hapi.Server();

  server.connection({
    port: config.api.port,
    uri: config.api.uri,
    routes: {cors: config.api.cors}
  });

  const pre = require('./pre')(models);

  server.ext('onPostHandler', (request, reply) => {

    const response = request.response;

    if (response.isBoom) {
      // catch error with Sentry, Bugsnag, ...

      return reply(response);
    }

    reply.continue({data: response.source});
  });

  return when(server.register([{
    register: Swaggerize,
    options: {
      api: require('./definition')(JSONPackage, config),
      docspath: '/swagger.json',
      handlers: require('./handlers')(pre, models),
      vhost: config.api.vhost,
      cors: config.api.cors
    }
  }])).then(() => {
    return when.promise((resolve, reject) => {
      server.start((err) => {
        if (err) {
          return reject(err);
        }

        resolve(server);
      })
    })
  });
};
