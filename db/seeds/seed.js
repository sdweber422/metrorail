const seedCommands = require( './commands' )
const pgp = require( 'pg-promise' )()


seedCommands.insertIntoStations(
  {
    station_number: 1,
    station_name: "Downtown"
  },
  {
    station_number: 2,
    station_name: "Elm Street"
  },
  {
    station_number: 3,
    station_name: "Forest Gardens"
  },
  {
    station_number: 4,
    station_name: "Annex"
  },
  {
    station_number: 5,
    station_name: "10th Ave"
  },
  {
    station_number: 6,
    station_name: "Waterfront"
  },
  {
    station_number: 7,
    station_name: "Colosseum"
  },
  {
    station_number: 8,
    station_name: "Central Station"
  },
  {
    station_number: 9,
    station_name: "Parkside"
  },
  {
    station_number: 10,
    station_name: "Grand Boulevard"
  },
  {
    station_number: 11,
    station_name: "Monument Valley"
  },
  {
    station_number: 12,
    station_name: "Museum Isle"
  }
)

seedCommands.insertIntoTrains(
  {
    train_number: 1,
    train_capacity: 100,
    train_passengers: 1,
    current_station: "Downtown",
    next_station: "Elm Street"
  },
  {
    train_number: 2,
    train_capacity: 34,
    train_passengers: 1,
    current_station: "Annex",
    next_station: "10th Ave"
  },
  {
    train_number: 5,
    train_capacity: 4000,
    train_passengers: null,
    current_station: "Parkside",
    next_station: "Grand Boulevard"
  },
  {
    train_number: 12,
    train_capacity: 4,
    train_passengers: null,
    current_station: "Museum Isle",
    next_station: "Downtown"
  }
)

seedCommands.insertIntoPassengers(

  {
    passenger_name: "James Bond",
    origin: "Downtown",
    destination: "10th Ave",
    train_number: 2,
    station_name: null
  },
  {
    passenger_name: "Jenny Bond",
    origin: "Colosseum",
    destination: null,
    train_number: null,
    station_name: "Colosseum"
  },
  {
    passenger_name: "Chris Webber",
    origin: "Elm Street",
    destination: "Annex",
    train_number: null,
    station_name: "Elm Street"
  },
  {
    passenger_name: "Jane Doe",
    origin: "Museum Isle",
    destination: "10th Ave",
    train_number: 1,
    station_name: null
  }
)
