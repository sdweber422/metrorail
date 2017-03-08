
const db = require( '../config' ).db
const functions = require( '../functions')

class Train {

  constructor ( train_number, current_station, train_capacity, train_passengers ) {
    this.train_number = train_number
    this.current_station = current_station || "Downtown"
    this.next_station = Train.getNextStation( this.current_station )
    this.train_capacity = train_capacity || 52
    this.train_passengers = train_passengers || 0
    this.save()
  }

  static getTrainNumber( current_station ) {
    return db.any( `SELECT * FROM trains WHERE current_station = $1`, current_station )
    .then( train => {
      console.log( "TRAIN ",train )
      return train[0].train_number
    })
  }

  static getNextStation( current_station ) {
    return functions.getNextStation( current_station )
    .then( result => result )
  }

  save(){
    return db.one(
      `INSERT INTO trains
      ( train_number, train_capacity, train_passengers, current_station, next_station )
      VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`,
      [
        this.train_number,
        this.train_capacity,
        this.train_passengers,
        this.current_station,
        this.next_station
      ]
    )
  }

}

module.exports = Train
