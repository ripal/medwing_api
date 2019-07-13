# Back end application to serve geo code and markers manage request

## Prerequisite

1. Node
2. NPM
3. MySql

## Configuration Instruction

1. `.env` file contains all environment variables.
2. Create `.env` file from `env.example` file.
3. Never commit `.env` file.
4. Open created `.env` file.
5. Set PORT number according to your convenient. Default is 3003.
6. Set your Google map api key.
7. Open terminal, enter `mysql -u root -p`.
8. Enter your mysql password you set after installation.
9. run `create database database_name` and exit.
9. Open `.env` file & set MySql host, username, password & database_name you set in setp 9.
10. `env.example` file in repo is for reference to other programmers in team.
11. If any change in `.env` file, do the same in `env.example` file and commit.
12. If this project in future go into the docker, set all above environment variable into the docker way. No code change required.
13. `dotenv` lib is used as dev-dependency for local, hence independent to environment.

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
