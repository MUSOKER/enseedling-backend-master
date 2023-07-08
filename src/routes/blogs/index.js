const express = require('express');
const { error } = require('@Enseedling/enseedling-lib-handler');
const blogsRoutes = require('./blogs.routes');

const blogRoutes = express.Router();

blogRoutes.use(blogsRoutes);

blogRoutes.use('*', () => error.throwNotFound({ item: 'Route' }));

module.exports = blogRoutes;
