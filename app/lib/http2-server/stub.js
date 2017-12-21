'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = ['http', 'lib/env', 'router']

function factory(http1, { parsed: env }, router) {
  return {
    /**
     * Start HTTP/1 server
     * @private
     * @returns {http.Server}
     */
    start() {
      return http1
        .createServer(router)
        .listen(env.SERVER_PORT)
        .on('listening', () =>
          console.log(
            `HTTP/1 server listening on http://localhost:${env.SERVER_PORT}/`
          )
        )
    }
  }
}
