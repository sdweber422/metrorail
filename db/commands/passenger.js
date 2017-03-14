const db = require( '../config' ).db
const Train = require( './train')

class Passenger {

  constructor( passengerData ) {
    const {
      id,
      passengerName,
      origin,
      destination,
      trainNumber,
      stationName
    } = passengerData

    this.id = id
    this.passengerName = passengerName
    this.origin = origin || 'Downtown'
    this.destination = destination || null
    this.trainNumber = trainNumber || null
    this.stationName = stationName || this.origin
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
    this.update()
  }

  useTicket() {
    Train.findTrainsAtStation( this.stationName )
    .then( results => {
      let train = results[0]
      train.numberOfPassengers++
      train.update()
      this.stationName = null
      this.trainNumber = train.trainNumber
      this.update()
    })
  }

  getCurrentTrain() {
    return this.trainNumber
  }

  getCurrentStation() {
    return this.currentStation
  }

  static findByID( id ) {
    return db.one( `SELECT * FROM passengers WHERE id = $1`, id )
    .then( passenger => {
      return new Passenger({
        id: passenger.id,
        passengerName: passenger.passenger_name,
        origin: passenger.origin,
        destination: passenger.destination,
        trainNumber: passenger.train_number,
        stationName: passenger.station_name
      })
    })
  }

  static findByName( name ) {
    return db.one( `SELECT * FROM passengers WHERE passenger_name = $1`, name )
    .then( passenger => {
      return new Passenger({
        id: passenger.id,
        passengerName: passenger.passenger_name,
        origin: passenger.origin,
        destination: passenger.destination,
        trainNumber: passenger.train_number,
        stationName: passenger.station_name
      })
    })
  }

  static getAllAtStation( station ) {
    return db.any(`SELECT * FROM passengers WHERE station_name = $1`, station)
  }

  getAllOnTrain( trainNumber ) {
    return db.any(`SELECT * FROM passengers WHERE train_number = $1`, trainNumber)
  }

  static create( passengerData ) {
    let newPassenger = new Passenger( passengerData )
    return newPassenger.save()
    .then( passenger => {
      return new Passenger({
        id: passenger.id,
        passengerName: passenger.passenger_name,
        origin: passenger.origin,
        destination: passenger.destination,
        trainNumber: passenger.train_number,
        stationName: passenger.station_name
      })
    })
  }

  save() {
    return db.one(
    `INSERT INTO passengers (id, passenger_name, origin, destination, train_number, station_name)
    VALUES ( DEFAULT, $1, $2, $3, $4, $5) RETURNING *`,
    [ this.passengerName, this.origin, this.destination, this.trainNumber, this.stationName ])
    .catch( err => err )
  }

  update() {
    return db.none(
    `UPDATE passengers SET (passenger_name, origin, destination, train_number, station_name)
    = ( $2, $3, $4, $5, $6 ) WHERE id = $1`,
    [ this.id, this.passengerName, this.origin, this.destination, this.trainNumber, this.stationName ] )
  }

  delete() {
    return db.none(
      `DELETE FROM passengers WHERE id = $1`, this.id
    )
  }


}

module.exports = Passenger
