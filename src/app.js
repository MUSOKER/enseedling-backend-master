// Impprt external packages
const { error } = require('@Enseedling/enseedling-lib-handler');
const express = require('express');
const cors = require('cors');
// Import internal modules
const { connectToMongoDb, environmentVariables } = require('./config');
const apiRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'working fine' });
});

// Connect to db;

// use routes
app.use(apiRoutes);

// global error handler
app.use(error.handler);

app.listen(environmentVariables.APP_PORT || 8000, (err) => {
  if (err) {
    console.error(err);
  }
  connectToMongoDb()
    .then(() => {
      console.info('connected to mongodb atlas');
      console.info(
        `Server running on ${environmentVariables.APP_HOST}:${environmentVariables.APP_PORT}`,
      );
    })
    .catch((_error) => {
      console.log(_error);
    });
});

module.exports = app;
