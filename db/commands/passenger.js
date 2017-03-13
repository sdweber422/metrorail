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

  getPassengerID() {

  }

  getPassengerName() {

  }

  getTicket() {

  }

  setCurrentStation() {

  }

  buyTicket() {

  }

  useTicket() {

  }

  getCurrentTrain() {

  }

  getCurrentStation() {

  }

  static findByID( id ) {

  }

  static findByName( name ) {

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

  }

  delete() {

  }

}

module.exports = Passenger
