# MyGarageProject

## Development

Start by cloning this project locally.

There's 2 ways of running all apps and services all together for local devlopment: with Docker and without.

### With Docker

This should be the most compatible way to run projects for non unix-like machines. Also it's the most easiest to set up.

Run

```sh
docker-compose up --build
```

This will take care of linking the packages together, installing all necessary dependencies and starting development builds of all apps and services together.

Main downsides of developing this way is that console is quite hard to follow due to many things being blasted there at the same time with imperfect formatting. Also, there's a negligible performance impact of running everything in Docker.

### Without Docker

1. Install dependencies

```sh
yarn install
```

2. Start development builds of all projects

```sh
yarn dev
```

If you want to run only some of the services and not all, you can:

- `yarn dev:backend` starts dev builds of `common` and `backend`
- `yarn dev:admin` starts dev builds of `common` and `admin`
- `yarn dev:timebooking` starts dev builds of `common` and `timebooking`
