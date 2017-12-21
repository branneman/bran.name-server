'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'electrolyte',
  'nunjucks',
  'lib/env',
  'lib/read',
  'lib/http2-server'
]

async function factory(IoC, nunjucks, { parsed: env }, read, httpServer) {
  nunjucks.configure(`${process.cwd()}/app/areas/`)

  // Create content cache
  await IoC.create('lib/content')

  // Load HTTPS certificates
  const serverOptions = {
    key: read(env.SERVER_CERT_KEY),
    cert: read(env.SERVER_CERT_CERT)
  }

  return () => httpServer.start(serverOptions)
}
