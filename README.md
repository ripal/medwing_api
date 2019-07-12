# Back end application to serve geo code and markers manage request

## Prerequisite

1. Node
2. NPM
3. MySql

## Configuration Instruction

1. `.env` file at root level has all environment variables i.e. db credential, api key.
2. `.env.example` file is the base file to create `.env` file at root level.
3. Copy-paste `.env.example` file to `.env` file.
4. Set PORT number according to your convenient. Default is 3003.
5. Set your Google map api key.
6. Set MySql host, username and password.
7. Never commit `.env` file.
8. `.env.example` file in repo is for reference to other programmers in team.
9. If any change in `.env` file, do the same in `.env.example` file and commit.
10. If this project in future go into the docker, set all above environment variable into the docker way. No code change required.
11. `dotenv` lib is used as dev-dependency for local, hence independent to environment.

## Built Instruction

1. run `npm install` to install dependencies.
2. run `npm run migrate` to create database.
3. run `npm run test` to run unit and integration test.
4. run `npm run local` to run Node Server locally.
5. `Listening on port 3003` means successfully started.

## API Specification

1. [http://localhost:3003/api-docs/](http://localhost:3003/api-docs/) to access API details

## Geocode Library Instruction

1. In future if any library change, models -> Geocoder file need to update only with new library change. No other code change required.
