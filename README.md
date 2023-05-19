# Shapes Project
This project uses **hexagonal architecture to structure** its code, This project is created using **vite**. Here's how to use the available scripts to get started:

## Installation
To install dependencies, run:

```
yarn install
```

## Starting the React App
This command will start the React app in development mode.

```
yarn run dev
```

## Build App
Builds the app for production to the **dist** folder.

```
yarn run build
```

## Preview build
Previews your production build locally.

```
yarn run preview
```

## Linting
Lints the project using **eslint**.

```
yarn run lint
```

## Format code
Formats your code.

```
yarn run prettier
```

## Unit test
Launches the test runner in the interactive watch mode using **vitest**.

```
yarn run test
```

## Test coverage

Reports test coverage.

```
yarn run coverage
```

## Building and Running Docker Images
This command will run a **Docker container using the compose.yaml** file. It also uses an environment variables file located in the root directory called .env.example which can be used to create an .env file..

```
yarn run docker:run
```

This command will use **Docker Compose to start all containers** defined in the compose.yaml file in the background (detached mode). It runs the docker:run script followed by the command up -d.

```
yarn run docker:up
```

This command will **build a Docker image** using the Dockerfile file. Similar to docker:run, it also uses the .env environment variables file.
```
yarn run docker:build
```

This command will **launch an interactive terminal** session within a running container. It runs the docker:run exec -ti -- command.
```
yarn run docker:command
```
