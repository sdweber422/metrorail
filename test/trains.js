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

  describe('#getTrainNumber', function() {
    context('when given the station number 1', function() {
      it('should return the first train in the train table', function() {

        return Train.getTrainNumber( 1 )
        .then( train => {
          console.log( 'this is the empty array', train )
          expect( train ).to.eql( 41 )
        })
      })
    })
  })
})
