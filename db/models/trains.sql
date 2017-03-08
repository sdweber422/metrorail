DROP TABLE IF EXISTS trains;
CREATE TABLE IF NOT EXISTS trains (
  train_number INTEGER PRIMARY KEY,
  train_capacity INTEGER DEFAULT 52,
  train_passengers INTEGER DEFAULT 0,
  current_station VARCHAR(32),
  next_station VARCHAR(32)
);
