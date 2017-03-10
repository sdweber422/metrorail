const db = require( './config' ).db
const pgp = require( './config' ).pgp

const getNextStation = function(current_station){
  return db.any(`SELECT station_number, (SELECT COUNT(*) FROM stations) FROM stations WHERE station_name = $1 GROUP BY station_number`, current_station)
  .then( result => {
    let nextStationNumber = result[0].station_number % result[0].count + 1
    return db.one(`SELECT station_name FROM stations WHERE station_number = $1`, nextStationNumber)
  })
    .then( result => result.station_name )
}

module.exports = { getNextStation }
