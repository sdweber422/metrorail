const db = require( '../config' ).db
const functions = require( '../functions')

class Train {

  constructor ( trainNumber, currentStation, nextStation, capacity, numberOfPassengers ) {
    this.trainNumber = trainNumber
    this.currentStation = currentStation || 'Downtown'
    this.nextStation = nextStation
    this.capacity = capacity || 52
    this.numberOfPassengers = numberOfPassengers || 0
  }

  static getTrainNumber( currentStation ) {
    return db.any( `SELECT * FROM trains WHERE current_station = $1`, currentStation )
    .then( train => {
      return train.map( result => result.train_number )
    })
    .catch( err => err )
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
    return metro[station].getNextArrivingAtStation()
  }


  // moveToNextStation
  // offboard
  // onboard
  // find
  create(){
    new Train
    this.save()
    metro.load()
  }
  // delete
  // update
}

module.exports = Train
