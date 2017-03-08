// import chai, { expect } from 'chai'
// import Trains from '../db/commands/trains'
const chai = require( 'chai' )
const expect = chai.expect
const db = require( '../db/config' ).db
const Train = require( '../db/commands/train' )


describe('Train', function() {

  let firstTrain, secondTrain


  beforeEach( function () {
    db.query("TRUNCATE trains")
    return Promise.all([
      firstTrain = new Train( 1 ),
      secondTrain = new Train( 2 )
    ])
  })

  it('should be a function', function() {
    expect( Train ).to.be.a( 'function' )
  })

  describe('.getTrainNumber', function() {
    context('when given the station number "Downtown"', function() {
      it('should return train number 1', function() {

        return Train.getTrainNumber( "Downtown" )
        .then( train => {
          expect( train ).to.eql( 1 )
        })
      })
    })
  })

  describe('.getNextStation', function() {
    context('when given station "Downtown"', function() {
      it('should return "Elm Street"', function() {
        return Train.getNextStation( "Downtown" )
        .then( result => {
          expect( result.station_name ).to.eql( "Elm Street" ) 
        })
      })
    })
  })
})
