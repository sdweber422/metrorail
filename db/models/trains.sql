DROP TABLE IF EXISTS trains;
CREATE TABLE IF NOT EXISTS trains (
  id SERIAL PRIMARY KEY,
  capacity INTEGER DEFAULT 52,
  passengers INTEGER DEFAULT 0,
  current_station INTEGER DEFAULT 1,
  next_station INTEGER
);
