const endpoints = require('./endpoints');

let config = {
    routes: [
        {   verb: 'GET',  name: 'points', url: '/points', func: endpoints.getPoints  },
        {   verb: 'GET',  name: 'points', url: '/points/:timestamp', func: endpoints.getPointByTimeStamp  },
        {   verb: 'GET',  name: 'points', url: '/dates/all', func: endpoints.getAvailableDates  },
        {   verb: 'GET',  name: 'points', url: '/position/latest', func: endpoints.getLastPosition  },
        {   verb: 'GET',  name: 'dates', url: '/dates/between/:from/and/:to', func: endpoints.getAvailableDates  },
        {   verb: 'GET',  name: 'tracks', url: '/tracks', func: endpoints.getTracks  },
        {   verb: 'GET',  name: 'tracks', url: '/tracks/between/:from/and/:to', func: endpoints.getTracks  },
        {   verb: 'GET',  name: 'tracks', url: '/tracks/:id', func: endpoints.getTracksByTrackId  },
        {   verb: 'GET',  name: 'tracks', url: '/tracksmeta', func: endpoints.getTracksMeta  },
        {   verb: 'GET',  name: 'tracks', url: '/tracksmeta/between/:from/and/:to', func: endpoints.getTracksMeta  },
        {   verb: 'GET',  name: 'images', url: '/images/dash/:iso_date', func: endpoints.getDashcamImageForIsoDate }
    ]
}


module.exports = config;
