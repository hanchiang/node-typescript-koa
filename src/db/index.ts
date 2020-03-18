import { Sequelize, Options } from 'sequelize';
import { createNamespace } from 'cls-hooked';

import config from '../config';
import { init as initUser } from './models/user';
export { User } from './models/user';

/**
 * Enable CLS
 * Ref: https://sequelize.org/master/manual/transactions.html
 */
export const cls = createNamespace('my-service-transaction-namespace');
Sequelize.useCLS(cls);

const mysqlParams: Options = {
  host: config.dbHost,
  dialect: 'mysql',
  logging: false,
};

// https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
mysqlParams.pool = {
  min: 0, // default
  max: 10, // default is 5, mysql allow maximum of 151 connections
  acquire: 30000,
  idle: 10000,
};

export const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  mysqlParams
);

initUser(sequelize);
