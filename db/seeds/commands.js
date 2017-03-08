const db = require( '../commands/config' ).db

function insertIntoTrains( capacityAndStationArray ){
  [...arguments].forEach( (trainData) => {
    return db.none( `INSERT INTO trains ( capacity, passengers, current_station, next_station ) VALUES ( $1, $2, $3, $4 )`, [trainData[0], trainData[1], trainData[2], (trainData[2]%12)+1])
  })
}

function insertIntoStations( locations ){
  [...arguments].forEach( (stationName) => {
    return db.none( `INSERT INTO stations ( location ) VALUES ( $1 )`, stationName )
  })
}

function insertIntoPassengers( passengerData ) {
  [...arguments].forEach( (passenger) => {
    return db.none( `INSERT INTO passengers ( name, origin, destination, train_id, station_id ) VALUES ( $1, $2, $3, $4, $5 )`, [ passenger.name, passenger.origin, passenger.destination, passenger.train_id, passenger.station_id ] )
  })
}

module.exports = { insertIntoTrains, insertIntoStations, insertIntoPassengers }
