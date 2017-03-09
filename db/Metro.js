const Train = require('./commands/train')
const Station = require('./commands/station')
const Passenger = require('./commands/passenger')
const db = require( './config' ).db
const pgp = require( './config' ).pgp

class Metro {
  constructor() {
    this.trains = {}
    this.loadTrains()
    this.stations = {}
    this.loadStations()
    this.passengers = {}
    this.loadPassengers()
  }

  loadTrains() {
    return db.any(`SELECT * FROM trains`)
    .then(results => {
      results.forEach( result =>
        this.trains[result.train_number] = new Train(
          result.train_number,
          result.current_station,
          result.next_station,
          result.train_capacity,
          result.train_passengers
        )
      )
      console.log( 'this.trains', this.trains )
    })
  }

  loadStations() {
    return db.any(`SELECT * FROM stations`)
    .then(results => {
      results.forEach( result =>
        this.stations[result.station_name] = new Station(
          result.station_name,
          result.station_number
        )
      )
      console.log( 'this.stations', this.stations )
    })
  }

  loadPassengers() {
    return db.any(`SELECT * FROM passengers`)
    .then( results => {
      results.forEach( result =>
        this.passengers[result.id] = new Passenger(
          result.id,
          result.passenger_name,
          result.origin,
          result.destination,
          result.train_number,
          result.station_name
        )
      )
      console.log( 'this.passengers', this.passengers )
    })
  }
}

module.exports = { Metro }

let metro = new Metro()
console.log( 'metro', metro )
