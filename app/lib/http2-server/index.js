'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = ['node_modules/http2', 'lib/env', 'router']

function factory(http2, { parsed: env }, router) {
  return {
    /**
     * Start HTTP/2+SSL server
     * @private
     * @param {{key: String, cert: String}} serverOptions
     * @returns {http.Server}
     */
    start(serverOptions) {
      return http2
        .createServer(serverOptions, router)
        .listen(env.SERVER_PORT)
        .on('listening', () =>
          console.log(
            `HTTP/2+SSL server listening on https://localhost:${
              env.SERVER_PORT
            }/`
          )
        )
    }
  }
}
