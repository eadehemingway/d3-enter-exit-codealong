
BEGIN;
  DROP TABLE IF EXISTS myTable;
  CREATE TABLE myTable
  (
    id SERIAL PRIMARY KEY,
    myValue VARCHAR(255) NOT NULL
  );

  INSERT into myTable
    (myValue)
  VALUES
    ('value');


  COMMIT;