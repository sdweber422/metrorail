const chai = require( 'chai' )
const expect = chai.expect
const assert = chai.assert
const db = require( '../../db/config' ).db
const Train = require( '../../db/commands/train' )
const Passenger = require( '../../db/commands/passenger' )


describe('Passenger', function() {


  before( function() {
    return db.query( 'TRUNCATE trains, passengers' )
    .then( () => Train.create( { trainNumber: 1, currentStation: 'Downtown', nextStation: 'Elm Street' } ))
    .then( () => Train.create( { trainNumber: 2, currentStation: 'Annex', nextStation: '10th Ave' } ))
    .then( () => Train.create( { trainNumber: 3, currentStation: 'Parkside', nextStation: 'Grand Boulevard' } ))
    .then( () => Train.create( { trainNumber: 5, currentStation: 'Monument Valley', nextStation: 'Museum Isle' } ))
    .then( () => Passenger.create( { passengerName: 'Alex', stationName: 'Downtown', destination: 'Forest Gardens' } ) )
    .then( () => Passenger.create( { passengerName: 'Julia', stationName: 'Annex', destination: 'Parkside' } ) )
    .then( () => Passenger.create( { passengerName: 'Frann', stationName: 'Grand Boulevard', destination: '10th Ave' } ) )
    .then( () => Passenger.create( { passengerName: 'Joey', stationName: 'Central Station'} ) )
  })

  it('should be a function', function() {
    expect( Passenger ).to.be.a( 'function' )
  })

  describe('Passenger.create', function() {
    context('when given passenger data', function() {
      it('should create and return a Passenger object', function() {
        return Passenger.create( { passengerName: 'Buster', stationName: 'Downtown' } )
        .then( result => expect(result).to.eql(
          {
            id: result.id,
            passengerName: 'Buster',
            origin: 'Downtown',
            destination: null,
            trainNumber: null,
            stationName: 'Downtown'
          }
        ))
      })
      it('should save the passenger to the database', function() {
        return Passenger.create( { passengerName: 'Thomas', stationName: 'Central Station'} )
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
      it('should return all passegers at station as passenger objects within an array', function() {
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
              passengerName: 'Buster',
              origin: 'Downtown',
              destination: null,
              trainNumber: null,
              stationName: 'Downtown' } ]
        ))
      })
    })
    context('when given a station name', function() {
      it('should return an empty array if no passengers at station', function() {
        return Passenger.getAllAtStation('Colosseum')
        .then( result => expect(result).to.eql([]))
      })
    })
  })

  describe('Passenger.getAllOnTrain', function() {
    context('when given a train number', function() {
      it('should return all passegers on train as passenger objects within an array', function() {
        return Passenger.findByName('Buster')
        .then(buster => buster.buyTicket('Central Station'))
        .then( () => Train.findByStation('Downtown'))
        .then(result => result.onboard())
        .then( () => Passenger.getAllOnTrain(1))
        .then( result => expect(result).to.eql(
          [ {
              id: result[0].id,
              passengerName: 'Alex',
              origin: 'Downtown',
              destination: 'Forest Gardens',
              trainNumber: 1,
              stationName: null },
            {
              id: result[1].id,
              passengerName: 'Buster',
              origin: 'Downtown',
              destination: 'Central Station',
              trainNumber: 1,
              stationName: null
          } ] )
        )
      })
    })
  })
})
