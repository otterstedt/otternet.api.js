var config = require('config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');




const host = config.endpoints.tracks.host;
const port = config.endpoints.tracks.port;

const dashcamFrontPath = config.paths.images.dashcam.front;



// Connection URL
const url = 'mongodb://' + host + ':' + port;

// Database Name
const dbName = 'production';

function mongoClientDb() {

    return MongoClient.connect(url + '/' + dbName)
    .then(db => {
        return db;
    })
    .catch(error => {
       return mongoClientDb();
       throw("Unable to connect to DB: " + error);
    })

}


module.exports.getPoints = (from = 0, to = (new Date().getTime())) => {

    return mongoClientDb()
      .then(db => {


        return db.collection('points').find(  { time: { 
                                                  $gt: from,
                                                  $lt: to
                                                } 
                                              } ).toArray()

      })
      .then(points => {

        console.log(points);
        console.log("Balle");

        return points;

      })
      .catch(error => {
        console.error(error)
      })

}

module.exports.getPointByTimeStamp = (timestamp) => {

    return mongoClientDb()
      .then(db => {

        timestamp = parseInt(timestamp);

        return db.collection('points').find({ time: { $eq: timestamp } }).toArray()

      })
      .then(point => {

        console.log(point);

        return (point.length == 1 ? point[0] : null);

      })
      .catch(error => {
        console.error(error)
      })

}

module.exports.getLastPosition = () => {

  return mongoClientDb()
    .then(db => {

      return db.collection('points').find().sort({ "time": -1  }).limit(1).toArray()

    })
    .then(point => {

      return (point.length == 1 ? point[0] : null);

    })
    .catch(error => {
      console.error(error)
    })

};

module.exports.getTracksMeta = (from = 0, to = (new Date().getTime())) => {


  return mongoClientDb()
  .then(db => {

    
    return this.getTracks(from,to)


  })
  .then(sortedTracks => {

    return {
      tracks: sortedTracks.length,
      first: sortedTracks.length ? sortedTracks[0] : null,
      last: sortedTracks.length ? sortedTracks[sortedTracks.length -1] : null
    }

  })
  .catch(error => {
    console.error(error)
  })


}


module.exports.getTracks = (from = 0, to = (new Date().getTime())) => {

    

    return mongoClientDb()
      .then(db => {

        
        return db.collection('points').aggregate([
                                                      { $match: { time: { 
                                                          $gt: parseInt(from),
                                                          $lt: parseInt(to)

                                                      },
                                                       
                                                    } },
                                                      { $sort: { trackid: 1, time: 1  } },
                                                      {
                                                        $group:
                                                          {
                                                            _id: "$trackid",
                                                            isostart: { $min: "$iso_date" },
                                                            isoend: { $max: "$iso_date" },
                                                            unixstart: { $min: "$time" },
                                                            unixend: { $max: "$time" },
                                                            origin: { $first: "$location"},
                                                            destination: { $last: "$location"},
                                                            points_count: { $sum: 1 }  
                                                            //route: { $push: "$location"}

                                                          }
                                                      },
                                                      { $sort: { unixstart: 1  } }
                                                    ],
                                                    {allowDiskUse: true}).toArray()

      })
      .then(trackids => {

        return trackids.map(track => {

            return {
                id: track._id,
                points_count: track.points_count,
                sum: track.sum,
                start: {
                    iso: track.isostart,
                    unix: track.unixstart,
                    location: track.origin
                },
                end: {
                    iso: track.isoend,
                    unix: track.unixend,
                    location: track.destination
                },
                //route: track.route
            }
        });

      })
      .catch(error => {
        console.error(error)
      })

}

