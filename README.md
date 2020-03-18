# My service

This project is created using [koa](https://koajs.com/)

# Project structure

- `chart/`: Helm chart resources for deployment to AWS EKS
- `src/`
  - `controllers/`: Main route logic are found here
  - `config/`: Contains pre-defined environment variables
  - `constants/`: Contains constants used in the entire service
  - `db/`: DB configuration and connection
    - `migrations/`: Contains a list of migrations used in the project
    - `schema.sql`: SQL script to create tables in the database
  - `routes/`: APIs routes
  - `services/`: Finer grained logic that serves route controllers (and others)
  - `types/`: Typescript typings for various codes
  - `/utils/`: Various utility functions
- `test/`: Integration tests and unit tests

# Set up environment variables

- Set up environment file `.env.dev` and `.env.test` at project root, by referring to `.env.sample` and `.env.test.sample` respectively

# Running the project

**Run in development mode**

- Start: `docker-compose up -d my-service`
- Server is avaiilable at `localhost:3000`
- Stop: `docker-compose down`

**Run tests**

- Unit tests: `npm run test-unit`
- Integration tests: `npm run test-integration`
- All tests: `npm run test`

# Sequelize migrations

Sequelize migrations are managed using the [this guide](https://medium.com/@samratshaw/sequelize-cli-migrations-with-typescript-bd1bd41cbd6)

**Migration config**  
The migration config file contains the DB connection for each environment

- Place ssl file in in `src/db/config/`
- Create a `config.js` in `src/db/config/`, by following `src/db/config/config.sample.js` and modifying the values accordingly

**Writing migration**

- Generate migration file: `./migration-generate.sh <name-of-migration>`, which will create the migration file in `db/src/migrations`
- Write the migration in that file

**Run migration**

- Migrate: `./migrate.sh <environment>`, e.g. `./migrate.sh development`
- Undo migrate: _Stay tuned_
