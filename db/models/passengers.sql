DROP TABLE IF EXISTS passengers;
CREATE TABLE IF NOT EXISTS passengers (
  id SERIAL PRIMARY KEY,
  passenger_name VARCHAR(32) NOT NULL CHECK (char_length(passenger_name) >= 4),
  origin VARCHAR(32) DEFAULT NULL,
  destination VARCHAR(32) DEFAULT NULL,
  train_number INTEGER DEFAULT NULL,
  station_name VARCHAR(32) DEFAULT NULL
);
