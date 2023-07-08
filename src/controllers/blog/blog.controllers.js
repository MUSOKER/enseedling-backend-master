const { error, success } = require('@Enseedling/enseedling-lib-handler');
const { google } = require('googleapis');
const multer = require('multer');
const fs = require('fs');
const { blogValidation } = require('../../validations');

const { blogServices } = require('../../services');

const addBlog = async (req, res, next) => {
  try {
    const {
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
    } = await blogValidation.addBlogValidation.validateAsync(req.body);
    /**
     * now dump all fields into db and return data
     */
    const blog = await blogServices.createBlog({
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
    return success.handler({ blog }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const findBlogs = async (req, res, next) => {
  try {
    const { title, category, publicationStatus } = await blogValidation.getBlogsValidation.validateAsync(req.query);
    /**
     * pass query parameters to service to filter data
     */
    const blogs = await blogServices.getBlogs({
      title,
      category,
      publicationStatus,
    });
    return success.handler({ blogs }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const findBlog = async (req, res, next) => {
  try {
    const blogId = await blogValidation.blogIdValidation.validateAsync(req.params);
    const blog = await blogServices.getBlog(blogId);
    if (!blog) {
      throw error.throwNotFound({ message: 'Blog' });
    }
    return success.handler({ blog }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const {
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
    } = await blogValidation.updateBlogValidation.validateAsync(req.body);
    const { blogId } = await blogValidation.blogIdValidation.validateAsync(req.params);
    await blogServices.updateTheBlog({
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
    });
    return success.handler({ message: 'Blog updated successfully' }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const removeBlog = async (req, res, next) => {
  try {
    const { blogId } = await blogValidation.blogIdValidation.validateAsync(req.params);
    const deletedBlog = await blogServices.deleteBlog(blogId);
    return success.handler({ deletedBlog }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid type, Insert an image');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, './uploads');
  },
  filename(req, file, cb) {
    const fileName = file.originalname.split('').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });
const uploading = upload.single('image');

const googleDrive = async (req, res, next) => {
  try {
    // Set up the Google Drive API client
    const GOOGLE_API_FOLDER_ID = '1cyS_NIFjn6HIB4TLaauCt-dYPmda6cgo';
    const auth = new google.auth.GoogleAuth({
      keyFile: './googlekey.json',
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const drive = google.drive({ version: 'v3', auth });
    // Upload the image to Google Drive
    const fileMetadata = {
      name: req.file.filename,
      parents: [GOOGLE_API_FOLDER_ID],
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };
    const { data: { webViewLink } } = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'webViewLink',
    });

    // Return the public URL
    return success.handler({ webViewLink }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addBlog,
  findBlogs,
  findBlog,
  updateBlog,
  removeBlog,
  uploading,
  googleDrive,
};
