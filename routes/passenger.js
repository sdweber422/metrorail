const express = require('express')
const router = express.Router()
const Passenger = require( '../db/commands/passenger' )
const Station = require( '../db/commands/station' )
const Train = require( '../db/commands/train' )

/**
 * @api {get} /api/passengers Request all passenger information
 * @apiName getAllPassengers
 * @apiGroup Passenger
 *
 * @apiParam none
 *
 * @apiSuccess {Number} id Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination Arrival station of passenger.
 * @apiSuccess {Number} trainNumber Train that passenger may be aboard.
 * @apiSuccess {String} stationName Starting station of passenger.
 * @apiSuccess {String} origin Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "id": 2,
 *    "passengerName": "Jenny Bond",
 *    "destination": null,
 *    "trainNumber": null,
 *    "stationName": "Colosseum",
 *    "origin": "Colosseum"
 *  }
 */

router.get( '/', function( request, response ){
  Passenger.getAllPassengers()
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
})

/**
 * @api {get} /api/passengers/name/:name Request passenger information by name.
 * @apiName getPassengerByName
 * @apiGroup Passenger
 *
 * @apiParam {String} name Passenger name.
 *
 * @apiSuccess {Number} id Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination Arrival station of passenger.
 * @apiSuccess {Number} trainNumber Train that passenger may be aboard.
 * @apiSuccess {String} stationName Starting station of passenger.
 * @apiSuccess {String} origin Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "id": 2,
 *    "passengerName": "Jenny Bond",
 *    "destination": null,
 *    "trainNumber": null,
 *    "stationName": "Colosseum",
 *    "origin": "Colosseum"
 *  }
 *
 * apiError QueryResultError Passenger not in database.
 *
 * @apiErrorExample {json} Error-Response:
 *  { "Error":"QueryResultError - No data returned from the query." }
 */

router.get( '/name/:name', function( request, response){
  const { name } = request.params
  Passenger.findByName( name )
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
  .catch( err => {
    console.log( 'err', err )
    response.status( 404 ).send( { Error: err.name + ' - ' + err.message } )
  })
})

/**
 * @api {get} /api/passengers/trainnumber/:trainNumber Request passenger information by train number.
 * @apiName getPassengerByTrainNumber
 * @apiGroup Passenger
 *
 * @apiParam {String} name Passenger name.
 *
 * @apiSuccess {Number} id Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination Arrival station of passenger.
 * @apiSuccess {Number} trainNumber Train that passenger may be aboard.
 * @apiSuccess {String} stationName Starting station of passenger.
 * @apiSuccess {String} origin Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "id": 12,
 *    "passengerName": "Sherman Helmsley",
 *    "destination": "Downtown",
 *    "trainNumber": null,
 *    "stationName": "Colosseum",
 *    "origin": "Colosseum"
 *  }
 *
 * apiError QueryResultError Passenger not in database.
 *
 * @apiErrorExample {json} Error-Response:
 *  { "Error":"QueryResultError - No data returned from the query." }
 */

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

/**
 * @api {get} /api/passengers/station/:stationName Request passenger information by station name.
 * @apiName getPassengerByStationName
 * @apiGroup Passenger
 *
 * @apiParam {String} name Passenger name.
 *
 * @apiSuccess {Number} id            Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination   Arrival station of passenger.
 * @apiSuccess {Number} trainNumber   Train that passenger may be aboard.
 * @apiSuccess {String} stationName   Starting station of passenger.
 * @apiSuccess {String} origin        Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "id": 13,
 *    "passengerName": "Georgia O'Keefe",
 *    "destination": "Main Street",
 *    "trainNumber": 55,
 *    "stationName": null,
 *    "origin": "2nd Ave"
 *  }
 *
 * apiError QueryResultError Passenger not in database.
 *
 * @apiErrorExample {json} Error-Response:
 *  { "Error":"QueryResultError - No data returned from the query." }
 */

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

/**
 * @api {get} /api/passengers/create Interface to create a new passenger.
 * @apiName getCreatePassengerInterface
 * @apiGroup Passenger
 */

router.get( '/create', function(  request, response ){
  Station.getAllStations()
  .then( allStations => {
    let stationNames = allStations.map( station=> station.stationName )
    response.header( 'content-type', 'text/html')
    response.render( 'createPassenger', { stationNames: stationNames } )
  })
})

/**
 * @api {post} /api/passengers/create Create a new passenger.
 * @apiName postCreatePassenger
 * @apiGroup Passenger
 *
 * @apiSuccess {Number} id            Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination   Arrival station of passenger.
 * @apiSuccess {Number} trainNumber   Train that passenger may be aboard.
 * @apiSuccess {String} stationName   Starting station of passenger.
 * @apiSuccess {String} origin        Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "id": 13,
 *    "passengerName": "Georgia O'Keefe",
 *    "destination": "Main Street",
 *    "trainNumber": null,
 *    "stationName": null,
 *    "origin": "2nd Ave"
 *  }
 */

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

