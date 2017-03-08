// import chai, { expect } from 'chai'
// import Trains from '../db/commands/trains'
const chai = require( 'chai' )
const expect = chai.expect
const db = require( '../db/config' ).db
const Trains = require( '../db/commands/trains' )

describe('Trains', function() {

  let firstTrain, secondTrain


  beforeEach( function() {
    db.query("TRUNCATE trains")
    // console.log( 'firstTrain', firstTrain )
  })

  it('should be a function', function() {
    expect( Trains ).to.be.a( 'function' )
  })

  describe('#getTrainNumber', function() {
    context('when given the station number 1', function() {
      it('should return the first train in the train table', function() {
        
        return Trains.getTrainNumber( 1 )
        .then( train => {
          console.log( 'this is the empty array', train )
          expect( train ).to.eql( 72 )
        })
      })
    })
  })

  // describe('#getTrainNumber', function() {
  //   context('when given the station number 1', function() {
  //     it('should return the first train in the train table', function() {
  //       return Promise.resolve(firstTrain = new Trains())
  //       .then( _ => Trains.getTrainNumber( 1 )
  //       .then( train => {
  //         console.log( 'this is the empty array', train )
  //         expect( train ).to.eql( 72 )
  //       }))
  //     })
  //   })
  // })
})
