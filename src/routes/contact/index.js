const express = require('express');
const { error } = require('@Enseedling/enseedling-lib-handler');
const contactsRoutes = require('./contact.routes');

const contactRoutes = express.Router();

contactRoutes.use(contactsRoutes);

contactRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = contactRoutes;
