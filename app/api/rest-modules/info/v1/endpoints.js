const restConfig = require('../../config');
const apiSpec = require('./apiSpec');


module.exports.get = (ctx, next) => {
    ctx.body =  {
        type: 'GET',
        dummy: 123,
        mocking: 'bird',
        rest: restConfig.restInterfaces.filter(interface => { return interface.enabled; })
    }
};

module.exports.post = (ctx, next) => {
    ctx.body =  {
        type: 'POST',
        dummy: 987
    }
};

module.exports.swagger = (ctx, next) => {
    ctx.body =  {
        document: apiSpec
    }
};