const { BlogModel } = require('../../models');

const createBlog = async ({
  title,
  smallDescription,
  description,
  createdBy,
  authorImage,
  createdOn,
  category,
  thumbnail,
  isScheduled,
  scheduledOn,
  publicationStatus,
}) => BlogModel.create({
  title,
  smallDescription,
  description,
  createdBy,
  authorImage,
  createdOn,
  category,
  thumbnail,
  isScheduled,
  scheduledOn,
  publicationStatus,
});

const getBlogs = async ({ title, category, publicationStatus }) => {
  const query = {};
  if (title) {
    query.title = title;
  }
  if (category && category.length > 0) {
    query.category = { $in: category };
  }
  if (publicationStatus) {
    query.publicationStatus = publicationStatus;
  }
  return BlogModel.find(query);
};

const getBlog = async ({ blogId }) => BlogModel.findById(blogId);

const updateTheBlog = async ({
  blogId,
  title,
  smallDescription,
  description,
  createdBy,
  authorImage,
  createdOn,
  category,
  thumbnail,
  isScheduled,
  scheduledOn,
  publicationStatus,
}) => BlogModel.findByIdAndUpdate(
  blogId,
  {
    title,
    smallDescription,
    description,
    createdBy,
    authorImage,
    createdOn,
    category,
    thumbnail,
    isScheduled,
    scheduledOn,
    publicationStatus,
  },
  { returnedDocument: 'after' },
);

const deleteBlog = async (blogId) => BlogModel.findByIdAndDelete(blogId);

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateTheBlog,
  deleteBlog,
};
