**stock-exchange-express-api** is a sample Node.js application which simulates the purchase of stocks.

The Back Story
==============

I worked on the [stock-exchange-api](https://github.com/joshuapaulallen/stock-exchange-api) for a coding assessment.  This was done in Java / Spring Boot, and I made this project to reimplement it in node.js to get some hands-on experience.

Notable Things Learned
----------------------

- Relative paths suck when importing modules.  This plugin was useful to define directory aliases that can be used when importing stuff: [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver). See the `module-resolver` plugin in [.babelrc](./.babelrc).
- This was my first experience with [sequelize](http://docs.sequelizejs.com)]. I'm pretty particular with how I organize my projects, so I liked how I can customize paths for Important Sequelize Things.  See: [.sequelizerc](./.sequelizerc).

How Do I Run It?
================

Prerequisites
-------------

- A relatively recent version of node.js and npm.  I used node v12.2.0 and npm v6.9.0.

Running It
----------

1. Open a command prompt or terminal window.
2. Clone this repo.
3. Navigate to the stock-exchange-api root directory.
4. `npm install`
5. `npm test` to run the test suite.
6. `npm start` to run the server.

You can use this Postman collection to interact with the API: [stock-exchange-express-api.postman_collection.json](docs/stock-exchange-express-api.postman_collection.json)

Details
-------

This application uses [sqlite](https://www.sqlite.org/index.html). Database files are stored in a `data` directory, so they will survive app restarts.


Credits
=======

This application uses a library, [iex-api](https://github.com/bilalq/iex-api), to fetch stock information from a [free public API](https://iextrading.com/developer/docs/#getting-started) by IEX Trading.