const apiDefinitions = {
    apiInfo: {
      type: 'object',
      description: 'API informationrt',
    },
    Errors: {
      type: 'object',
      description: 'Error response',
      required: [
        'errors'
      ],
      properties: {
        errors: {
          type: 'array',
          items: {
            $ref: '#/definitions/Error'
          }
        }
      }
    },
    Error: {
      type: 'object',
      description: 'Error messages',
      required: [
        'code'
      ],
      properties: {
        code: {
          type: 'integer',
          description: 'Four-digits error code'
        },
        message: {
          type: 'string',
          description: 'Error description'
        }
      },
      example: {
        code: 1000,
        message: 'Unknown error with API'
      }
    },
    Success: {
      type: 'object',
      required: [
        'success'
      ],
      properties: {
        success: {
          type: 'boolean'
        }
      }
    },
    UserLogin: {
      type: 'object',
      required: [
        'username',
        'password'
      ],
      properties: {
        username: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    },
    LoginSuccess: {
      allOf: [
        {
          type: 'object',
          properties: {
            token: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        },
        {
          $ref: '#/definitions/Success'
        }
      ]
    }
  };
  module.exports = apiDefinitions;
  