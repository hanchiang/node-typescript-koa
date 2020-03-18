if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.dev' });
}

const config = {
  nodeEnv: process.env.NODE_ENV,
  appEnv: process.env.APP_ENV,
  cookieSecret: process.env.COOKIE_SECRET,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
};

export default config;