module.exports.getTrackByTrackId = (trackId) => {

    console.log("Get track ID: " + trackId);

    return mongoClientDb()
      .then(db => {



         //match and group by specified track id
         return db.collection('points').aggregate([
                                                       { $match : { trackid : trackId } },
                                                       { $sort: { time: 1  } },
                                                       {
                                                         $group:
                                                           {
                                                             _id: "$trackid",
                                                             isostart: { $min: "$iso_date" },
                                                             isoend: { $max: "$iso_date" },
                                                             unixstart: { $min: "$time" },
                                                             unixend: { $max: "$time" },
                                                             origin: { $first: "$location"},
                                                             destination: { $last: "$location"},
                                                             points: {
                                                                $push: {
                                                                    trackid: "$trackid",
                                                                    time: "$time",
                                                                    iso_date: "$iso_date",
                                                                    speed: "$speed",
                                                                    altitude: "$altitude",
                                                                    pressure: "$pressure",
                                                                    humidity: "$humidity",
                                                                    pressure: "$pressure",
                                                                    acceleration: "$acceleration",
                                                                    gravity: "$gravity",
                                                                    course: "$course",
                                                                    climb: "$climb",
                                                                    temperature: "$temp",
                                                                    location: "$location"

                                                                }
                                                             }

                                                           }
                                                       },
                                                       {
                                                         $addFields: { id: "$_id"}
                                                       },
                                                       {
                                                         $project: { _id: 0 }
                                                       }
                                                     ],
                                                     {allowDiskUse: true}).toArray()

      })
      .then(sortedPoints => {


        return sortedPoints.length ? sortedPoints[0] : null;


      })
      .catch(error => {
        console.error(error)
      })

}

module.exports.getAvailableDates = (from = 0, to = (new Date().getTime())) => {

  return mongoClientDb()
      .then(db => {



         //match and group by specified track id
          return db.collection('points').aggregate([               { $match: { time: { 
                                                                      $gt: parseInt(from),
                                                                      $lt: parseInt(to)

                                                                      }
                                                                    }
                                                                  },
                                                                  { "$addFields": {
                                                                    "date": {
                                                                      "$add": [ new Date(0), "$time" ]
                                                                    }
                                                                  }},
                                                                  { "$group": {
                                                                    "_id": {
                                                                      "$dateToString": {
                                                                        "format": "%Y-%m-%d",
                                                                        "date": "$date"
                                                                      }
                                                                    },
                                                                    points_count: { $sum: 1 },
                                                                    trackids: { "$addToSet": "$trackid" } //How to just get the unique trackid count?

                                                                  }
                                                                },
                                                                  { $project: {
                                                                    "_id": 0,
                                                                    "date": "$_id",
                                                                    "points_count": "$points_count",
                                                                    "tracks_count": { $size: "$trackids"}
                                                                  }
                                                                  },
                                                                  { $sort : { date : 1} },
                                                      ],
                                                     {allowDiskUse: true}).toArray()

/*
       { "$addFields": {
                                                                    "date": {
                                                                      "$add": [ new Date(0), "$time" ]
                                                                    }
                                                                  }},
                                                                  { "$group": {
                                                                    "_id": {
                                                                      "$dateToString": {
                                                                        "format": "%Y-%m-%d",
                                                                        "date": "$date"
                                                                      }
                                                                    },
                                                                    "deposits": {
                                                                      "$push": "$$ROOT"
                                                                    }
                                                                  }}
*/                                                                  


                            })
                            .then(dates => {


                              return dates.map(date => {
                                return {
                                  date: date.date,
                                  points_count: date.points_count,
                                  tracks_count: date.tracks_count
                                }

                              });
                      
                      
                            })
                            .catch(error => {
                              console.error(error)
                            })


}


module.exports.getDashcamImageForIsoDate = (iso_date) => {

  console.log("Getting image for iso: " + iso_date)

  
  var imageAsBase64 = new Promise((resolve, reject) => {

    var img = null;

    

    
    try {
      var iso_day = iso_date.split("T")[0]

      img = fs.readFileSync(config.paths.images.dashcam.front + "/" +  iso_day + "/" + iso_date + ".jpg", 'base64')
      resolve(img)
    }
    catch(error){
      reject(error);
    }


  })
  .then(content => {
    return content;
  })
  .catch(error => {
    console.error("Image error: " + error);

    return null;
  })

  return imageAsBase64
  .then(content => {
    return {
      front: content
    }
})

}
