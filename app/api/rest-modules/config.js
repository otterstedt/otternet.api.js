module.exports = {
    swagger: {
        info: {
            title: 'Miscellaneous endpoints',
            description: 'Collection of APIs for a simpler life.',
            version: '0.1',
            contact: {
              name: 'Michael Otterstedt',
              url: 'http://www.otternet.ca',
              email: 'otterstedt@otternet.ca'
            },
            license: {
              name: 'Smålandia Group - Otternet'
            }
          },
    },
    swaggerPath: '/swagger', //path prefix to where the swagger docs will be available
    restInterfaces: [
        {
            name: 'info v1', //name of the API
            path: '/info/v1',  //path to the API folder in application, also API endpoint URL
            enabled: true //if it should be available to consume
        },
        {
            name: 'Telldus v1', //name of the API
            path: '/telldus/v1',  //path to the API folder in application, also API endpoint URL
            enabled: true //if it should be available to consume
        },
        {
            name: 'Tracks v1', //name of the API
            path: '/tracks/v1',  //path to the API folder in application, also API endpoint URL
            enabled: true //if it should be available to consume
        }
    ]
};