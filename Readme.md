# Introduction

Rest API for storing temperature and humidity data for cities. Provides lookup based on latitude and longitude coordinates. Full API specification available at http://localhost:3000/api-docs when deployed.

# Frameworks

- Express
- Swagger with request and response validation
- Docker for contained environments
- TypeScript
- Jest end-to-end tests
- Postgresql database with PostGIS spatial data types and indexing

# deploy

`docker compose -f compose/deploy.yml up`  
or  
`./scripts/deploy.sh`

Launches database and built backend app in separate containers. Database not exposed, API available at localhost:3000.

# test

`docker compose -f compose/test.yml --build --exit-on-container-exit up`  
or  
`./scripts/test.sh`

Runs all the tests in containerized environment and provides a coverage report.

# Dev start

`docker compose -f compose/dev.yml up --watch`  
or  
`./scripts/dev.sh`

Launches containerized app and database with build on change, enabling development without a working node environment. Exposes database at port 5500.

# Test scripts

API can be tested via API documentation or curl. The repository provides two example scripts for testing: `scripts/getCity.sh` and `scripts/postTestData.sh`. `postTestData.sh` posts the data in `testData.json`, and `getCity.sh` queries API with example coordinates.

# Api

Api documentation available in http://localhost:3000/api-docs
