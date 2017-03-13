const db = require( '../config' ).db
const functions = require( '../functions')

class Station {

  constructor( stationData ) {
    const { stationName, stationNumber } = stationData
    this.stationName = stationName
    this.stationNumber = stationNumber
  }

  static getStationID( stationName ) {
    let getStationId =
      `
      SELECT
        station_number
      FROM
        stations
      WHERE
        station_name = $1
      `
    return db.one( getStationId, stationName )
  }

  static getStationLocation( stationNumber ) {
    let getStation =
      `
      SELECT
        station_name
      FROM
        stations
      WHERE
        station_number = $1
      `
    return db.one( getStation, stationNumber)
  }

  static getWaitingPassengers( stationName ) {
    let getPassengersAtStation =
      `
      SELECT
        *
      FROM
        passengers
      WHERE
        station_name = $1
      `
    return db.any( getPassengersAtStation, stationName )
  }

  static getTicketedPassengers( stationName ) {
    let getPassengersWithTickets =
      `
      SELECT
        *
      FROM
        passengers
      WHERE
        station_name = $1
      AND
        destination IS NOT NULL
      `
    return db.any( getPassengersWithTickets, stationName )
  }

  static getPreviousStation( stationName ) {
    let getStationId =
      `
      SELECT
        *, ( SELECT COUNT(*) FROM stations )
      FROM
        stations
      WHERE
        station_name = $1
      `
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
        `
        SELECT
          station_name
        FROM
          stations
        WHERE
          station_number = $1
        `
      return db.one( getPrevious, previousStationNumber )
    })
  }

  static getNextStation( stationName ) {
    return functions.getNextStation( stationName )
  }

  getNextArrivingTrainAtStation() {

  }

  static findByID( stationNumber ) {
    let getStation =
      `
      SELECT
        *
      FROM
        stations
      WHERE
        station_number = $1
      `
    return db.one( getStation, stationNumber )
    .then( station => {
      return new Station({
        stationNumber: stationNumber,
        stationName: station.station_name
      })
    })
  }

  static findByLocation( stationName ) {
    let getStation =
      `
      SELECT
        *
      FROM
        stations
      WHERE
        station_name = $1
      `
    return db.one( getStation, stationName )
    .then( station => {
      return new Station({
        stationNumber: station.station_number,
        stationName: stationName
      })
    })
  }

  static create( stationData ) {
    return new Station( stationData )
  }

  save() {
    let stationInsert =
      `
      INSERT INTO
        stations
        ( station_number, station_name )
      VALUES
        ( $1, $2 )
      RETURNING
        *
      `
    return db.one(
      stationInsert,
      [
        this.stationNumber,
        this.stationName
      ]
    )
  }

  static update() {
    let updateStation =
      `
      UPDATE
        stations
      SET
        station_number = $1
      WHERE
        station_name = $2
      `
    return db.none(
      updateStation,
      [
        this.stationNumber,
        this.stationName
      ]
    )
  }

  delete() {
    let deleteTrain =
      `
      DElETE FROM
        stations
      WHERE
        station_number = $1
      `
    return db.none( deleteTrain, this.stationNumber )
    .then( () => {
      this.stationNumber = null
      this.stationName = null
    })
  }
}

module.exports = Station

Station.findByID( 2 )
.then( result => console.log( 'result', result ))
Station.findByLocation( "Colosseum" )
.then( result => console.log( 'result', result ))
Station.getPreviousStation( 'Elm Street' )
.then( prev => console.log( 'prev', prev ))
