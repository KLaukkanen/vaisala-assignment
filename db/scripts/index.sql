CREATE DATABASE weather_data;
USE weather_data;
CREATE SCHEMA default;



IF NOT EXISTS(SELECT FROM information_schema.tables where table_schema = 'default' and table_name = 'temp_data')
BEGIN
    CREATE TABLE temp_data(city char(100) CONSTRAINT pk_temp_data PRIMARY KEY,
        location: Point,
        temp: float,
        humidity: float
    )

END