const restConfig = require('../../config');
const apiSpec = require('./apiSpec');

const telldus = require('../../../../libs/telldus/tellduslive-api')


module.exports.getSensors = async (ctx, next) => {

    ctx.body = await telldus.getSensors();
};

module.exports.getDevices = async (ctx, next) => {

    ctx.body = await telldus.getDevices();
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