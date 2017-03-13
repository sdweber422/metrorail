const db = require( '../config' ).db
const functions = require( '../functions')

class Station {

  constructor( stationData ) {
    this.stationName = stationData.stationName
    this.stationNumber = stationData.stationNumber
  }

  static getStationID( stationName ) {
    let getStationId =
      `SELECT station_number
        FROM stations
          WHERE station_name = $1`
    return db.one( getStationId, stationName )
    .then( station => station.station_number )
  }

  static getStationLocation( stationNumber ) {
    let getStation =
      `SELECT * FROM stations
        WHERE station_number = $1`
    return db.one( getStation, stationNumber)
    .then( station => station.station_name )
  }

  static getWaitingPassengers( stationName ) {
    let getPassengersAtStation =
      `SELECT * FROM passengers WHERE station_name = $1`
    return db.any( getPassengersAtStation, stationName )
    .then( waitingPassengers => waitingPassengers )
  }

  static getTicketedPassengers( stationName ) {
    let getPassengersWithTickets =
      `SELECT * FROM passengers WHERE station_name = $1 AND destination IS NOT NULL`
      return db.any( getPassengersWithTickets, stationName )
      .then( ticketedPassengers => ticketedPassengers )
  }

  static getPreviousStation( stationName ) {
    let getStationId =
      `SELECT *, (SELECT COUNT(*) FROM stations)
        FROM stations
          WHERE station_name = $1`
      return db.one( getStationId, stationName )
      .then( results => {
        let stationNumber = results.station_number
        let count = results.count
        let previousStationNumber
        if ( stationNumber === 1 ) {
          previousStationNumber = count
        }
        else {
          previousStationNumber = stationNumber - 1
        }
        let getPrevious =
        `SELECT *
          FROM stations
            WHERE station_number = $1`
        return db.one( getPrevious, previousStationNumber )
      })
      .then( station => station.station_name )
  }

  static getNextStation( stationName ) {
    return functions.getNextStation( stationName )
  }

  getNextArrivingTrainAtStation() {

  }

  static findByID( stationNumber ) {
    let getStation =
      `SELECT * FROM stations WHERE station_number = $1`
    return db.one( getStation, stationNumber )
    .then( station => {
      return new Station({
        stationNumber: station.station_number,
        stationName: station.station_name
      })
    })
  }

  static findByLocation( stationName ) {
    let getStation =
      `SELECT * FROM stations WHERE station_name = $1`
    return db.one( getStation, stationName )
    .then( station => {
      return new Station({
        stationNumber: station.station_number,
        stationName: station.station_name
      })
    })
  }

  static create( stationData ) {
    return new Station( stationData )
  }

  save() {
    let stationInsert =
    `INSERT INTO stations
      ( station_number, station_name )
        VALUES ( $1, $2 ) RETURNING *`
    return db.one( stationInsert, [ this.stationNumber, this.stationName ]
    )
  }

  static update() {
    let updateStation =
      `UPDATE stations
        SET station_number = $1
         WHERE station_name = $2`
    return db.none( updateStation, [ this.stationNumber, this.stationName ] )
  }

  delete() {
    let deleteTrain =
      `DElETE FROM stations WHERE station_number = $1`
    return db.none( deleteTrain, this.stationNumber )
    .then( () => {
      this.stationNumber = null
      this.stationName = null
    })
  }
}

module.exports = Station
