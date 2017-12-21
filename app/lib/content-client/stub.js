'use strict'

module.exports = factory
module.exports['@singleton'] = true
module.exports['@require'] = []

function factory() {
  return {
    async getAllContent() {
      return {
        _contentTypeIds: ['article', 'dump'],
        article: [
          {
            sys: {
              id: 'ABC123',
              contentType: {
                sys: {
                  id: 'article'
                }
              }
            },
            fields: {
              title: 'Stub 1 Title',
              author: 'Mr. Stub',
              url: '/stub-1-url',
              published: '2000-01-01T13:37:00+00:00',
              description: 'Stub 1 description',
              introduction: 'Stub 1 introduction',
              text: 'Stub 1 text'
            }
          },
          {
            sys: {
              id: 'DEF456',
              contentType: {
                sys: {
                  id: 'article'
                }
              }
            },
            fields: {
              title: 'Stub 2 Title',
              author: 'Mr. Stub',
              url: '/stub-2-url',
              published: '2001-01-01T13:37:00+02:00',
              description: 'Stub 2 description',
              introduction: 'Stub 2 introduction',
              text: 'Stub 2 text'
            }
          }
        ],
        dump: [
          {
            sys: {
              id: 'GHI789',
              contentType: {
                sys: {
                  id: 'dump'
                }
              }
            },
            fields: {
              title: 'Stub 3 Title',
              url: '/stub-3-url',
              description: 'Stub 3 description',
              text: 'Stub 3 text'
            }
          }
        ]
      }
    }
  }
}
