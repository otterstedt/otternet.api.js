const restConfig = require('../../config');
const apiSpec = require('./apiSpec');

const tracksApi = require('../../../../libs/tracks/tracks-api')

module.exports.getLastPosition = async (ctx, next) => {

    ctx.body = await tracksApi.getLastPosition();
};

module.exports.getPoints = async (ctx, next) => {

    ctx.body = await tracksApi.getPoints();
};

module.exports.getTracks = async (ctx, next) => {

    var from = ctx.params.from;
    var to = ctx.params.to;

    ctx.body = await tracksApi.getTracks(from, to);

};

module.exports.getTracksMeta = async (ctx, next) => {

    var from = ctx.params.from;
    var to = ctx.params.to;

    ctx.body = await tracksApi.getTracksMeta(from, to);

};

module.exports.getTracksByTrackId = async (ctx, next) => {

    var trackId = ctx.params.id;

    ctx.body = await tracksApi.getTrackByTrackId(trackId)
};

module.exports.getPointByTimeStamp = async (ctx, next) => {

    var timestamp = ctx.params.timestamp;

    ctx.body = await tracksApi.getPointByTimeStamp(timestamp)
};

module.exports.getAvailableDates = async (ctx, next) => {

    var from = ctx.params.from;
    var to = ctx.params.to;

    ctx.body = await tracksApi.getAvailableDates(from, to);
};

module.exports.getDashcamImageForIsoDate = async (ctx, next) => {

    var iso_date = ctx.params.iso_date;

    ctx.body = await tracksApi.getDashcamImageForIsoDate(iso_date);
};

