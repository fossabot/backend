# Backend

Backend API server for ATLauncher.

[![CircleCI](https://circleci.com/gh/ATLauncher/backend.svg?style=svg)](https://circleci.com/gh/ATLauncher/backend)

## Development

If you wish to develop with this repository, please read the following sub sections.

### Installation

#### Setup NodeJS

Before you begin you need to make sure you have the NodeJS 8 or newer installed on your computer.

We use and recommend `nvm` for ease of use when working in this (and other) repositories. `nvm` will allow you to run
`nvm use` in a projects directory to automatically use the version of NodeJS they recommend for their project.

You can download `nvm` from the below repositories:

* Windows: <https://github.com/coreybutler/nvm-windows>
* OSX/\*nix: <https://github.com/creationix/nvm>

**NOTE:** This repository is **NOT** compatible with Yarn. Please don't attempt to use Yarn. Support will not be given
with Yarn.

You will also want to make sure you've setup your system for `node-gyp` by following their
[install docs](https://github.com/nodejs/node-gyp#installation) for your system.

Clone the repository and run the following commands under your project root:

#### Install the projects dependencies

```shell
npm install
```

#### Running database migrations

Once done you need to run the migrations. In development mode (which is default) the application will use a sqlite
database at `/db/development.sqlite3`.

To run the migrations simply run:

```shell
npm run db:migrate
```

If you want to play with some test data, you can run the db seeds:

```shell
npm run db:seed
```

This will run the seed files, to generate testing/fake data, from the seeds directory.

#### Start the development server

Next you can start the development server by running:

```shell
npm run dev
```

This will auto restart the server when you make changes to the code.

### Testing

To run the tests simply run the following command:

```shell
npm test
```

### Linting

To run the linter:

```shell
npm run lint
```

This will check the code against our ESLint rules (<https://github.com/ATLauncher/javascript>).

Linting is also run before pushing any code changes to ensure that all code pushed is clean and styled correctly.

### Database changes

When making any changes that require database schema changes, these must be done through the use of migrations.

Migrations are meant to be run only once, and make the changes needed to the database while also providing a way to
rollback those changes.

To create a new migration, run the following:

```shell
node ./node_modules/.bin/knex migrate:make name_of_migration
```

The name of your migration should describe what it does. For instance when adding a new table called 'messages' it
should be `create_messages_table`. And when changing a table it should be something like
`change_type_of_name_field_in_messages_table`.

All migrations should correctly roll back tables to their original state or remove tables/fields added.

Once a migration is written, it should **NEVER** be modified. Any modifications to migrations can cause data issues.

**NOTE**: Migration files will constantly be changing during initial development, so do not rely on them functioning as
proper migrations until the **feature/initial-code** branch has been merged into the **develop** branch.

## Configuration

All configuration files can be found in the `/config` folder.

They're divided up into 5 main files:

* `default.json`: This file is the very base file and contains configuration that is used as defaults in all
  environments unless overwritten by below files.
* `test.js`: This file contains setting overrides for when in test.
* `development.json`: This file contains setting overrides for when in development.
* `production.json`: This file contains setting overrides for when in prodution.
* `local.json`: This file contains setting overrides for all environments and should be gitignored or dynamically
  populated with a system like Ansible.

Configuration can be specified as either a `json` file, `js` file or as environment variables. For more information on
the configuration files see the [node-config](https://github.com/lorenwest/node-config) repository.

## Defining Routes

To define routes, we use different modules. Each module contains a `router.js` and a `controller.js` file.

Inside the `router.js` file is the configuration for the routes, including any middleware, access control and
authentication checks to run.

### Middleware Order

There is a bunch of middleware that runs on each request, depending on how you have defined your route.

The general order is:

* Check for authenticated user (accessControl.authenticated === true)
* Check for the user to have a specific role (accessControl.role)
* Check if user has access to route (accessControl.check === true)
* Param resolver (defined as an export in the `routes.js` file)
* Any middleware defined in the route definition under `middleware` array
* Filter out inaccessible attributes from request (accessControl.filter === true)
* Controller method
* Any middleware defined in the route definition under `afterMiddleware` array
* Filter out inaccessible attributes from response (accessControl.filter === true)

## Running in production

To run in production you need to first build the code:

```shell
npm run build
```

Then you need to run the migrations for the production environment:

```shell
NODE_ENV=production npm run migrate
```

This will run the migrations on the defined production database specified in `/knexfile.js` which by default is set to
use MySQL using the credentials in the production config.

Then once ready to run simply run:

```shell
NODE_ENV=production npm start
```

## Docker builds

To build an image with Docker, simply run the following:

```shell
docker build -t atlauncher/backend .
```

Then to run:

```shell
docker run -p 3000:3000 atlauncher/backend-next
```

## Contributing

If you wish to contribute to this repository in any way, take a look at [CONTRIBUTING.md](CONTRIBUTING.md).
