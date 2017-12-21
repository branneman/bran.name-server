'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = ['models/article']

function factory(article) {
  return {
    article
  }
}
