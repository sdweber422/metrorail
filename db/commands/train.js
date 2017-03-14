const db = require( '../config' ).db
const functions = require( '../functions')

class Train {

  constructor ( trainData ) {
    this.trainNumber =  trainData.trainNumber
    this.currentStation = trainData.currentStation || 'Downtown'
    this.nextStation = trainData.nextStation || Train.getNextStation(this.currentStation)
    this.capacity = trainData.capacity || 52
    this.numberOfPassengers = trainData.numberOfPassengers || 0
  }

  static getTrainNumber( currentStation ) {
    return db.one( `SELECT * FROM trains WHERE current_station = $1`, currentStation )
    .then( train => {
      return train.train_number
    })
    .catch( err => {
      throw err
    })
  }

  static getNextStation( currentStation ) {
    return functions.getNextStation( currentStation )
    .then( result => result )
  }

  save(){
    return db.one(
      `INSERT INTO trains
      ( train_number, train_capacity, train_passengers, current_station, next_station )
      VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`,
      [
        this.trainNumber,
        this.capacity,
        this.numberOfPassengers,
        this.currentStation,
        this.nextStation
      ]
    )
  }

  getCapacity(){
    return this.capacity
  }

  getPassengers(){
    return this.numberOfPassengers
  }

  isFull(){
    return this.numberOfPassengers >= this.capacity
  }

  getCurrentStation(){
    return this.currentStation
  }

  static getNextArrivingAtStation( station ){
    return Promise.all([
      db.any( `SELECT * FROM trains JOIN stations ON trains.next_station = stations.station_name` ),
      db.one( `SELECT * FROM stations WHERE station_name = $1`, station )
    ])
    .then( results => {
      let allTrains = results[ 0 ]
      let station = results[ 1 ]
      let closestTrain = allTrains[0]
      allTrains.forEach( train => {
        if( Train.getDistanceFromStation( train.station_number, station.station_number) < Train.getDistanceFromStation( closestTrain.station_number, station.station_number) ){
            closestTrain = train
        }
      })
      return closestTrain
    })
  }


  static getDistanceFromStation( trainNumber, stationNumber ){
    let distance = stationNumber - trainNumber
    if( distance < 0 ){
      distance += 12
    }
    return distance
  }


  moveToNextStation() {
    Train.findByStation( this.nextStation )
    .then( result => {
      if( result ){
        throw new Error( 'Train number ' + result.trainNumber + ' is still at ' + this.nextStation)
      }
      else{
        this.currentStation = this.nextStation
        return Train.getNextStation(this.nextStation)
        .then( result => this.nextStation = result )
        .then( _ => this.update())
      }
    })
  }

  offboard() {
    let getOffboardingPassengers =
      `SELECT * FROM passengers
        WHERE train_number = $1
          AND destination = $2`
    db.any( getOffboardingPassengers, [ this.trainNumber, this.currentStation] )
    .then( passengers => {
      this.numberOfPassengers -= passengers.length
      let updatePassengerTable =
        `UPDATE passengers
          SET ( train_number, station_name, origin, destination ) =
            ( null, $1, $1, null ) WHERE id = $2`
      passengers.forEach( passenger => db.none( updatePassengerTable, [ this.currentStation, passenger.id ] ) )
    })
  }

  onboard() {
    let getOnboardingPassengers =
      `SELECT * FROM passengers
        WHERE station_name = $1
          AND destination IS NOT NULL`
    db.any( getOnboardingPassengers, this.currentStation )
    .then( passengers => {
      this.numberOfPassengers += passengers.length
      let updatePassengerTable =
        `UPDATE passengers
          SET ( train_number, station_name ) =
           ( $1, null ) WHERE id = $2`
      passengers.forEach( passenger => db.none( updatePassengerTable, [ this.trainNumber, passenger.id ] ) )
    })
  }

  static find( trainNumber ) {
    return db.one( `SELECT * FROM trains WHERE train_number = $1`, trainNumber )
    .then( train => {
      return new Train({
        trainNumber: train.train_number,
        currentStation: train.current_station,
        nextStation: train.next_station,
        capacity: train.train_capacity,
        numberOfPassengers: train.train_passengers
      })
    })
  }

  static findByStation( stationName ){
    return db.any( `SELECT * FROM trains WHERE current_station = $1`, stationName )
    .then( train => {
      if( train.length ){
        return new Train({
          trainNumber: train[0].train_number,
          currentStation: train[0].current_station,
          nextStation: train[0].next_station,
          capacity: train[0].train_capacity,
          numberOfPassengers: train[0].train_passengers
        })
      }
      else{
        return
      }
    })
  }

  static create( trainData ) {
    return new Train( trainData )
  }

  delete() {
    this.trainNumber = null
    this.currentStation = null
    this.nextStation = null
    this.capacity = null
    this.numberOfPassengers = null
    return db.none( `DELETE from trains WHERE train_number = $1`, this.trainNumber )
  }

  update(){
    return db.none(
      `UPDATE trains SET
      ( train_capacity, train_passengers, current_station, next_station ) =
      ( $2, $3, $4, $5 ) WHERE train_number = $1`,
      [
        this.trainNumber,
        this.capacity,
        this.numberOfPassengers,
        this.currentStation,
        this.nextStation
      ]
    )
  }
}

module.exports = Train
