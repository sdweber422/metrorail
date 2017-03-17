const db = require( '../config' ).db
const functions = require( '../functions')
const Train = require( './train' )
const Passenger = require( './passenger'  )

class Station {

  constructor( stationData ) {
    const { stationName, stationNumber } = stationData
    this.stationName = stationName
    this.stationNumber = stationNumber
  }

  static getAllStations() {
    return db.any( `SELECT * FROM stations ORDER BY station_number ASC` )
    .then( stations =>
      Promise.all( stations.map( station =>
        Station.findByLocation( station.station_name ) )
      )
    )
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
    return db.any( getStationId, stationName )
    .then( result => {
      if ( !result.length ) {
        throw new Error( 'Station name does not exist' )
      }
      return result[ 0 ].station_number
    })
    .catch( err => { throw err } )
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
    return db.any( getStation, stationNumber)
    .then( result => {
      if ( !result.length ) {
        throw new Error( 'Station number does not exist' )
      }
      return result[ 0 ].station_name
    })
    .catch( err => { throw err } )
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
    .then( results => {
      return Promise.all( results.map( passenger => Passenger.findByID( passenger.id ) ) )
    })
    .catch( err => { throw err } )
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
    .then( results => {
      return Promise.all( results.map( passenger => Passenger.findByID( passenger.id ) ) )
    })
    .catch( err => err )
  }

  static count() {
    let stationCount =
      `
      SELECT
        COUNT(*)
      FROM
      stations
      `
    return db.one( stationCount )
    .then( result => +result.count )
  }

  static getPreviousStation( stationName ) {
    let getStationId =
      `
      SELECT
        station_number
      FROM
        stations
      WHERE
        station_name = $1
      `
    return Promise.all([
      db.any( getStationId, stationName ),
      Station.count()
    ])
    .then( results => {
      if ( !results[ 0 ].length ) {
        throw new Error( 'Station name does not exist' )
      }

      let previousStationNumber
      let stationNumber = results[ 0 ][ 0 ].station_number
      let count = results[ 1 ]
      let getPrevious =
      `
      SELECT
      station_name
      FROM
      stations
      WHERE
      station_number = $1
      `

      stationNumber === 1
        ? previousStationNumber = count
        : previousStationNumber = stationNumber - 1
      return db.one( getPrevious, previousStationNumber )
    })
    .then( result => result.station_name)
    .catch( err => { throw err } )
  }

  static getNextStation( stationName ) {
    return functions.getNextStation( stationName )
    .catch( err => { throw err } )
  }

  getNextArrivingTrainAtStation() {
    return Train.getNextArrivingAtStation( this.stationName )
    .catch( err => { throw err } )
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
    return db.any( getStation, stationNumber )
    .then( station => {
      if ( !station.length ) {
        throw new Error( 'Station number does not exist' )
      }
      return new Station({
        stationNumber: stationNumber,
        stationName: station[ 0 ].station_name
      })
    })
    .catch( err => { throw err } )
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
    return db.any( getStation, stationName )
    .then( station => {
      if ( !station.length ) {
        throw new Error( 'Station name does not exist' )
      }
      return new Station({
        stationNumber: station[ 0 ].station_number,
        stationName: stationName
      })
    })
    .catch( err => { throw err } )
  }

  static create( stationData ) {
    if ( !stationData.stationName ) {
      throw new Error( 'No station name provided')
    }
    return Station.count()
    .then( count => {
      if ( stationData.stationNumber > count || stationData.stationNumber < 1 ) {
        stationData.stationNumber = count + 1
      }
      return stationData.stationNumber
    })
    .then( stationNumber => {
      let updateStations =
      `
      UPDATE
      stations
      SET
      station_number = station_number + 1
      WHERE
      station_number >= $1
      `
      db.none( updateStations, stationNumber )
    })
    .then( () => Station.save( stationData ) )
    .then( station => {
      return new Station({
        stationNumber: station.station_number,
        stationName: station.station_name
      })
    })
    .catch( err => { throw err } )
  }

  static save( stationData ) {
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
        stationData.stationNumber,
        stationData.stationName
      ]
    )
    .catch( err => { throw err } )
  }

  update() {
    return db.one(`SELECT station_number FROM stations WHERE station_name = $1`, this.stationName)
    .then( station => station.station_number)
    .then( oldStationNumber => {
      let newStationNumber = this.stationNumber
      console.log( 'oldStationNumber', oldStationNumber )
      console.log( 'newStationNumber', newStationNumber )
      if( oldStationNumber > newStationNumber ){
        db.none(`UPDATE stations SET station_number = station_number + 1 WHERE station_number < $1 AND station_number >= $2`, [oldStationNumber, newStationNumber])
      }
      if( oldStationNumber < newStationNumber ){
        db.none(`UPDATE stations SET station_number = station_number - 1 WHERE station_number > $1 AND station_number <= $2`, [oldStationNumber, newStationNumber])
      }
    })
    .then( ()=> {
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
    })
    .then( () => this )
    .catch( err => { throw err } )
  }

  delete() {
    let deleteStation =
      `
      DELETE FROM
        stations
      WHERE
        station_number = $1
      `

    return db.none( deleteStation, this.stationNumber )
    .then( () => db.none(
      `
      UPDATE
        stations
      SET
        station_number = station_number - 1
      WHERE
        station_number > $1
      `,
      this.stationNumber )
    .then( () => {
      let newStation = new Station( this )
      delete this.stationNumber
      delete this.stationName
      return newStation
    })
    .catch( err => { throw err } )
  )}
}

module.exports = Station
