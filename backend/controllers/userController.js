
// Register user.
// POST: api/users/register
// UNPROTECTED AREA
const registerUser = async (req, res, next) => {
  res.json('Register controller')

}


// Login a Registed user.
// POST: api/users/login
// UNPROTECTED AREA
const loginUser = async (req, res, next) => {
  res.json('Login controller')

}


// profile user.
// POST: api/users/:id
// PROTECTED AREA
const getUser = async (req, res, next) => {
  res.json('Profile controller')

}







// Change user avatar.
// POST: api/users/change-avatar
// PROTECTED AREA
const changeImgUser = async (req, res, next) => {
  res.json('Change user avatar controller')

}







// Edit user details .
// POST: api/users/edit-user
// PROTECTED AREA
const editUser = async (req, res, next) => {
  res.json('Edit user details controller')

}





// Getting all users/authors.
// GET: api/users/authors
// UNPROTECTED AREA
const getAuthors = async (req, res, next) => {
  res.json('Get all authors/users controller')

}




module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeImgUser,
  editUser,
  getAuthors
}