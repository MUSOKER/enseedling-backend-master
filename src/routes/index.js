const express = require('express');
const { error } = require('@Enseedling/enseedling-lib-handler');
const blogRoutes = require('./blogs');
const contactRoutes = require('./contact');

const apiRoutes = express.Router();

apiRoutes.use('/blog', blogRoutes);
apiRoutes.use('/contact', contactRoutes);

apiRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = apiRoutes;
