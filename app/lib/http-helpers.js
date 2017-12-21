'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = ['mime']

function factory(mime) {
  return {
    /**
     * @param {http.ServerResponse} res
     * @param {Number} statusCode
     * @param {String} html
     */
    sendHTML(res, statusCode, html) {
      res.writeHead(statusCode, {
        'Content-Type': 'text/html; charset=UTF-8',
        'Content-Length': html.length
      })
      res.write(html)
      res.end()
    },

    /**
     * @param {http.ServerResponse} res
     * @param {String} fileName
     * @param {String} fileContents
     */
    push(res, fileName, fileContents) {
      if (!res.push) return
      const push = res.push(fileName)
      push.writeHead(200, {
        'Content-Type': `${mime.lookup(fileName)}; charset=UTF-8`,
        'Content-Length': fileContents.length
      })
      push.write(fileContents)
      push.end()
    },

    /**
     * @param {http.ClientRequest} req
     * @param {{ user: String, pass: String }} credentials
     * @returns {Boolean}
     */
    isValidBasicAuth(req, credentials) {
      if (!req.headers.authorization) {
        return false
      }

      const credsStr = `${credentials.user}:${credentials.pass}`
      const authStr = Buffer.from(credsStr).toString('base64')
      const authHeader = `Basic ${authStr}`

      return authHeader === req.headers.authorization
    }
  }
}
