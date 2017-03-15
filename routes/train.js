const express = require('express')
const router = express.Router()
const Train = require( '../db/commands/train' )

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

module.exports = router
