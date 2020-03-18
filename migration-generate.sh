#!/bin/bash

cat > ./src/db/migrations/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
import { QueryInterface, SequelizeStatic } from 'sequelize';
import { userSchema } from '../models/user';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.createTable('ls_user', userSchema);
  },
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.dropTable('ls_user');
  },
};
EOF