const db = require( '../config' ).db
const functions = require( '../functions')
const Passenger = require( './passenger' )

class Train {

  constructor ( trainData ) {
    const {
      trainNumber,
      currentStation,
      nextStation,
      capacity,
      numberOfPassengers
    } = trainData
    this.trainNumber =  trainNumber
    this.currentStation = currentStation || 'Downtown'
    this.nextStation = nextStation
    this.capacity = capacity || 52
    this.numberOfPassengers = numberOfPassengers || 0
  }

  static create( trainData ) {
    let newTrain = new Train( trainData )
    return Promise.all([Train.getNextStation(newTrain.currentStation),newTrain])
    .then( result => {
      result[1].nextStation = result[0]
      return result[1]
    })
    .then( train => train.save() )
    .then( train => Train.find(trainData.trainNumber))
  }


  static getEmptyStations(){
    return db.any(`SELECT * FROM stations WHERE station_name NOT IN (SELECT current_station FROM trains)`)
  }

  static getAllTrains() {
    return db.any( `SELECT train_number FROM trains`)
    .then(trains => Promise.all(
      trains.map(train =>
        Train.find( train.train_number )
        )
     ))
  }

  static getTrainNumber( currentStation ) {
    return db.any( `SELECT * FROM trains WHERE current_station = $1`, currentStation )
    .then( train => {
      if ( !train.length ) {
        throw new Error( 'No train at given station' )
      }
      return train[0].train_number
    })
    .catch( err => {
      throw err
    })
  }

  static getNextStation( currentStation ) {
    return functions.getNextStation( currentStation )
    .then( result => result )
  }

  getNextStation() {
    return functions.getNextStation( this.currentStation )
    .then( result => this.nextStation = result )
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
    .then( train => {
      return new Train({
        trainNumber: train.train_number,
        currentStation: train.current_station,
        nextStation: train.next_station,
        capacity: train.train_capacity,
        numberOfPassenger: train.train_passengers
      })
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
    return db.any( `SELECT id FROM passengers WHERE train_number = $1
      AND destination = $2`, [ this.trainNumber, this.currentStation ] )
    .then( passengers => {
      return Promise.all(passengers.map( passenger => {
        return Passenger.findByID( passenger.id )
      }))
      .then( passengers => {
        return passengers.forEach(passenger => {
          if(passenger.destination === this.currentStation){
            passenger.stationName = this.currentStation
            passenger.trainNumber = null
            passenger.destination = null
            passenger.update()
            this.numberOfPassengers--
          }
        })
      })
    })
    .then(() => this.update())
  }

  onboard() {
    return Passenger.getAllAtStation( this.currentStation )
    .then( passengers => {
      return passengers.forEach(passenger => {
        if(passenger.destination !== null){
          passenger.stationName = null
          passenger.trainNumber = this.trainNumber
          passenger.update()
          this.numberOfPassengers++
        }
      })
    })
    .then(() => this.update())
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
    .catch( err => { throw err } )
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
        return 'No train at that station'
      }
    })
  }


  delete() {
    return db.none( `DELETE from trains WHERE train_number = $1`, this.trainNumber )
    .then( () => {
      let newTrain = new Train( this )
      delete this.trainNumber
      delete this.currentStation
      delete this.nextStation
      delete this.capacity
      delete this.numberOfPassengers
      return newTrain
    })
    .catch( err => { throw err }  )
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
    .then( () => {
      return this
    })
    .catch( err => { throw err } )
  }
}

module.exports = Train
