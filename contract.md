## Description

_Provide a brief, high-level overview of what the final product (artifact) of this goal is. Include any relevant resources or dependencies here._

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

## Specifications

_List of specifications (specs) for the completed goal. These are declarative sentences (statements) describing a feature of the final product._

#### Commands

Expose the following commands (and more, if you need) using the `scripts` property of your `package.json`.

- [ ] `$ npm run test`: run all tests.
- [ ] `$ npm run repl`: open a REPL session with all your library code loaded.
- [ ] `$ npm run db:create`: create the database for the current `NODE_ENV`.
- [ ] `$ npm run db:migrate`: run all schema migrations for the database.
- [ ] `$ npm run db:seed`: insert seed (sample) data into the database.
- [ ] `$ npm run db:drop`: delete the database for the current `NODE_ENV`.
- [ ] `$ npm run db:reset`: drop, create, and migrate the database.
- [ ] `$ npm run db:console`: open a console session for running queries against the database.

#### User Stories

Create models with interfaces to satisfy the following user stories, assuming the "user" in this case is a programmer using your data model.

- [ ] As a user of the `Train` model, I can...
  - [ ] get the number of a particular train.
  - [ ] get the capacity for passengers of a particular train.
  - [ ] get the passengers of a particular train.
  - [ ] determine whether a particular train is full (at capacity) or not.
  - [ ] determine the current station of a particular train.
  - [ ] determine the next station of a particular train.
  - [ ] determine which train is arriving next at a particular station.
  - [ ] move a train to its next station.
  - [ ] offboard passengers whose destination is a train's current station.
  - [ ] onboard passengers of a train at the current station.
  - [ ] find a train by its number.
  - [ ] create a new train.
  - [ ] save new trains to the database.
  - [ ] update existing trains in the database.
  - [ ] delete a train from the database.
- [ ] As a user of the `Train` model, I receive appropriate and descriptive errors.
- [ ] As a user of the `Station` model, I can run unit tests that exercise the specs for every public property, instance method, and class method.
- [ ] As a user of the `Station` model, I can...
  - [ ] get the ID of a particular station.
  - [ ] get the location of a particular station.
  - [ ] get the passengers waiting for a train at a particular station.
  - [ ] get the passengers who have tickets at a particular station.
  - [ ] get the previous station on the line for a particular station.
  - [ ] get the next station on the line for a particular station.
  - [ ] determine which is the next train arriving at a particular station.
  - [ ] find a station by its ID.
  - [ ] find a station by its location.
  - [ ] create a new station.
  - [ ] save new stations to the database.
  - [ ] update existing stations in the database.
  - [ ] delete a station from the database.
- [ ] As a user of the `Station` model, I receive appropriate and descriptive errors.
- [ ] As a user of the `Station` model, I can run unit tests that exercise the specs for every public property, instance method, and class method.
- [ ] As a user of the `Passenger` model, I can...
  - [ ] get the ID of a particular passenger.
  - [ ] get the name of a particular passenger.
  - [ ] get a particular passenger's ticket.
  - [ ] set the current station of a particular passenger.
  - [ ] buy a ticket for a particular passenger from their current station to another specified station.
  - [ ] use a ticket for a particular passenger.
  - [ ] determine the current train for a particular passenger.
  - [ ] determine the current station for a particular passenger.
  - [ ] find a passenger by their ID.
  - [ ] find a passenger by their name.
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

- [ ] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].

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
=======
## Description

_Provide a brief, high-level overview of what the final product (artifact) of this goal is. Include any relevant resources or dependencies here._

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

## Specifications

_List of specifications (specs) for the completed goal. These are declarative sentences (statements) describing a feature of the final product._

#### Commands

Expose the following commands (and more, if you need) using the `scripts` property of your `package.json`.

- [ ] `$ npm run test`: run all tests.
- [ ] `$ npm run repl`: open a REPL session with all your library code loaded.
- [ ] `$ npm run db:create`: create the database for the current `NODE_ENV`.
- [ ] `$ npm run db:migrate`: run all schema migrations for the database.
- [ ] `$ npm run db:seed`: insert seed (sample) data into the database.
- [ ] `$ npm run db:drop`: delete the database for the current `NODE_ENV`.
- [ ] `$ npm run db:reset`: drop, create, and migrate the database.
- [ ] `$ npm run db:console`: open a console session for running queries against the database.

#### User Stories

Create models with interfaces to satisfy the following user stories, assuming the "user" in this case is a programmer using your data model.

- [ ] As a user of the `Train` model, I can...
  - [ ] get the number of a particular train.
  - [ ] get the capacity for passengers of a particular train.
  - [ ] get the passengers of a particular train.
  - [ ] determine whether a particular train is full (at capacity) or not.
  - [ ] determine the current station of a particular train.
  - [ ] determine the next station of a particular train.
  - [ ] determine which train is arriving next at a particular station.
  - [ ] move a train to its next station.
  - [ ] offboard passengers whose destination is a train's current station.
  - [ ] onboard passengers of a train at the current station.
  - [ ] find a train by its number.
  - [ ] create a new train.
  - [ ] save new trains to the database.
  - [ ] update existing trains in the database.
  - [ ] delete a train from the database.
- [ ] As a user of the `Train` model, I receive appropriate and descriptive errors.
- [ ] As a user of the `Station` model, I can run unit tests that exercise the specs for every public property, instance method, and class method.
- [ ] As a user of the `Station` model, I can...
  - [ ] get the ID of a particular station.
  - [ ] get the location of a particular station.
  - [ ] get the passengers waiting for a train at a particular station.
  - [ ] get the passengers who have tickets at a particular station.
  - [ ] get the previous station on the line for a particular station.
  - [ ] get the next station on the line for a particular station.
  - [ ] determine which is the next train arriving at a particular station.
  - [ ] find a station by its ID.
  - [ ] find a station by its location.
  - [ ] create a new station.
  - [ ] save new stations to the database.
  - [ ] update existing stations in the database.
  - [ ] delete a station from the database.
- [ ] As a user of the `Station` model, I receive appropriate and descriptive errors.
- [ ] As a user of the `Station` model, I can run unit tests that exercise the specs for every public property, instance method, and class method.
- [ ] As a user of the `Passenger` model, I can...
  - [ ] get the ID of a particular passenger.
  - [ ] get the name of a particular passenger.
  - [ ] get a particular passenger's ticket.
  - [ ] set the current station of a particular passenger.
  - [ ] buy a ticket for a particular passenger from their current station to another specified station.
  - [ ] use a ticket for a particular passenger.
  - [ ] determine the current train for a particular passenger.
  - [ ] determine the current station for a particular passenger.
  - [ ] find a passenger by their ID.
  - [ ] find a passenger by their name.
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

- [ ] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].

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
