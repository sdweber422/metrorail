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

module.exports = router
