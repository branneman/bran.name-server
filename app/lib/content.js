'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = [
  'lib/content-client',
  'models'
]

async function factory (client, models) {
  let cache = await client.getAllContent()

  return {

    /**
     * @param {String} contentTypeId
     * @returns {Array<Object>}
     */
    getEntries (contentTypeId) {
      return (cache[contentTypeId] || [])
        .map(entry => getModel(models, contentTypeId, entry))
    },

    /**
     * @param {String} entryId
     * @returns {Object}
     */
    getEntry (entryId) {
      const entry = cache._contentTypeIds
        .reduce((acc, entries) => acc.concat(cache[entries]), [])
        .filter(entry => entry.sys.id === entryId)[0]

      if (!entry) {
        return false
      }

      return getModel(models, entry.sys.contentType.sys.id, entry)
    },

    /**
     * @returns {Promise<Array<Object>>}
     */
    async cacheAllContent () {
      cache = await client.getAllContent()
      return cache
    }

  }
}

/**
 * @private
 * @param {Object} models
 * @param {String} contentTypeId
 * @param {Object} entry
 * @returns {Object|Boolean}
 */
function getModel (models, contentTypeId, entry) {
  return models[contentTypeId]
    ? models[contentTypeId](entry)
    : false
}
