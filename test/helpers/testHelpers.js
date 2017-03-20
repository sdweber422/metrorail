const db = require( '../../db/config' ).db
const Station = require( '../../db/commands/station' )
const Train = require( '../../db/commands/train')
const Passenger = require( '../../db/commands/passenger')

const truncateTables = () => {
  return db.query( 'TRUNCATE trains, passengers, stations')
}

const createStations = () => {
  return Promise.resolve( new Station ( { stationNumber: 1, stationName: 'Downtown' } ) )
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 2, stationName: 'Elm Street'}))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 3, stationName: "Forest Gardens" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 4, stationName: "Annex" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 5, stationName: "10th Ave" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 6, stationName: "Waterfront" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 7, stationName: "Colosseum" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 8, stationName: "Central Station" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 9, stationName: "Parkside" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 10, stationName: "Grand Boulevard" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 11, stationName: "Monument Valley" }))
  .then( station => Station.save( station ) )
  .then( () => new Station ( { stationNumber: 12, stationName: "Museum Isle" }))
  .then( station => Station.save( station ) )
}


const createTrains = () => {
  return Promise.all([
    Train.create({
      trainNumber: 1,
      capacity: 100,
      numberOfPassengers: 1,
      currentStation: "Downtown",
      nextStation: "Elm Street"
    }),
    Train.create({
      trainNumber: 2,
      capacity: 34,
      numberOfPassengers: 1,
      currentStation: "Annex",
      nextStation: "10th Ave"
    }),
    Train.create({
      trainNumber: 5,
      capacity: 4000,
      numberOfPassengers: null,
      currentStation: "Parkside",
      nextStation: "Grand Boulevard"
    }),
    Train.create({
      trainNumber: 12,
      capacity: 4,
      numberOfPassengers: null,
      currentStation: "Museum Isle",
      nextStation: "Downtown"
    })
  ])
}

const createPassengers = () => {
  return Promise.all([
    Passenger.create({
      passengerName: "James Bond",
      origin: "Downtown",
      destination: "10th Ave",
      trainNumber: 2,
      stationName: null
    }),
    Passenger.create({
      passengerName: "Jenny Bond",
      origin: "Colosseum",
      destination: null,
      trainNumber: null,
      stationName: "Colosseum"
    }),
    Passenger.create({
      passengerName: "Chris Evert",
      origin: "Elm Street",
      destination: null,
      trainNumber: null,
      stationName: "Elm Street"
    }),
    Passenger.create({
      passengerName: "Chris Webber",
      origin: "Elm Street",
      destination: "Annex",
      trainNumber: null,
      stationName: "Elm Street"
    }),
    Passenger.create({
      passengerName: "Jane Doe",
      origin: "Museum Isle",
      destination: "10th Ave",
      trainNumber: 1,
      stationName: null
    })
  ])
}

module.exports = {
  Train,
  Station,
  Passenger,
  truncateTables,
  createTrains,
  createStations,
  createPassengers
}
