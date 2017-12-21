'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'lib/env',
  'lib/content',
  'lib/http-helpers',
  'areas/error'
]

function factory(
  { parsed: env },
  content,
  { sendHTML, isValidBasicAuth },
  { unauthorized, internalServerError }
) {
  const credentials = {
    user: env.CONTENTFUL_HOOK_AUTH_USER,
    pass: env.CONTENTFUL_HOOK_AUTH_PASS
  }

  return {
    /**
     * @param {http.ClientRequest} req
     * @param {http.ServerResponse} res
     */
    async contentHookAction(req, res) {
      if (!isValidBasicAuth(req, credentials)) {
        return unauthorized(req, res)
      }

      try {
        await content.cacheAllContent()
        return sendHTML(res, 200, '<h1>Success</h1>')
      } catch (err) {
        return internalServerError(req, res, err)
      }
    }
  }
}
