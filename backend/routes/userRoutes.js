const { Router } = require('express')
const {
  registerUser,
  loginUser,
  getUser,
  changeImgUser,
  editUser,
  getAuthors,
  getVerification,
  userLogout
} = require('../controllers/userController')

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getAuthors)
router.post('/change-avatar', changeImgUser)
router.patch('/edit-user', editUser)
router.get('/verify', getVerification)
router.get('/api/users/logout', userLogout)


module.exports = router