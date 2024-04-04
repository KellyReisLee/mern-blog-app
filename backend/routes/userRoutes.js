const { Router } = require('express')
const {
  registerUser,
  loginUser,
  getUser,
  changeImgUser,
  editUser,
  getAuthors,
  getVerification,
  userLogout,
  userSendEmail,
  changePassword
} = require('../controllers/userController')

const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getAuthors)
router.post('/change-avatar', changeImgUser)
router.patch('/:id/edit-user', editUser)
router.get('/verify/:id/:token', getVerification)
router.get('/api/users/logout', userLogout)
router.post('/send-email', userSendEmail)
router.patch('/change-password/:id/:token', changePassword)




module.exports = router