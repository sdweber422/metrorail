const { expect, chai } = require( 'chai' )
const db = require( '../db/config' ).db
const Station = require( '../db/commands/station' )
const Train = require( '../db/commands/train')
const Passenger = require( '../db/commands/passenger')

describe.only( 'Station', function() {

  it( 'should be a function', function() {
    expect( Station ).to.be.a( 'function' )
  })

  before( function() {
    return db.query( 'TRUNCATE trains, passengers')
    .then( () => Train.create( {
      trainNumber: 1,
      capacity: 100,
      numberOfPassengers: 1,
      currentStation: "Downtown",
      nextStation: "Elm Street"
    }))
    .then( () => Train.create({
      trainNumber: 2,
      capacity: 34,
      numberOfPassengers: 1,
      currentStation: "Annex",
      nextStation: "10th Ave"
    }))
    .then( () => Train.create({
      trainNumber: 5,
      capacity: 4000,
      numberOfPassengers: null,
      currentStation: "Parkside",
      nextStation: "Grand Boulevard"
    },
    {
      trainNumber: 12,
      capacity: 4,
      numberOfPassengers: null,
      currentStation: "Museum Isle",
      nextStation: "Downtown"
    }))
    .then( () => Passenger.create( {
      passenger_name: "James Bond",
      origin: "Downtown",
      destination: "10th Ave",
      train_number: 2,
      station_name: null
    }))
    .then( () => Passenger.create({
      passenger_name: "Jenny Bond",
      origin: "Colosseum",
      destination: null,
      train_number: null,
      station_name: "Colosseum"
    }))
    .then( () => Passenger.create({
      passenger_name: "Chris Evert",
      origin: "Elm Street",
      destination: null,
      train_number: null,
      station_name: "Elm Street"
    }))
    .then( () => Passenger.create({
      passenger_name: "Chris Webber",
      origin: "Elm Street",
      destination: "Annex",
      train_number: null,
      station_name: "Elm Street"
    }))
    .then( () => Passenger.create({
      passenger_name: "Jane Doe",
      origin: "Museum Isle",
      destination: "10th Ave",
      train_number: 1,
      station_name: null
    }))
  })

  describe( '.getStationID', function() {
    context( 'when given a station name that exists in the database', function() {
      it( 'should return the corresponding station number', function() {
        return Station.getStationID( 'Downtown' )
        .then( stationNumber => {
          expect( stationNumber ).to.eql( 1 )
        })
      })
    })

    context( 'when given a station name that does not exist in the database', function() {
      it( 'should throw a \'Station name does not exist\' error', function() {
        return Station.getStationID( 'Brompton' )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'Station name does not exist' )
        })
      })
    })

    context( 'when not given a value', function() {
      it( 'should throw a \'there is no parameter $1\' error', function() {
        return Station.getStationID()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '.getStationLocation', function() {
    context( 'when given a station number that exist in the database', function() {
      it( 'should return the corresponding station name', function() {
        return Station.getStationLocation( 2 )
        .then( stationName => {
          expect( stationName ).to.eql( 'Elm Street' )
        })
      })
    })

    context( 'when given a station number which does not exist in the database', function() {
      it( 'should throw a \'Station number does not exist\' error', function() {
        return Station.getStationLocation( 55 )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'Station number does not exist' )
        })
      })
    })

    context( 'when not given a value', function() {
      it( 'should throw a \'there is no parameter $1\' error', function() {
        return Station.getStationLocation()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '.getWaitingPassengers', function() {
    context( 'when given a station name that exists in the database', function() {
      it( 'should return all passengers at given station', function() {
        return Station.getWaitingPassengers( 'Elm Street' )
        .then( passengers => {
          expect( passengers ).to.be.instanceof( Array )
          expect( passengers.length ).to.eql( 2 )
        })
      })
    })
  })
})
