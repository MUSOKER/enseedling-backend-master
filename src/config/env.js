if (process.env.ENVIRONMENT === 'enseedling-local') {
  // eslint-disable-next-line import/no-unresolved,no-unused-vars,global-require
  require('dotenv').config({ path: './config.env' });
}
require('dotenv').config({ path: './config.env' });

module.exports = {
  ENVIRONMENT: process.env.ENVIRONMENT || 'enseedling-local',
  APP_PORT: process.env.APP_PORT || '8080',
  APP_HOST: process.env.APP_HOST,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI_TEST: process.env.MONGO_URI_TEST,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