/**
 * @api {get} /api/passengers/delete/:id Delete a passenger via HTML form.
 * @apiName getDeletePassenger
 * @apiGroup Passenger
 *
 * @apiParam id {Number} id Unique passenger identifier
 *
 * @apiSuccess {Number} id            Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination   Arrival station of passenger.
 * @apiSuccess {Number} trainNumber   Train that passenger may be aboard.
 * @apiSuccess {String} stationName   Starting station of passenger.
 * @apiSuccess {String} origin        Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "id": 13,
 *    "passengerName": "Georgia O'Keefe",
 *    "destination": "Main Street",
 *    "trainNumber": null,
 *    "stationName": null,
 *    "origin": "2nd Ave"
 *  }
 *
 * apiError QueryResultError Passenger not in database.
 *
 * @apiErrorExample {json} Error-Response:
 *  { "Error":"QueryResultError - No data returned from the query." }
 */

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

/**
 * @api {delete} /api/passengers/delete/:id Delete a passenger.
 * @apiName deletePassenger
 * @apiGroup Passenger
 *
 * @apiParam id {Number} id Unique passenger identifier
 *
 * @apiSuccess {Number} id            Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination   Arrival station of passenger.
 * @apiSuccess {Number} trainNumber   Train that passenger may be aboard.
 * @apiSuccess {String} stationName   Starting station of passenger.
 * @apiSuccess {String} origin        Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "id": 13,
 *    "passengerName": "Georgia O'Keefe",
 *    "destination": "Main Street",
 *    "trainNumber": null,
 *    "stationName": null,
 *    "origin": "2nd Ave"
 *  }
 *
 * apiError QueryResultError Passenger not in database.
 *
 * @apiErrorExample {json} Error-Response:
 *  { "Error":"QueryResultError - No data returned from the query." }
 */

router.delete( '/delete/:id', function( request, response ){
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

/**
 * @api {get} /api/passengers/update/:id Interface to update a passenger.
 * @apiName getUpdatePassengerInterface
 * @apiGroup Passenger
 *
 * @apiParam id {Number} id Unique passenger identifier
 */

router.get( '/update/:id', function( request, response ){
  const { id } = request.params
  Promise.all([
    Passenger.findByID( id ),
    Station.getAllStations(),
    Train.getAllTrains()
  ])
  .then( results => {
    const { id, passengerName, origin, destination, trainNumber, stationName } = results[0]
    let stationNames = results[1].map( station => station.stationName )
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

/**
 * @api {put} /api/passengers/update/:id Update a passenger.
 * @apiName putPassengerUpdate
 * @apiGroup Passenger
 *
 * @apiParam id {Number} id Unique passenger identifier
 *
 * @apiSuccess {Number} id            Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination   Arrival station of passenger.
 * @apiSuccess {Number} trainNumber   Train that passenger may be aboard.
 * @apiSuccess {String} stationName   Starting station of passenger.
 * @apiSuccess {String} origin        Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "status": "success",
 *    "action": "update",
 *    "data": {
 *      "id": 7,
 *      "passengerName": "sfsfdb",
 *      "destination": "Annex",
 *      "trainNumber": null,
 *      "stationName": "Elm Street",
 *      "origin": "Elm Street"
 *    }
 *  }
 *
 * apiError QueryResultError Passenger not in database.
 *
 * @apiErrorExample {json} Error-Response:
 *  { "Error":"QueryResultError - No data returned from the query." }
 */

router.put( '/update/:id', function( request, response ) {
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

/**
 * @api {post} /api/passengers/updated/:id Update a passenger using HTML form.
 * @apiName postPassengerUpdate
 * @apiGroup Passenger
 *
 * @apiParam id {Number} id Unique passenger identifier
 *
 * @apiSuccess {Number} id            Unique passenger identifier.
 * @apiSuccess {String} passengerName First and last name of passenger.
 * @apiSuccess {String} destination   Arrival station of passenger.
 * @apiSuccess {Number} trainNumber   Train that passenger may be aboard.
 * @apiSuccess {String} stationName   Starting station of passenger.
 * @apiSuccess {String} origin        Departure station of passenger.
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "status": "success",
 *    "action": "update",
 *    "data": {
 *      "id": 7,
 *      "passengerName": "sfsfdb",
 *      "destination": "Annex",
 *      "trainNumber": null,
 *      "stationName": "Elm Street",
 *      "origin": "Elm Street"
 *    }
 *  }
 *
 * apiError QueryResultError Passenger not in database.
 *
 * @apiErrorExample {json} Error-Response:
 *  { "Error":"QueryResultError - No data returned from the query." }
 */

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
