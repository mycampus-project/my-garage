# MyGarageProject

## Prerequisites

### Node.JS

Install `nvm` on your machine:
https://github.com/nvm-sh/nvm

Then go to this project root folder and run `nvm install`.
This will install Node.JS version that is best for this project (specified in `.nvmrc`).

### Yarn

Make sure you have yarn installed by running `yarn`. If it's not, run `npm install -g yarn`.
This will install `yarn` for that versions of node.

## Development

Run

```sh
yarn install
```

in the root folder of the project. This will install all dependencies for this project.

Run

```sh
docker-compose up --build
```

This will take care of linking the packages together, installing all necessary dependencies and starting development builds of all apps and services together.

If you want to run only some of the services and not all, you can:

- `yarn dev:backend` starts dev builds of `common` and `backend`
- `yarn dev:admin` starts dev builds of `common` and `admin`
- `yarn dev:timebooking` starts dev builds of `common` and `timebooking`

### Adding new dependencies

In order to add new dependencies to a specific project, run:

```sh
yarn workspace @my-garage/<project name> add <dependency>
```

Replace `<project name>` with name of the project, like `garage-backend`.

If you're following a tutorial, it'll probably say you to run something like `yarn add x` or `npm install x`.
You need to replace that with `yarn workspace @my-garage/<project name> add x`
