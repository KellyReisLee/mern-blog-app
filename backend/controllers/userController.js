//const errorMiddleware = require('../middleware/errorMiddleware')
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const tokenModel = require("../model/token.js");
const sendEmail = require("../utils/email")
const crypto = require('crypto');
const jwt = require('jsonwebtoken')


// Register user.
// POST: api/users/register
// UNPROTECTED AREA
const registerUser = async (req, res, next) => {

  try {
    const { username, email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    if (!username || !email || !password || !confirmPassword) {
      return res.status(422).json({ message: "All fields are required" })
    }
    if (username.length < 4) {
      return res.status(422).json({ message: 'Username should at least 4 characters. ' })
    }
    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(422).json({ message: 'This user already exist.' })
    }

    if ((password.trim()).length < 8) {
      return res.status(422).json({ message: 'Password should be at least 8 characters.' })
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: 'Password and Confirm Password should match.' })
    }

    const user = await userModel.create({
      username,
      email,
      password: hashedPass
    })

    const token = await tokenModel.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    })

    const link = `${process.env.BASE_URL}/users/verify/${user.id}/${token.token}`
    await sendEmail(user.email, "Verify Email", link, user.username);

    res.status(201).json({ message: 'You received an email.', user, token })

  } catch (error) {

    res.status(500).json({ message: "An error occurred trying create a user", error });

  }

}


// Login a Registed user.
// POST: api/users/login
// UNPROTECTED AREA
const loginUser = async (req, res, next) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required!' })
    }
    const user = await userModel.findOne({ email }).select(-password, -email).lean()
    if (!user) {
      return res.status(400).json({ message: 'Email not found!' })
    }


    const passwordMatch = await bcrypt.compare(password, user.password);
    const { id: _id, username, posts, verified } = user;
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({ token, username, posts, verified });

      });

      // res.status(200).json({ token });
    }
    if (!passwordMatch) {
      return res.json({ error: 'Incorrect password' });
    }

  } catch (error) {
    res.status(500).json({ message: "Login failed. Please check your credentials.", error });
  }
}


// profile user.
// POST: api/users/:id
// PROTECTED AREA
const getUser = async (req, res, next) => {
  // const { token } = req.cookies;

  // if (token) {
  //   jwt.verify(token, process.env.SECRET, {}, (err, user) => {
  //     if (err) throw err
  //     res.json(user)
  //   })
  // } else {
  //   res.json(null)
  // }

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


// Getting all users/authors.
// GET: api/users/authors
// UNPROTECTED AREA
const getVerification = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id })

    if (!user) {
      return res.status(400).json({ message: 'Invalid link' })
    }

    const token = await tokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    })

    if (!token) {
      return res.status(400).json({ message: 'Invalid link' })
    }

    await userModel.updateOne({ _id: user._id, verified: true });
    await tokenModel.findByIdAndDelete(token._id);

    res.status(200).json({ message: "Email verified successfully", user })
  } catch (error) {
    // Captura e trata qualquer erro interno
    console.error('Error during email verification:', error);
    res.status(500).json({ message: "An error occurred during email verification" });
  }
}

const userLogout = async (req, res) => {

  res.clearCookie('token')
  return res.json({ message: 'Success Logout' });

}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeImgUser,
  editUser,
  getAuthors,
  getVerification,
  userLogout
}