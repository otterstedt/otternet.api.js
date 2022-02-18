const apiPaths = {
    '/devices': {
      get: {
        summary: 'Get all telldus sensors',
        description: 'Get all sensors structure without measurements\n',
        tags: [
          'Api Information'
        ],
        responses: {
          200: {
            description: 'Sensors list',
            schema: {
              $ref: '#/definitions/Sensors'
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
    },
    '/sensors': {
      get: {
        summary: 'Get all telldus sensors',
        description: 'Get all sensors structure without measurements\n',
        tags: [
          'Api Information'
        ],
        responses: {
          200: {
            description: 'Sensors list',
            schema: {
              $ref: '#/definitions/Sensors'
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
  