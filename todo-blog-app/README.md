# todo-blog-app

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

First move to this directory `cd todo-blog-app`.

## Setup

Run `npm install` to install the application dependencies.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

## Build

Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts are located in the `dist/analog/server` directory.

## Test

Run `npm run test` to run unit tests with [Vitest](https://vitest.dev).

# Prisma

## Database setup

Run `npm install prisma --save-dev` and `npm install @prisma/client` to install prisma.

Run `npx prisma init` to initialize the prisma database.

Run `npx prisma generate` to generate a database from a schema.

## Run the database

The prisam database in this project runs with docker and listens to the port `5433:5432`. The databse URL is: `DATABASE_URL="postgresql://postgres:secret123@localhost:5433/mydb` and can be found in the `.env`-file.

Run `npx prisma db push` to create the database with the schema.

## Reset the database

Run `npx prisma migrate reset` to reset the database.
