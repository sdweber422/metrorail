
const { expect, chai } = require( 'chai' )
const {
  Train,
  Station,
  Passenger,
  truncateTables,
  createTrains,
  createStations,
  createPassengers } = require( '../helpers/testHelpers')

describe('Train', function() {

  before( function() {
    return truncateTables()
    .then( () => createStations() )
    .then( () => createTrains() )
    .then( () => createPassengers() )
  })

  it('should be a function', function() {
    expect( Train ).to.be.a( 'function' )
  })

  describe( '.getAllTrains', function() {
    context( 'when called', function() {
      it( 'should return an array of Train objects representing all trains in the database', function() {
        Train.getAllTrains()
        .then( allTrains => {
          expect( allTrains.length ).to.eql( 4 )
          expect( allTrains[0].train_number ).to.eql( 1 )
          expect( allTrains[2].capacity ).to.eql( 4000 )
        })
      })
    })
  })

  describe('.getTrainNumber', function() {
    context('when given the station location "Downtown"', function() {
      it('should return train number 1', function() {
        return Train.getTrainNumber( 'Downtown' )
        .then( trainNumber => {
          expect( trainNumber ).to.eql( 1 )
        })
      })
    })
    context('when given a station where no train exists', function() {
      it('should return no value', function() {
        return Train.getTrainNumber( 'Colosseum' )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'No train at given station' )
        })
      })
    })
    context('when given no parameter', function() {
      it( 'should throw \'there is no parameter $1\' error', function() {
        return Train.getTrainNumber()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  describe('.create', function() {
    context('when called with an object containing train data', function() {
      it('should return a train object', function() {
        return Train.create({
          trainNumber: 55,
          capacity: 100,
          numberOfPassengers: null,
          currentStation: "Parkside",
          nextStation: "Grand Boulevard"
        })
        .then( createdTrain => {
          expect( createdTrain ).to.be.an( 'object' )
          expect( createdTrain.trainNumber ).to.eql( 55 )
          expect( createdTrain.capacity ).to.eql( 100 )
          expect( createdTrain.numberOfPassengers ).to.eql( 0 )
          expect( createdTrain.currentStation ).to.eql( 'Parkside' )
          expect( createdTrain.nextStation ).to.eql( 'Grand Boulevard' )
        })
      })
    })
  })

  describe( '.getNextStation', function() {
    context( 'when given the station location \'Downtown\'', function() {
      it( 'should return \'Elm Street\'', function() {
        return Train.getNextStation( 'Downtown' )
        .then( nextStation => {
          expect( nextStation ).to.eql( 'Elm Street' )
        })
      })
    })
    context( 'when given a station location that does not exist in the database', function() {
      it( 'should return a error', function() {
        return Train.getNextStation( 'Brompton' )
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'Cannot read property \'station_number\' of undefined' )
        })
      })
    })
    context( 'when not given a parameter', function() {
      it( 'should throw a \'there is no parameter $1\' error', function() {
        return Train.getNextStation()
        .catch( err => {
          expect( err ).to.not.be.undefined
          expect( err ).to.be.instanceof( Error )
          expect( err.message ).to.eql( 'there is no parameter $1' )
        })
      })
    })
  })

  // describe('#getCapacity()', function() {
  //   context('when called on a train with capacity of 52', function() {
  //     it('should return 52', function() {
  //       return Promise.resolve( firstTrain.getCapacity() )
  //       .then( capacity => {
  //         expect( capacity ).to.eql( 52 )
  //       })
  //     })
  //   })
  // })
})
