
const chai = require( 'chai' )
const expect = chai.expect
const db = require( '../db/config' ).db
const Train = require( '../db/commands/train' )


describe('Train', function() {

  let firstTrain, secondTrain


  beforeEach( function () {
    return Promise.all([
      db.query("TRUNCATE trains"),
      firstTrain = new Train( 1 ),
      secondTrain = new Train( 2, "Downtown" )
    ])
  })

  it('should be a function', function() {
    expect( Train ).to.be.a( 'function' )
  })

  describe('.getTrainNumber', function() {
    context('when given the station number "Downtown"', function() {
      it('should return train number 1', function() {
        return Train.getTrainNumber( 'Downtown' )
        .then( trainData => {
          expect( trainData ).to.contain( 1 && 2 )
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
})
