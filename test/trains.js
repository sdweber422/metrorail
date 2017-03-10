
const chai = require( 'chai' )
const expect = chai.expect
const db = require( '../db/config' ).db
const Train = require( '../db/commands/train' )
const Metro = require( '../db/Metro' )

describe('Train', function() {

  it('should be a function', function() {
    expect( Train ).to.be.a( 'function' )
  })

  describe('.getTrainNumber', function() {
    context('when given the station number "Downtown"', function() {
      it('should return train number 1', function() {
        return Train.getTrainNumber( 'Downtown' )
        .then( trainData => {
          expect( trainData ).to.include( 1, 2 )
        })
      })
    })
    context('when given a station where no train exists', function() {
      it('should return no value', function() {
        return Train.getTrainNumber( 'Colosseum' )
        .then( trainData => {
          expect( trainData.length ).to.eql( 0  )
        })
      })
    })
    // context('when not given a parameter', function() {
    //   it('should throw an error', function() {
    //     return Train.getTrainNumber()
    //     .then( trainData => {
    //       expect( trainData).to.eql( 'error: there is no parameter $1' )
    //     })
    //   })
    // })
  })

  describe('.getNextStation', function() {
    context('when given station "Downtown"', function() {
      it('should return "Elm Street"', function() {
        return Train.getNextStation( 'Downtown' )
        .then( result => {
          expect( result.station_name ).to.eql( "Elm Street" )
        })
      })
    })
  })

  describe('.create', function() {
    context('when called with 11', function() {
      it('should create a train object', function() {
        metro = Train.create( metro, { trainNumber: 11 } )
        console.log( 'metro', metro )
        expect( metro.trains[11].currentStation ).to.eql( "Downtown" )
      })
      // it('should add the train to the database', function() {
      //
      // })
    })
  })
})
