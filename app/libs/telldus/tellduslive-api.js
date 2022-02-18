var TelldusAPI = require('telldus-live');
var config = require('config');

var publicKey    = config.access.telldus.publicKey
  , privateKey   = config.access.telldus.privateKey
  , token        = config.access.telldus.token
  , tokenSecret  = config.access.telldus.tokenSecret
  , cloud
  ;

cloud = new TelldusAPI.TelldusAPI({ publicKey  : publicKey
                                  , privateKey : privateKey }).login(token, tokenSecret, function(err, user) {
  if (!!err) return console.log('login error: ' + err.message);

  // otherwise, good to go!
  console.log('user: '); console.log(user);
}).on('error', function(err) {
  console.log('background error: ' + err.message);
});

module.exports.getSensors = () => {

    return new Promise((resolve, reject) => {
        
        cloud.getSensors(function(err, sensors) {
        if (!!err) reject(err);
      
        console.log("Sensors: ", sensors);

        resolve(sensors) ;
      });

    }).then(sensors => {
        return Promise.all(sensors.map(sensor => {

            return this.getSensorById(sensor.id);

        }));
    })

} 

module.exports.getSensorById = (id) => {


    return new Promise((resolve, reject) => {
                
        cloud.getSensorInfo({id: id}, function(err, sensor) {
        if (!!err) reject(err);
      
        resolve(sensor);
        
      });

    });

};


module.exports.getDevices = () => {

    return new Promise((resolve, reject) => {
        
        cloud.getDevices(function(err, devices) {
        if (!!err) reject(err);
      
        console.log("Devices: ", devices);

        resolve(devices) ;
      });

    }).then(devices => {
        return Promise.all(devices.map(device => {

            return this.getDeviceById(device.id);

        }));
    })

} 

module.exports.getDeviceById = (id) => {


    return new Promise((resolve, reject) => {
                
        cloud.getDeviceInfo({id: id}, function(err, device) {
        if (!!err) reject(err);
      
        resolve(device);
        
      });

    });

};