const apiPaths = {
    '/points': {
      get: {
        summary: 'Get all measurement points',
        description: 'Get all data per point\n',
        tags: [
          'points'
        ],
        responses: {
          200: {
            description: 'Sensors list',
            schema: {
              $ref: '#/definitions/Points'
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
    '/points/{timestamp}': {
          get: {
            summary: 'Get all measurement points',
            description: 'Get all data per point\n',
            tags: [
              'points'
            ],
            parameters: [{
                "name": "timestamp",
                "in": "path",
                "required": true,
                "type": "string",
                "description": "Unix time in ms"
            }],
            responses: {
              200: {
                description: 'Tracking Point',
                schema: {
                  $ref: '#/definitions/Point'
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
    '/position/latest': {
          get: {
            summary: 'Get latest measured point',
            description: 'Get latest measured point\n',
            tags: [
              'points'
            ],
            responses: {
              200: {
                description: 'Tracking Point',
                schema: {
                  $ref: '#/definitions/Point'
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
    '/tracks': {
      get: {
        summary: 'Get all tracks',
        description: 'Get all tracks\n',
        tags: [
          'tracks'
        ],
        responses: {
          200: {
            description: 'Tracks list',
            schema: {
              $ref: '#/definitions/Tracks'
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
    '/tracks/between/{from}/and/{to}': {
      get: {
        summary: 'Get all tracks',
        description: 'Get all tracks\n',
        tags: [
          'tracks'
        ],
        parameters: [{
          "name": "from",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Unix time in ms"
        },
        {
          "name": "to",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Unix time in ms"
        }],
        responses: {
          200: {
            description: 'Tracks list',
            schema: {
              $ref: '#/definitions/Tracks'
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
    '/tracks/{id}': {
          get: {
            summary: 'Get all tracks',
            description: 'Get all tracks\n',
            tags: [
              'tracks'
            ],
            parameters: [{
                "name": "id",
                "in": "path",
                "required": true,
                "type": "string"
               }],
            responses: {
              200: {
                description: 'Track with route points',
                schema: {
                  $ref: '#/definitions/Track'
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
        ,
    '/tracksmeta': {
      get: {
        summary: 'Get all tracks meta',
        description: 'Get all tracks\n',
        tags: [
          'tracks'
        ],
        responses: {
          200: {
            description: 'Tracks list',
            schema: {
              $ref: '#/definitions/TracksMeta'
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
    '/tracksmeta/between/{from}/and/{to}': {
      get: {
        summary: 'Get all tracks',
        description: 'Get all tracks\n',
        tags: [
          'tracks'
        ],
        parameters: [{
          "name": "from",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Unix time in ms"
        },
        {
          "name": "to",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Unix time in ms"
        }],
        responses: {
          200: {
            description: 'Tracks list',
            schema: {
              $ref: '#/definitions/TracksMeta'
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
    '/dates/all': {
      get: {
        summary: 'Get all measurement points',
        description: 'Get all data per point\n',
        tags: [
          'points'
        ],
        responses: {
          200: {
            description: 'Sensors list',
            schema: {
              $ref: '#/definitions/Dates'
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
    '/dates/between/{from}/and/{to}': {
      get: {
        summary: 'Get all measurement points between specified date',
        description: 'Get all data per point\n',
        tags: [
          'points'
        ],
        parameters: [{
          "name": "from",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Unix time in ms"
        },
        {
          "name": "to",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Unix time in ms"
        }],
        responses: {
          200: {
            description: 'Sensors list',
            schema: {
              $ref: '#/definitions/Dates'
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
    '/images/dash/{iso_date}': {
      get: {
        summary: 'Get dash cam images for a date',
        description: 'Get dash cam images for a date\n',
        tags: [
          'images'
        ],
        parameters: [{
          "name": "iso_date",
          "in": "path",
          "required": true,
          "type": "string",
          "description": "Date in ISO format"
        }],
        responses: {
          200: {
            description: 'Sensors list',
            schema: {
              $ref: '#/definitions/Image'
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
  