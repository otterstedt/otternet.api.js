const endpoints = require('./endpoints');

let config = {
    routes: [
        {   verb: 'GET',  name: 'api', url: '/api', func: endpoints.get  },
        {   verb: 'POST', name: 'api', url: '/api', func: endpoints.swagger }
    ]
}


module.exports = config;
