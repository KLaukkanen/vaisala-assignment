
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE TABLE IF NOT EXISTS temp_data(city varchar(100) CONSTRAINT pk_temp_data PRIMARY KEY,
        location geography(POINT),
        temp float,
        humidity float
    );

    CREATE INDEX IF NOT EXISTS iLocation on temp_data USING BRIN (location);