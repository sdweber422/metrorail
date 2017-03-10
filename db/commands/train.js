const db = require( '../config' ).db
const functions = require( '../functions')
const metro = require( '../index' )

class Train {

  constructor ( trainNumber, currentStation, nextStation, capacity, numberOfPassengers ) {
    this.trainNumber = trainNumber
    this.currentStation = currentStation || 'Downtown'
    this.nextStation = functions.getNextStation('Downtown')
    this.capacity = capacity || 52
    this.numberOfPassengers = numberOfPassengers || 0
  }


  static getTrainNumber( currentStation ) {
    return db.any( `SELECT * FROM trains WHERE current_station = $1`, currentStation )
    .then( train => {
      return train.map( result => result.train_number )
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
    return metro[station].getNextArrivingAtStation()
  }


  // moveToNextStation
  // offboard
  // onboard
  // find

  static create( metro, trainData ) {
    let newTrain = new Train( trainData.trainNumber )
    metro.trains[ trainData.trainNumber ] = newTrain
    metro.trains[ trainData.trainNumber ].save()
    return metro

  }

  // delete
  // update
}

module.exports = Train
