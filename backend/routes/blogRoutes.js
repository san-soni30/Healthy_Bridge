const express = require('express');
const router = express.Router();

const { createBlog, updateBlog, deleteBlog, getAllBlogs, toggleLike } = require('../controllers/blogController');
const { createComment, getComments } = require('../controllers/CommentController');
const { isAdmin, protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/admin/create-blog', protect, isAdmin, upload.single('image'),createBlog);
router.put('/admin/update-blog/:id', protect, isAdmin, upload.single('image'), updateBlog);
router.delete('/admin/delete-blog/:id', protect, isAdmin, deleteBlog);
router.get('/', getAllBlogs);

router.post('/like/:id', protect, toggleLike);

router.post('/comment/:id', protect, createComment);
router.get('/comments/:id', getComments);

// router.post('/share/:id', shareBlog);
module.exports = router;