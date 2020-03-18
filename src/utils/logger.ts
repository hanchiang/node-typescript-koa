import winston from 'winston';

export const winstonOptions = {
  reqUnselect: ['header.authorization'],
};

const logger = winston.createLogger({
  format: winston.format.json(),
  silent: process.env.NODE_ENV === 'test',
});
export default logger;
