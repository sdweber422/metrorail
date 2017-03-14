const chai = require( 'chai' )
const expect = chai.expect
const assert = chai.assert
const db = require( '../db/config' ).db
const Train = require( '../db/commands/train' )
const Passenger = require( '../db/commands/passenger' )


describe.only('Passenger', function() {


  before( function() {
    train1 = new Train( { trainNumber: 1, currentStation: 'Downtown', nextStation: 'Elm Street' } ),
    train2 = new Train( { trainNumber: 2, currentStation: 'Annex', nextStation: '10th Ave' } )
    train3 = new Train( { trainNumber: 3, currentStation: 'Parkside', nextStation: 'Grand Boulevard' } )
    train4 = new Train( { trainNumber: 5, currentStation: 'Monument Valley', nextStation: 'Museum Isle' } )
    return db.query( 'TRUNCATE trains, passengers' )
    .then( () => train1.save() )
    .then( () => train2.save() )
    .then( () => train3.save() )
    .then( () => train4.save() )
    .then( () => Passenger.create( { passengerName: 'Alex', origin: 'Downtown', destination: 'Forest Gardens' } ) )
    .then( () => Passenger.create( { passengerName: 'Julia', origin: 'Annex', destination: 'Parkside' } ) )
    .then( () => Passenger.create( { passengerName: 'Frann', origin: 'Grand Boulevard', destination: '10th Ave' } ) )
    .then( () => Passenger.create( { passengerName: 'Joey', origin: 'Central Station'} ) )
  })

  it('should be a function', function() {
    expect( Passenger ).to.be.a( 'function' )
  })

  describe('Passenger.create', function() {
    context('when given passenger data', function() {
      it('should create and return a Passenger object', function() {
        return Passenger.create( { passengerName: 'Thomas' } )
        .then( result => expect(result).to.eql(
          {
            id: result.id,
            passengerName: 'Thomas',
            origin: 'Downtown',
            destination: null,
            trainNumber: null,
            stationName: 'Downtown'
          }
        ))
      })
      it('should save the passenger to the database', function() {
        return Passenger.create( { passengerName: 'Thomas', origin: 'Central Station'} )
        .then( result => Passenger.findByID( result.id ))
        .then( result => expect(result).to.eql(
          {
            id: result.id,
            passengerName: 'Thomas',
            origin: 'Central Station',
            destination: null,
            trainNumber: null,
            stationName: 'Central Station'
          }
        ))
      })
    })
  })

  describe('Passenger.getTicket', function() {
    context('when given a passenger name', function() {
      it('should return a ticket object if the passenger has a ticket', function() {
        return Passenger.getTicket('Alex')
        .then( result => expect(result).to.eql(
          {
            origin: 'Downtown',
            destination: 'Forest Gardens',
          }
        ))
      })
    })
    context('when given a passenger name', function() {
      it('should return a warning if passenger has no ticket', function() {
        return Passenger.getTicket('Joey')
        .then( result => expect(result).to.eql('passenger does not have a ticket'))
      })
    })
  })

  describe('Passenger.getAllAtStation', function() {
    context('when given a station name', function() {
      it('should return all passegers at station as passenger objects', function() {
        return Passenger.getAllAtStation('Downtown')
        .then( result => expect(result).to.eql(
          [ {
              id: result[0].id,
              passengerName: 'Alex',
              origin: 'Downtown',
              destination: 'Forest Gardens',
              trainNumber: null,
              stationName: 'Downtown' },
            {
              id: result[1].id,
              passengerName: 'Thomas',
              origin: 'Downtown',
              destination: null,
              trainNumber: null,
              stationName: 'Downtown' } ]
        ))
      })
    })
    context('when given a passenger name', function() {
      it('should return a ticket a warning if passenger has no ticket', function() {
        return Passenger.getTicket('Joey')
        .then( result => expect(result).to.eql('passenger does not have a ticket'))
      })
    })
  })
})
