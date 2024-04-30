--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Screen (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL,
  type TEXT    NOT NULL
);

INSERT INTO Screen (name, type) VALUES ('Default', 'legacy');

CREATE TABLE Scene (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  triggerType TEXT    NOT NULL,
  triggerData TEXT    NOT NULL,
  active      INTEGER NOT NULL DEFAULT 1
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Screen;
DROP TABLE Scene;
