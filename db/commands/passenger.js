const db = require( '../config' ).db

class Passenger {

  constructor( id, passengerName, origin, destination, trainNumber, stationName ) {
    this.id = id
    this.passengerName = passengerName
    this.origin = origin
    this.destination = destination
    this.trainNumber = trainNumber
    this.stationName = stationName
  }

  static getPassengerID( name ) {
    return db.one(`SELECT * FROM passengers WHERE passenger_name = $1`, name)
    .then( passenger => {
      return passenger.id
    })
  }

  static getPassengerName( id ) {
    return db.one(`SELECT * FROM passengers WHERE id = $1`, id)
    .then( passenger => {
      return passenger.passenger_name
    })
  }

  static getTicket( name ) {
    return db.one(`SELECT * FROM passengers WHERE passenger_name = $1`, name)
    .then( passenger => {
      return {'origin':passenger.origin,'destination':passenger.destination}
    })
  }

  setCurrentStation( station ) {
    this.stationName = station
    return db.none(`UPDATE passengers SET station_name = $2 WHERE passenger_name = $1`,
    [ this.passengerName, station ])
  }

  buyTicket( destination ) {
    this.destination = destination
    return db.none(`UPDATE passengers SET destination = $2 WHERE passenger_name = $1`,
      [ this.passengerName, destination ])
  }

  useTicket() {

    return db.any(`SELECT * FROM trains WHERE current_station = $1`, this.stationName)
    .then( trains => {
      if( trains.length >= 1 ){
        this.trainNumber = trains[0].train_number
        this.stationName = null
        this.update()
      }
      else{ throw new Error( 'No trains at passengers station' )}
    })
    .catch( err => {throw err})
  }

  getCurrentTrain() {

  }

  getCurrentStation() {

  }

  static findByID( id ) {
    return db.one( `SELECT * FROM passengers WHERE id = $1`, id )
    .then( passenger => {
      return new Passenger(
        passenger.id,
        passenger.passenger_name,
        passenger.origin,
        passenger.destination,
        passenger.train_number,
        passenger.station_name
      )
    })
  }

  static findByName( name ) {
    return db.one( `SELECT * FROM passengers WHERE passenger_name = $1`, name )
    .then( passenger => {
      return new Passenger(
        passenger.id,
        passenger.passenger_name,
        passenger.origin,
        passenger.destination,
        passenger.train_number,
        passenger.station_name
      )
    })
  }

  static getAllAtStation() {

  }

  getAllOnTrain() {

  }

  static create() {

  }

  save() {

  }

  update() {
    return db.none(
    `UPDATE passengers SET (passenger_name, origin, destination, train_number, station_name)
    = ( $2, $3, $4, $5, $6 ) WHERE id = $1`,
    [ this.id, this.passengerName, this.origin, this.destination, this.trainNumber, this.stationName ] )
  }

  delete() {

  }


}

module.exports = Passenger
