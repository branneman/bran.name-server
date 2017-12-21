'use strict'

module.exports = factory

/**
 * @typedef {{
 *  title: String,
 *  author: String,
 *  url: String,
 *  published: Date,
 *  description: String,
 *  body: String
 * }} Article
 */

function factory() {
  /**
   * @param {Object} article
   * @returns {Article}
   */
  return article => ({
    id: article.sys.id,
    title: article.fields.title,
    author: article.fields.author,
    url: article.fields.url,
    published: new Date(article.fields.published),
    description: article.fields.description,
    text: article.fields.text
  })
}
