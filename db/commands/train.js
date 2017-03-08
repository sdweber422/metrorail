
const db = require( '../config' ).db

class Train {

  constructor ( train_number, current_station, capacity, passengers ) {
    this.train_number = train_number
    this.current_station = current_station || 1
    this.next_station = this.current_station % 12 + 1
    this.capacity = capacity || 52
    this.passengers = passengers || 0
    this.save()
  }

  static getTrainNumber( current_station ) {
    return db.any( `SELECT * FROM trains WHERE current_station = $1`, current_station )
    .then( train => {
      console.log( "TRAIN ",train )
      return train[0].train_number
    })
  }

  save(){
    return db.one(
      `INSERT INTO trains
      ( capacity, passengers, current_station, next_station )
      VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`,
      [
        this.train_number,
        this.capacity,
        this.passengers,
        this.current_station,
        this.next_station
      ]
    )
    .then( train => {
      console.log( 'train', train )
    })
  }

}

module.exports = Trains
