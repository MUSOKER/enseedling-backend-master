const { createBlog } = require('./blog.services');
const { getBlogs } = require('./blog.services');
const { getBlog } = require('./blog.services');
const { updateTheBlog } = require('./blog.services');
const { deleteBlog } = require('./blog.services');

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateTheBlog,
  deleteBlog,
};
