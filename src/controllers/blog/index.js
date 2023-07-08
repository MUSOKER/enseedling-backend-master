const { addBlog } = require('./blog.controllers');
const { findBlogs } = require('./blog.controllers');
const { findBlog } = require('./blog.controllers');
const { updateBlog } = require('./blog.controllers');
const { removeBlog } = require('./blog.controllers');
const { uploading } = require('./blog.controllers');
const { googleDrive } = require('./blog.controllers');

module.exports = {
  addBlog,
  findBlogs,
  findBlog,
  updateBlog,
  removeBlog,
  uploading,
  googleDrive,
};
