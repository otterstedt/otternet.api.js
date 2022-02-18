const endpoints = require('./endpoints');

let config = {
    routes: [
        {   verb: 'GET',  name: 'telldus', url: '/sensors', func: endpoints.getSensors  },
        {   verb: 'GET',  name: 'telldus', url: '/devices', func: endpoints.getDevices  },
        {   verb: 'POST', name: 'api', url: '/sensors', func: endpoints.swagger }
    ]
}


module.exports = config;
