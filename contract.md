## Description

Build the data model and database for a city transit system.

This particular city has a simple transit system: just one circular train line with 12 stations and 4 trains.

Here is a list of the train stations in this fictional city (they are along a circular line, so the station after `Museum Isle` is `Downtown`).

```
1. Downtown
2. Elm Street
3. Forest Gardens
4. Annex
5. 10th Ave
6. Waterfront
7. Colosseum
8. Central Station
9. Parkside
10. Grand Boulevard
11. Monument Valley
12. Museum Isle
```
## Installation

- Clone this repository: git clone https://github.com/TrevorJamesH/metrorail [directory_name]
- Navigate into newly created directory
- Type npm Install
- npm install eslint -g
- npm run db:create
- npm run db:migrate
- npm run db:seed
- npm test

## Specifications

Expose the following commands (and more, if you need) using the `scripts` property of your `package.json`.

- [X] `$ npm run test`: run all tests.
- [ ] `$ npm run repl`: open a REPL session with all your library code loaded.
- [X] `$ npm run db:create`: create the database for the current `NODE_ENV`.
- [X] `$ npm run db:migrate`: run all schema migrations for the database.
- [X] `$ npm run db:seed`: insert seed (sample) data into the database.
- [X] `$ npm run db:drop`: delete the database for the current `NODE_ENV`.
- [X] `$ npm run db:reset`: drop, create, and migrate the database.
- [X] `$ npm run db:console`: open a console session for running queries against the database.

#### User Stories

Create models with interfaces to satisfy the following user stories, assuming the "user" in this case is a programmer using your data model.

- [X] As a user of the `Train` model, I can...
  - [X] get the number of a particular train.
  - [X] get the capacity for passengers of a particular train.
  - [X] get the passengers of a particular train.
  - [X] determine whether a particular train is full (at capacity) or not.
  - [X] determine the current station of a particular train.
  - [X] determine the next station of a particular train.
  - [X] determine which train is arriving next at a particular station.
  - [X] move a train to its next station.
  - [X] offboard passengers whose destination is a train's current station.
  - [X] onboard passengers of a train at the current station.
  - [X] find a train by its number.
  - [X] create a new train.
  - [X] save new trains to the database.
  - [X] update existing trains in the database.
  - [X] delete a train from the database.
- [ ] As a user of the `Train` model, I receive appropriate and descriptive errors.
- [ ] As a user of the `Station` model, I can run unit tests that exercise the specs for every public property, instance method, and class method.
- [X] As a user of the `Station` model, I can...
  - [X] get the ID of a particular station.
  - [X] get the location of a particular station.
  - [X] get the passengers waiting for a train at a particular station.
  - [X] get the passengers who have tickets at a particular station.
  - [X] get the previous station on the line for a particular station.
  - [X] get the next station on the line for a particular station.
  - [ ] determine which is the next train arriving at a particular station.
  - [X] find a station by its ID.
  - [X] find a station by its location.
  - [X] create a new station.
  - [X] save new stations to the database.
  - [X] update existing stations in the database.
  - [X] delete a station from the database.
- [ ] As a user of the `Station` model, I receive appropriate and descriptive errors.
- [ ] As a user of the `Station` model, I can run unit tests that exercise the specs for every public property, instance method, and class method.
- [X] As a user of the `Passenger` model, I can...
  - [X] get the ID of a particular passenger.
  - [X] get the name of a particular passenger.
  - [X] get a particular passenger's ticket.
  - [X] set the current station of a particular passenger.
  - [X] buy a ticket for a particular passenger from their current station to another specified station.
  - [ ] use a ticket for a particular passenger.
  - [ ] determine the current train for a particular passenger.
  - [ ] determine the current station for a particular passenger.
  - [X] find a passenger by their ID.
  - [X] find a passenger by their name.
  - [ ] find all passengers at a station.
  - [ ] find all passengers on a train.
  - [ ] create a new passenger.
  - [ ] save new passengers to the database.
  - [ ] update existing passengers in the database.
  - [ ] delete a passenger from the database.
- [ ] As a user of the `Passenger` model, I receive appropriate and descriptive errors.
- [ ] As a user of the `Station` model, I can run unit tests that exercise the specs for every public property, instance method, and class method.

### Required

_Do not remove these specs - they are required for all goals_.

- [X] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].

### Stretch

Pick a _different_ database from the one you used (some ideas: CouchDB, Mongo, Neo4J, MariaDB) and write an alternate implementation.

- [ ] Equivalent commands exist for the alternate database.
- [ ] A database module exists with configuration options to specify which database to use.
- [ ] All tests pass when using the alternate database.

## Quality Rubric

_What are some appropriate quality objectives for this goal? These are statements about the internal characteristics of the product that demonstrate fine design and craftspersonship, not its external features._

**Well formatted code**
- Code uses a linter, which can be invoked with a command (e.g. `npm run lint`). [50 points]
- Running the linter on all source code files generates no linting errors. [50 points]

**Clear and useful README**
- Repository includes a README file with installation and setup instructions. [25 points]
- Repository includes a README file with usage instructions and at least one example use case. [25 points]

**Proper dependency management**
- There is a command to install dependencies (e.g. `npm install`) and it is specified in the installation and setup instructions of the README. [50 points]

**Good project management**
- Commit messages are concise and descriptive. [25 points]
- All features are added via pull requests. [25 points]
- Every pull request has a description summarizing the changes made. [25 points]
- Every pull request has been reviewed by at least one other person. [25 points]

---

<!-- LICENSE -->

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a>
<br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

[mit-license]: https://opensource.org/licenses/MIT
