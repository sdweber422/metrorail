const seedCommands = require( './commands' )
const pgp = require( 'pg-promise' )()


seedCommands.insertIntoStations("Downtown", "Elm Street", "Forest Gardens", "Annex", "10th Ave", "Waterfront", "Colosseum", "Central Station", "Parkside", "Grand Boulevard", "Monument Valley", "Museum Isle")

seedCommands.insertIntoTrains( [100, 1, 1],[34, 1, 4],[4000, null, 9],[4, null, 12] )

seedCommands.insertIntoPassengers(

    {
      name: "James Bond",
      origin: 1,
      destination: 5,
      train_id: 2,
      station_id: null
    },
    {
      name: "Jenny Bond",
      origin: 7,
      destination: null,
      train_id: null,
      station_id: 7
    },
    {
      name: "Chris Webber",
      origin: 2,
      destination: 4,
      train_id: null,
      station_id: 2
    },
    {
      name: "Jane Doe",
      origin: 12,
      destination: 5,
      train_id: 1,
      station_id: null
    }

)


pgp.end()
