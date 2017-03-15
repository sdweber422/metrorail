const express = require('express')
const router = express.Router()
const Passenger = require( '../db/commands/passenger' )

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



module.exports = router
