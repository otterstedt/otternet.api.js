const config = require('../../config');

const apiSpec = {
  //basePath: '/info/v1', inherited from folder path from config.js

  swagger: '2.0',
  info: config.swagger.info,
  schemes: [
    'http',
    'https'
  ],
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ],
  securityDefinitions: {
    AccessTokenSecurity: {
      type: 'apiKey',
      in: 'header',
      name: 'X-Access-Token'
    }
  },
  security: [
    {
      AccessTokenSecurity: []
    }
  ],
  responses: {
    // 204 No Content
    NoContent: {
      description: 'Success no content response'
    },
    // Error 400
    BadRequestError: {
      description: 'Bad Request (Parameter not correct)',
      schema: {
        $ref: '#/definitions/Errors'
      }
    },
    // Error 422
    UnprocessableEntityError: {
      description: 'Not able to process the request',
      schema: {
        $ref: '#/definitions/Errors'
      }
    },
    // Error 401
    UnauthorizedError: {
      description: 'API key is missing or invalid',
      schema: {
        $ref: '#/definitions/Errors'
      }
    },
    // Error 404
    ItemNotFoundError: {
      description: 'Item was not found',
      schema: {
        $ref: '#/definitions/Errors'
      }
    },
    // Error 500
    UnknownServerError: {
      description: 'Unknown server error',
      schema: {
        $ref: '#/definitions/Errors'
      }
    }
  },
  paths: require('./apiPaths'),
  definitions: require('./apiDefinitions'),
  parameters: {
    HeaderXAccessToken: {
      name: 'x-access-token',
      in: 'header',
      required: false,
      type: 'string',
      description: 'User password.',
      default: ''
    }
  }
};
module.exports = apiSpec;
