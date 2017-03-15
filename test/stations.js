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
    return db.query( 'TRUNCATE trains, passengers, stations')
    .then( () => new Station ( { stationNumber: 1, stationName: 'Downtown' }))
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
    .then( () => Promise.all([
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
    ]))
    .then( () => Promise.all([
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
    ]))
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
    context( 'when given a station number that exists in the database', function() {
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

    context( 'when given a station name that does not exist in the database', function() {
      it( 'should return an empty array', function() {
        return Station.getWaitingPassengers( 'Brompton' )
        .then( passengers => {
          expect( passengers ).to.be.instanceof( Array )
          expect( passengers.length ).to.eql( 0 )
        })
      })
    })

    context( 'when not given a parameter', function() {
      it( 'should throw \'there is no parameter $1\' error', function() {
        return Station.getWaitingPassengers()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '.getTicketedPassengers', function() {
    context( 'when given a station name that exists in the database', function() {
      it( 'should return all passengers with a ticket at given station', function() {
        return Station.getTicketedPassengers( 'Elm Street' )
        .then( passengers => {
          expect( passengers ).to.be.instanceof( Array )
          expect( passengers.length ).to.eql( 1 )
        })
      })
    })

    context( 'when given a station name that does not exist in the database', function() {
      it( 'should return an empty array', function() {
        return Station.getTicketedPassengers( 'Brompton' )
        .then( passengers => {
          expect( passengers ).to.be.instanceof( Array )
          expect( passengers.length ).to.eql( 0 )
        })
      })
    })

    context( 'when not given a parameter', function() {
      it( 'should throw \'there is no parameter $1\' error', function() {
        return Station.getTicketedPassengers()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '.getPreviousStation', function() {
    context( 'when given a station name that exists in the database', function() {
      it( 'should return the name of previous station in the database by station number', function() {
        return Station.getPreviousStation( 'Downtown' )
        .then( previousStation => {
          expect( previousStation ).to.eql( 'Museum Isle' )
        })
      })
    })

    context( 'when given a station that does not exist in the database', function() {
      it( 'should throw \'Station name does not exist\' error', function() {
        return Station.getPreviousStation( 'Brompton' )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'Station name does not exist' )
        })
      })
    })

    context( 'when not given a parameter', function() {
      it( 'should throw \'there is no parameter $1\' error', function() {
        return Station.getPreviousStation()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '.getNextStation', function() {
    context( 'when given a station that exists in the database', function() {
      it( 'should return the name of the next station in the database', function() {
        return Station.getNextStation( 'Downtown' )
        .then( nextStation => {
          expect( nextStation ).to.eql( 'Elm Street' )
        })
      })
    })

    context( 'when given a station that does not exist in the database', function() {
      it( 'should throw \'Cannot read property \'station_number\' of undefined\' error', function() {
        return Station.getNextStation( 'Brompton' )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'Cannot read property \'station_number\' of undefined' )
        })
      })
    })

    context( 'when not given a parameter', function() {
      it( 'should throw \'there is no parameter $1\' error', function() {
        return Station.getNextStation()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '#getNextArrivingTrainAtStation', function() {
    context( 'when called upon a station instance', function() {
      it( 'should return the next arriving train', function() {
        return Station.findByLocation( 'Downtown' )
        .then( downtown => downtown.getNextArrivingTrainAtStation() )
        .then( nextTrain => {
          expect( nextTrain ).to.be.instanceof( Train )
          expect( nextTrain ).to.eql({
            trainNumber: 12,
            currentStation: 'Museum Isle',
            nextStation: 'Downtown',
            capacity: 4,
            numberOfPassengers: 0
          })
        })
      })
    })
  })

  describe( '.findByID', function() {
    context( 'when given a station number that exists in the database', function() {
      it( 'should return the correct station instance', function() {
        return Station.findByID( 1 )
        .then( station => {
          expect( station ).to.be.instanceof( Station )
          expect( station ).to.eql({
            stationNumber: 1,
            stationName: 'Downtown'
          })
        })
      })
    })

    context( 'when given a station number that does not exist in the database', function() {
      it( 'should throw \'Station number does not exist\' error', function() {
        return Station.findByID( 999 )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'Station number does not exist' )
        })
      })
    })

    context( 'when not given a parameter', function() {
      it( 'should throw \'there is no parameter $1\' error', function() {
        return Station.findByID()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '.findByLocation', function() {
    context( 'when given a station name that exists in the database', function() {
      it( 'should return the correct station instance', function() {
        return Station.findByLocation( 'Annex' )
        .then( station => {
          expect( station ).to.be.instanceof( Station )
          expect( station ).to.eql({
            stationNumber: 4,
            stationName: 'Annex'
          })
        })
      })
    })

    context( 'when given a station name that does not exist in the database', function() {
      it( 'should throw \'Station name does not exist\' error', function() {
        return Station.findByLocation( 'Brompton' )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'Station name does not exist' )
        })
      })
    })

    context( 'when not given a parameter', function() {
      it( 'should throw \'there is no parameter $1\' error', function() {
        return Station.findByLocation()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe( '.create', function() {
    context( 'when given an object with a station name and number', function() {
      it( 'should return a new train object', function() {
        return Station.create( { stationNumber: 13, stationName: 'Laughlin' } )
        .then( station => {
          expect( station ).to.be.instanceof( Station )
          expect( station ).to.eql({
            stationNumber: 13,
            stationName: 'Laughlin'
          })
        })
      })
    })

    context( 'when given an object with a station number below 1', function() {
      it( 'should create a station instance with the train number set to the number of stations in the database + 1', function() {
        return Station.create( { stationNumber: -5, stationName: 'Harold Ave' } )
        .then( station => {
          expect( station ).to.be.instanceof( Station )
          expect( station ).to.eql({
            stationNumber: 14,
            stationName: 'Harold Ave'
          })
        })
      })
    })

    context( 'when given an object with a station number above the number of stations in the database', function() {
      it( 'should create a station instance with the train number set to the number of stations in the database + ', function() {
        return Station.create( { stationNumber: 555, stationName: 'Lee St' } )
        .then( station => {
          expect( station ).to.be.instanceof( Station )
          expect( station ).to.eql({
            stationNumber: 15,
            stationName: 'Lee St'
          })
        })
      })
    })

    context( 'when given an object with a station number that already exists in the database', function() {
      it( 'should create an object with that station number', function() {
        return Station.create( { stationNumber: 14, stationName: 'Emily Way' } )
        .then( station => {
          expect( station ).to.be.instanceof( Station )
          expect( station ).to.eql({
            stationNumber: 14,
            stationName: 'Emily Way'
          })
        })
      })
      it( 'should increase the station number of the station that was at its new position by 1', function() {
        return Station.findByLocation( 'Harold Ave')
        .then( station => {
          expect( station.stationNumber ).to.eql( 15 )
        })
      })
      it( 'should increase by 1 the station numbers of the proceeding stations', function() {
        return Station.findByLocation( 'Lee St' )
        .then( station => {
          expect( station.stationNumber ).to.eql( 16 )
        })
      })
    })

    context( 'when given an object with a station name that already exists in the database', function() {
      it( 'should throw \'duplicate key value violates unique constraint "stations_pkey"\' error', function() {
        return Station.create({ stationNumber: 15, stationName: 'Annex' } )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'duplicate key value violates unique constraint "stations_pkey"')
        })
      })
    })
  })

  describe( '.save', function() {
    context( 'when given a station object with a valid station number and name', function() {
      it( 'should enter the station into the database', function() {
        Station.save( { stationNumber: 18, stationName: 'Elmhurst' } )
        .then( station => {
          expect( station ).to.not.be.undefined
          expect( station.station_number ).to.eql( 18 )
          expect( station.station_name ).to.eql( 'Elmhurst' )
        })
      })
    })

    context( 'when given a station name that already exists in the database', function() {
      it( 'should throw \'duplicate key value violates unique constraint "stations_pkey"\' error', function() {
        Station.save( { stationNumber: 19, stationName: 'Elmhurst' } )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'duplicate key value violates unique constraint "stations_pkey"' )
        })
      })
    })
  })
})
