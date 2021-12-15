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

## Deployment

There's 3 things that need to be deployed:

- Backend + Mongo
- Admin frontend
- Timebooking frontend

Let's take a look at them separately.

### Backend

Backend is a simple Node.JS app that uses `packages/common`. A Docker container can be built with [Dockerfile.backend](Dockerfile.backend).
Backend requires 3 secrets to run:

- `JWT_SECRET` - Secret that will be used for encoding JWTs. It should not change between deployments, otherwise all issued tokens will become unreadable
- `CRYPTO_SECRET` - Secret that is used for encoding/decoding Nokia Auth tokens. It should not change between deployments, otherwise all saved nokia auth tokens in the database will become unreadable
- `MONGODB_URL` - URL to mongodb. Should contain all auth stuff needed

In Azure, we use `App Service` that runs Docker containers.
Deployment goes like this:

1. Github Actions build the Docker container
2. Container is pushed to an Azure Container Registry
3. Container Registry sends a webhook to App Service
4. App Service pulls latest Docker Container and runs it with all necessary environment variables

### Admin Frontend

Admin Frontend app is a React app that is compiled to static assets (html, css, js), hence it does not require any servers to run itself.
Hence, the project can be built and then the static files could be hosted from S3 or whatnot.

This app requires these environment variables to be available in the environment **at build time**:

- `REACT_APP_BACKEND_URL` - URL pointing to the backend that will be used as base url for all requests. **Please make sure it does not have a trailing slash**

In Azure, we use `Static Web App` to do the hosting for us.

Deployment goes like this:

1. Github Actions build the app using `Azure/static-web-apps-deploy` action.
   This action does everything: build, upload, deploy.

That's it!

### Timebooking frontend

Everything from `Admin Frontend` section also applies to timebooking app. Same environment variables, same deployment process.
