
const db = require( '../config' ).db

class Trains {

  constructor ( capacity, current_station, passengers ) {
    this.capacity = capacity || 52
    this.current_station = current_station || 1
    this.next_station = this.current_station % 12 + 1
    this.passengers = passengers || 0
    this.number = null
    this.save()
  }

  static getTrainNumber( current_station ) {
    return db.any( `SELECT * FROM trains WHERE current_station = $1`, current_station )
    .then( train => {
      console.log( "TRAIN.ID ",train )
      return train[0].id
    })
  }

  save(){
    return db.one(
      `INSERT INTO trains
      ( capacity, passengers, current_station, next_station )
      VALUES ( $1, $2, $3, $4 ) RETURNING *`,
      [
        this.capacity,
        this.passengers,
        this.current_station,
        this.next_station
      ]
    )
    .then( train => {
      this.number = train.id
      console.log( 'this.number', this.number )
    })
  }

}

module.exports = Trains
