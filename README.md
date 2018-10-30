# tpl-tasks

> basic user crud implementation

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [yarn](https://yarnpkg.com/) installed.
2. Install your dependencies

    ```
    cd path/to/tpl-tasks; yarn
    ```
3. Copy `config/default.example.json` as `default.json` and change credentials

4. Start your app

    ```
    PG_USER='<pg_username>' PG_PASSWORD='<pg_password>' yarn start
    ```
    or development mode
    ```
    PG_USER='<pg_username>' PG_PASSWORD='<pg_password>' yarn start:dev
    ```

## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
