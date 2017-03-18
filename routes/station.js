const express = require('express')
const router = express.Router()
const Station = require( '../db/commands/station' )

router.get( '/', function( request, response ){
  Station.getAllStations()
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
})

router.get( '/number/:stationNumber', function( request, response ){
  const { stationNumber } = request.params
  Station.findByID( stationNumber )
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
})

router.get( '/location/:stationName', function( request, response ){
  const { stationName } =  request.params
  Station.findByLocation( stationName )
  .then( result => {
    response.send( JSON.stringify( result, null, 3 ) )
  })
})

router.get( '/create', function( request, response ){
  response.header( 'content-type', 'text/html' )
  response.render( 'createStation', {} )
})

router.post( '/create', function( request, response ){
  const stationData = request.body
  stationData.stationNumber = +stationData.stationNumber
  Station.create( stationData )
  .then( newStation => {
    response.send( JSON.stringify( newStation, null, 3 ) )
  })
})

router.get( '/delete', function( request, response){
  Station.getAllStations()
  .then( stations => {
    response.setHeader('content-type','text/html')
    response.render( 'deleteStation', { stations } )
  })
})

router.get( '/delete/:stationName', function( request, response ){
  const { stationName } = request.params
  Station.findByLocation( stationName )
  .then( station => station.delete() )
  .then( result => {
    let deletedStation = { status: 'success', action: 'delete', data: result }
    response.send( JSON.stringify( deletedStation, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.get( '/update/:stationName', function( request, response ){
  const { stationName } = request.params
  Promise.all([
    Station.findByLocation( stationName ),
    Station.getAllStations()
  ])
  .then( results => {
    let { stationName, stationNumber } = results[0]
    let stationNumbers = results[1].map( station => station.stationNumber )
    response.setHeader( 'content-type', 'text/html' )
    response.render( 'updateStation', {
      stationName,
      stationNumber,
      stationNumbers
    })
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.put( '/update/:stationName', function( request, response ){
  const { stationName } = request.params
  Station.findByLocation( stationName )
  .then( station => {
    let { stationNumber } = request.body
    station.stationNumber = stationNumber
    return station.update()
  })
  .then( station => {
    let updatedStation = { status: 'success', method: 'put', data: station }
    response.send( JSON.stringify( updatedStation, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

router.post( '/updated/:stationName', function( request, response ){
  const { stationName } = request.params
  Station.findByLocation( stationName )
  .then( station => {
    let { stationNumber } = request.body
    station.stationNumber = stationNumber
    return station.update()
  })
  .then( station => {
    let updatedStation = { status: 'success', method: 'put', data: station }
    response.send( JSON.stringify( updatedStation, null, 3 ) )
  })
  .catch( err => {
    console.log( 'Error', err )
    response.status( 404 ).send( { Error: err.message } )
  })
})

module.exports = router
