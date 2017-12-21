'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = ['contentful', 'lib/env']

function factory(contentful, { parsed: env }) {
  const client = contentful.createClient({
    host: env.CONTENTFUL_HOST,
    space: env.CONTENTFUL_SPACE,
    accessToken: env.CONTENTFUL_ACCESSTOKEN
  })

  return {
    async getAllContent() {
      const content = {
        _contentTypeIds: await getContentTypeIds(client)
      }

      for (const contentTypeId of content._contentTypeIds) {
        content[contentTypeId] = await getEntriesByContentTypeId(
          client,
          contentTypeId
        )
      }

      return content
    }
  }
}

/**
 * @param {ContentfulClientAPI} client
 * @returns {Promise<Array<String>>}
 */
async function getContentTypeIds(client) {
  return (await client.getContentTypes()).items
}

/**
 * @param {ContentfulClientAPI} client
 * @param {String} contentTypeId
 * @returns {Promise<Array<Object>>}
 */
async function getEntriesByContentTypeId(client, contentTypeId) {
  return (await client.getEntries({ content_type: contentTypeId })).items
}
