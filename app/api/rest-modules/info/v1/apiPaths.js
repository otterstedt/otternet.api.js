const apiPaths = {
    '/api': {
      get: {
        summary: 'API information',
        description: 'Get api build information\n',
        tags: [
          'Api Information'
        ],
        responses: {
          200: {
            description: 'General Information About the API.',
            schema: {
              $ref: '#/definitions/apiInfo'
            }
          },
          422: {
            description: 'Server Error',
            schema: {
              $ref: '#/definitions/Errors'
            }
          }
        }
      },
      post: {
        summary: 'API information',
        description: 'Get api build information\n',
        tags: [
          'Api Information'
        ],
        responses: {
          200: {
            description: 'General Information About the API.',
            schema: {
              $ref: '#/definitions/apiInfo'
            }
          },
          422: {
            description: 'Server Error',
            schema: {
              $ref: '#/definitions/Errors'
            }
          }
        }
      }
    }
  };
  module.exports = apiPaths;
  