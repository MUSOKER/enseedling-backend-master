const express = require('express');

const { blogControllers } = require('../../controllers');

const blogsRoutes = express.Router();

blogsRoutes.post('/create', blogControllers.addBlog);
blogsRoutes.get('/getAll', blogControllers.findBlogs);
blogsRoutes.get('/:blogId', blogControllers.findBlog);
blogsRoutes.put('/:blogId', blogControllers.updateBlog);
blogsRoutes.delete('/:blogId', blogControllers.removeBlog);
blogsRoutes.post('/upload', blogControllers.uploading, blogControllers.googleDrive);

module.exports = blogsRoutes;
