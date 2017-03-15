const express = require( 'express' )
const router = express.Router()

router.get( '/', function( request, response, next ) {
  response.redirect( '/api' )
})

router.get( '/api', function( request, response, next ) {
  response.render( 'index', { Hello: 'Hello there' } )
})

module.exports = router
