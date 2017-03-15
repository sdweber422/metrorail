const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');
const index = require( './routes/index' )
const train = require( './routes/train' )
const station = require( './routes/station' )
const passenger = require( './routes/passenger' )
const redirect = require( './routes/redirect' )

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use( '/*', function( request, response, next ) {
  response.header( 'content-type', 'application/json' )
  next()
})
app.use( '/', index )
app.use( '/api/trains', train )
app.use( '/api/stations', station )
app.use( '/api/passengers', passenger )
app.use( '*', redirect )

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res ) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
