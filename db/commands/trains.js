
const db = require( './config' ).db
const pgp = require( './config' ).pgp 

db.one("INSERT INTO trains ( capacity ) VALUES ( 50 ) RETURNING *")
.then( data => console.log( data ) )

pgp.end()

class Trains {

  constructor ( name ) {
    this.name = name || 'LG'
  }

}

module.exports = Trains

