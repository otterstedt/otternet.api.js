const gpsd = require('../../libs/gpsd/gpsd-api');

module.exports.getGpsData = () => {

    
    let tpv = gpsd.getTpv();

    let age = (tpv.apptime ? (Date.now() - tpv.apptime) : null);

    if(age && age < 5000) {
        tpv.status = 200;
        
    }
    else {
        tpv.status = 503
    }

    return Promise.resolve(tpv);

};