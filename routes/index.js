const express = require( 'express' )
const router = express.Router()

router.get( '/', function( request, response, next ) {
  response.redirect( '/api' )
})

router.get( '/api', function( request, response, next ) {
  response.setHeader( 'content-type', 'text/html' )
  response.render( 'index', { Hello: 'Hello there' } )
})

module.exports = router
