const { Router } = require('express')
const {
  createPost,
  getPosts,
  getSinglePost,
  getPostsCategory,
  getAuthorPosts,
  editPost,
  deletePost


} = require('../controllers/postController')

const authMiddleware = require('../middleware/authMiddleware')

const router = Router();

router.post('/', authMiddleware, createPost)
router.get('/', getPosts)
router.get('/:id', getSinglePost)
router.get('/user/:id', getAuthorPosts)
router.get('/categories/:category', getPostsCategory)
router.patch('/edit/:id', editPost)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router