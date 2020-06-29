# Garlic.ly
We have created a website for a hotel that resides in the lovely city of Gilroy.

This repo focuses on the calendar and booking module. From here the user will be able to select dates for their trip and see the total for their stay. They can also update the records so that the hotel will be aware of how many guests are coming, which is seperated by adults, children, and infants.

## Related Projects

  - https://github.com/garlic-ly/calendar-service
  - https://github.com/garlic-ly/photo-gallery-service
  - https://github.com/garlic-ly/reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

In order to use this repo you must do the following:
1. Create a MySQL database using the schema.sql file found in the DB folder (mysql -u root -p < pathname)
2. Once that is complete seed the DB by running 'npm run seed'
3. After the DB has been seeded, compile the project using 'npm run webpack'
4. Once that is compiled, run 'npm run start' to kick off the server and bring it live

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

