# MetroRail #127

Modeling a city transit system.

This particular city has a simple transit system: just one circular train line with 12 stations and 4 trains.

Base repository for the [MetroRail goals](https://github.com/GuildCrafts/web-development-js/issues?utf8=%E2%9C%93&q=metrorail%20).

View the [126](./contract126.md) for previous project contract and specs.
View the [127](./contract127.md) for this project contract and specs.

## Installation and Setup

Install postgres. 

Clone the repo and setup with ```$npm install```

Run tests with ```$npm test```

Create the database with ```$npm run db:create```

Then migrate with ````$npm run db:migrate````

And seed data with ```$npm run db:seed```

Create the documentation with ```$npm run docs```

And open documentation file with ```$open index.html```

Start the server with ```$npm start```

Then navigate to http://localhost:3000 to interact with the api, or input commands in the terminal.

## Usage and Examples

Here are some example terminal uses for interacting with the API.

'''
curl -X GET http://localhost:3000/api/trains/

curl -X POST http://localhost:3000/api/passengers/create -d '{ "passengerName": "Mary", "Origin":"Parkside", "Destination":null, "trainNumber":2, "stationName":"Parkside" }' --header "Content-Type:application/json

curl -X PUT http://localhost:3000/api/stations/update/Downtown -d '{ "stationNumber": "9" }' --header "Content-type:application/json"

curl -X DELETE http://localhost:3000/api/passengers/delete/1
