// import chai, { expect } from 'chai'
// import Trains from '../db/commands/trains'
const chai = require( 'chai' )
const expect = require( 'chai' ).expect
const Trains = require( '../db/commands/trains' )

describe('Trains', function() {

  it('should be a function', function() {
    expect( Trains ).to.be.a( 'function' )
  })
})
