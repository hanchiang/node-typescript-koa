const fs = require('fs');

module.exports = {
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "operatorsAliases": "0"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "operatorsAliases": "0"
  },
  "staging": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "operatorsAliases": "0",
    "dialectOptions": {
      "ssl": {
        "ca": "path/to/file"
      }
    }
  },
  "production": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "dialect": "mysql",
    "operatorsAliases": "0",
    "dialectOptions": {
      "ssl": {
        "ca": "path/to/file"
      }
    }
  }
}
