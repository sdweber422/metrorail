const db = require( '../config' ).db

class Station {

  constructor( stationName, stationNumber ) {
    this.stationName = stationName
    this.stationNumber = stationNumber
  }

  getStationID() {

  }

  getStationLocation() {
    return this.stationName
  }

  getWaitingPassengers() {

  }

  getTicketedPassengers() {

  }

  getPreviousStation() {

  }

  getNextStation() {

  }

  getNextArrivingTrainAtStation() {

  }

  static findByID() {

  }

  static findByLocation() {

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

module.exports = Station
