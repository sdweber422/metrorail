const db = require( '../config' ).db

function insertIntoTrains( trainSeeds ){
  [...arguments].forEach( (trainSeed) => {
    return db.none( `INSERT INTO trains ( train_number, train_capacity, train_passengers, current_station, next_station ) VALUES ( $1, $2, $3, $4, $5 )`, [trainSeed.train_number, trainSeed.train_capacity, trainSeed.train_passengers, trainSeed.current_station, trainSeed.next_station])
  })
}

function insertIntoStations( stationSeeds ){
  [...arguments].forEach( (stationSeed) => {
    return db.none( `INSERT INTO stations ( station_number, station_name ) VALUES ( $1, $2 )`, [stationSeed.station_number, stationSeed.station_name] )
  })
}

function insertIntoPassengers( passengerSeeds ) {
  [...arguments].forEach( (passengerSeed) => {
    return db.none( `INSERT INTO passengers ( passenger_name, origin, destination, train_number, station_name ) VALUES ( $1, $2, $3, $4, $5 )`, [ passengerSeed.passenger_name, passengerSeed.origin, passengerSeed.destination, passengerSeed.train_number, passengerSeed.station_name ] )
  })
}

module.exports = { insertIntoTrains, insertIntoStations, insertIntoPassengers }
