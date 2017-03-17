const express = require('express')
const router = express.Router()
const Passenger = require( '../db/commands/passenger' )
const Station = require( '../db/commands/station' )
const Train = require( '../db/commands/train' )

router.get( '/', function( request, response ){
  Passenger.getAllPassengers()
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
})


router.get( '/name/:name', function( request, response){
  const { name } = request.params
  Passenger.findByName( name )
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
  .catch( err => {
    console.log( 'err', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.get( '/trainnumber/:trainNumber', function( request, response ){
  const { trainNumber } = request.params
  Passenger.getAllOnTrain( trainNumber )
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
  .catch( err => {
    console.log( 'err', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.get( '/station/:stationName', function( request, response ){
  const { stationName } = request.params
  Passenger.getAllAtStation( stationName )
  .then( result => {
      response.send( JSON.stringify( result, null, 3 ) )
  })
  .catch( err => {
    console.log( 'err', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.get( '/create', function(  request, response ){
  Station.getAllStations()
  .then( allStations => {
    let stationNames = allStations.map( station=> station.station_name )
    response.header( 'content-type', 'text/html')
    response.render( 'createPassenger', { stationNames: stationNames } )
  })
})

router.post( '/create', function( request, response ){
  const { passengerName, stationName } = request.body
  const passengerData = { passengerName, stationName }
  Passenger.create( passengerData )
  .then( newPassenger => {
    response.send( JSON.stringify( newPassenger, null, 3 ) )
  })
  .catch( err => {
    console.log( 'err', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.get( '/delete/:id', function( request, response ){
  const { id } = request.params
  Passenger.findByID( id )
  .then( passenger => passenger.delete() )
  .then( result => {
    let deletedPassenger = { status: 'success', action: 'delete', data: result }
    response.send( JSON.stringify( deletedPassenger, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.get( '/update/:id', function( request, response ){
  const { id } = request.params
  Promise.all([
    Passenger.findByID( id ),
    Station.getAllStations(),
    Train.getAllTrains()
  ])
  .then( results => {
    const { id, passengerName, origin, destination, trainNumber, stationName } = results[0]
    let stationNames = results[1].map( station => station.station_name )
    let trainNumbers = results[2].map( train => train.trainNumber )
    stationNames.push( null )
    trainNumbers.push( null )
    response.setHeader( 'content-type', 'text/html' )
    response.render( 'updatePassenger', {
      id,
      passengerName,
      origin,
      destination,
      trainNumber,
      stationName,
      stationNames,
      trainNumbers
    })
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.put( 'updated/:id', function( request, response ) {
  const { id } = request.params
  Passenger.findByID( id )
  .then( passenger => {
    let { passengerName, origin, destination, trainNumber, stationName } = request.query
    passenger.passengerName = passengerName
    passenger.origin = origin || null
    passenger.destination = destination || null
    passenger.trainNumber = trainNumber || null
    passenger.stationName = stationName || null
    return passenger.update()
  })
  .then( passenger => {
    let updatedPassenger = { status: 'success', action: 'update', data: passenger }
    response.send( JSON.stringify( updatedPassenger, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.post( '/updated/:id',function( request, response ){
  const { id } = request.params
  Passenger.findByID( id )
  .then( passenger => {
    let { passengerName, origin, destination, trainNumber, stationName } = request.body
    passenger.passengerName = passengerName
    passenger.origin = origin || null
    passenger.destination = destination || null
    passenger.trainNumber = trainNumber || null
    passenger.stationName = stationName || null
    return passenger.update()
  })
  .then( passenger => {
    let updatedPassenger = { status: 'success', action: 'update', data: passenger }
    response.send( JSON.stringify( updatedPassenger, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

module.exports = router
