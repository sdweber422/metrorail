const express = require('express')
const router = express.Router()
const Train = require( '../db/commands/train' )
const Station = require( '../db/commands/station' )

router.get('/', function( request, response ){
  Train.getAllTrains()
  .then( result => {
    response.status( 200 )
    response.send( JSON.stringify( result, null, 3 ) )
  })
})


router.get( '/location/:location', function( request, response ){
  const { location } = request.params
  Train.findByStation( location )
  .then( result => {
    let resultObject = { status: 'success', data: result }
    response.send( JSON.stringify( resultObject, null, 3 ) )
  })
})

router.get( '/number/:trainNumber', function( request, response ){
  const { trainNumber } = request.params
  Train.find( trainNumber )
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 400 ).send( { Error: err.message } )
  })
})

router.get( '/create', function( request, response ){
  response.header('content-type','text/html')
  Train.getEmptyStations()
  .then( emptyStations => {
    let stationNames = emptyStations.map( station => station.station_name )
    response.render( 'createTrain',{ stationNames } )
  })
})

router.post( '/create', function( request, response ){
  const { trainNumber, capacity, currentStation } = request.body
  const trainData = { trainNumber, capacity, currentStation }
  console.log( 'trainNumber', trainNumber )
  Train.create(trainData)
  .then( newTrain => {
    response.send( JSON.stringify( newTrain, null, 3 ) )
  })
})

router.get( '/delete/:trainNumber', function( request, response ){
  const { trainNumber } = request.params
  Train.find( trainNumber )
  .then( train => train.delete() )
  .then( result => {
    let deletedTrain = { status: 'success', data: result }
    response.send( JSON.stringify( deletedTrain, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.get( '/update/:trainNumber', function( request, response ){
  const { trainNumber } = request.params
  Promise.all([
    Train.find( trainNumber ),
    Station.getAllStations(),
  ])
  .then( results => {
    let { trainNumber, currentStation, nextStation, capacity, numberOfPassengers } = results[0]
    let stationNames = results[1].map( station => station.stationName )
    stationNames.push( null )
    response.setHeader( 'content-type', 'text/html' )
    response.render( 'updateTrain', {
      trainNumber,
      currentStation,
      nextStation,
      capacity,
      numberOfPassengers,
      stationNames
    })
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.post( '/updated/:trainNumber', function( request, response ){
  const { trainNumber } = request.params
  Train.find( trainNumber )
  .then( train => {
    let { trainNumber, currentStation, nextStation, capacity, numberOfPassengers } = request.body
    train.currentStation = currentStation
    train.nextStation = nextStation
    train.capacity =  capacity
    train.numberOfPassengers = numberOfPassengers
    return train.update()
  })
  .then( train => {
    let updatedTrain = { status: 'success', method: 'put', data: train }
    response.send( JSON.stringify( updatedTrain, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

module.exports = router
