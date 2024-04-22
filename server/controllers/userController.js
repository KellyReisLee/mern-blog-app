//const errorMiddleware = require('../middleware/errorMiddleware')
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const tokenModel = require("../model/token.js")
const sendEmail = require("../utils/email")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


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

    const existUsername = await userModel.findOne({ username })
    if (existUsername) {
      return res.status(422).json({ message: 'This Username already exist. Try a different one.' })
    }
    if ((username.trim()).length < 4) {
      return res.status(422).json({ message: 'Username should at least 4 characters. ' })
    }
    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(422).json({ message: 'This Email already exist.' })
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
      password: hashedPass,

    })

    if (!user) {
      return res.status(422).json({ error: 'User not found.' })
    }

    const token = await tokenModel.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    })


    const link = `${process.env.BASE_URL}/users/verify/${user.id}/${token.token}`
    await sendEmail(user.email, "Verify Email", link, user.username, 'Welcome to our App! We\'re very excited to have you on board.', 'To get started with us, please click here:', 'green');

    await tokenModel.findByIdAndDelete(token._id);

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
      return res.status(400).json({ error: 'All fields are required!' })
    }
    const user = await userModel.findOne({ email }).select(-password, -email).lean()

    if (!user) {
      return res.status(400).json({ error: 'Email not found!' })
    }


    const passwordMatch = await bcrypt.compare(password, user.password);
    const { username, posts, verified, avatar } = user;
    const _id = user._id;
    if (!passwordMatch) {
      return res.json({ error: 'Incorrect password' });
    }


    if (verified === false) {
      return res.status(422).json({ error: 'User not Verified! Check your email and click on the link to validate.' })
    }
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({ token: token, username, posts, verified, _id, avatar });

      });


    }

    //res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed. Please check your credentials.", error });
  }
}


// profile user.
// POST: api/users/:id
// PROTECTED AREA
const getUser = async (req, res, next) => {

  try {
    const token = req.cookies.token
    //console.log(token)
    if (token) {
      jwt.verify(token, process.env.SECRET, {}, (err, user) => {
        if (err) throw err
        req.user = user
        res.json(user)
      })

    } else {
      res.json(null)
    }
  } catch (error) {
    res.status(500).json({ message: "User not Authorized!", error });
  }



}







// Change user avatar.
// POST: api/users/change-avatar
// PROTECTED AREA
const changeImgUser = async (req, res) => {

  try {

    if (!req.files.avatar) {
      return res.status(422).json({ error: 'Please! Add an image.' })
    }


    // Checking token data
    const token = req.cookies.token;
    if (!token) {
      return res.status(500).json({ error: 'User Not Authorized!' })
    }
    if (token) {
      jwt.verify(token, process.env.SECRET, {}, async (error, user) => {
        if (error) {
          return res.status(500).json({ error: "User not Authorized!", error });
        }

        //find the actual user from database and change data.
        const userData = await userModel.findById(user.userId);
        // Delete the old image.
        if (userData.avatar) {
          fs.unlink(path.join(__dirname, '..', 'uploads', 'uploadsUserImg', userData.avatar), (err) => {
            if (err) {
              return res.json({ error: err })
            }
          })
        }


        // New avatar:
        const { avatar } = req.files;
        if (avatar.size > 5000000) {
          return res.status(422).json({ error: "Profile picture is too big. Should be less than 500kb " })
        }



        // Changing file's name
        fileName = avatar.name;
        let splitName = fileName.split('.')
        let newFileName = splitName[0] + uuidv4() + '.' + splitName[splitName.length - 1]



        avatar.mv(path.join(__dirname, '..', 'uploads', 'uploadsUserImg', newFileName), async (err) => {
          if (err) {
            return res.json({ error: err })
          }

          const updateUser = await userModel.findByIdAndUpdate(user.userId, { avatar: newFileName }, { new: true }).select('-password')

          if (!updateUser) {
            return res.status(422).json({ error: 'Could not update user image.' })
          }

          const { _doc } = updateUser;
          res.status(200).json({ message: 'Image Updated!', ..._doc, token: token })

        })

      })

    }


  } catch (error) {
    return res.status(500).json({ message: "It's not possible change user image.", error });
  }

}




// Edit user details .
// POST: api/users/edit-user
// PROTECTED AREA
const editUser = async (req, res) => {
  try {

    const id = req.params.id;
    const { username, email, currentPassword, newPassword, confirmNewPassword } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPassEdit = await bcrypt.hash(newPassword, salt)

    // All fields are required.
    if (!username || !email || !currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(422).json({ message: 'All fields are required!' })
    }

    // // get user to update data:
    const user = await userModel.findById(id)
    if (!user) {
      return res.status(403).json({ error: 'User not found!' })
    }

    const userExist = await userModel.findOne({ username: username });
    if (userExist && (userExist._id != id)) {
      return res.status(422).json({ error: 'This username already exist. Please! Try another one.' })
    }

    const emailExist = await userModel.findOne({ email: email });
    if (emailExist && (emailExist._id != id)) {
      return res.status(422).json({ error: 'This email already exist. Please! Try another one.' })
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(422).json({ error: 'The New Password and the Confirm New Password have to match.' })
    }

    if (currentPassword === newPassword) {
      return res.status(422).json({ error: 'The New Password must be different from the Current Password.' })
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(422).json({ error: 'Please! The Current Password is wrong. Try again.' })
    }


    // Checking token data
    const token = req.cookies.token;
    if (!token) {
      return res.status(500).json({ error: 'User Not Authorized!' })
    }
    if (token) {
      jwt.verify(token, process.env.SECRET, {}, async (error, user) => {
        if (error) {
          return res.status(500).json({ error: "User not Authorized!", error });
        }
        const updatedUser = await userModel.findByIdAndUpdate(user.userId, { username: username, email: email, password: hashedPassEdit, id: id }, { new: true })


        if (!updatedUser) {
          return res.status(422).json({ error: 'Could not update user. Try later!' })
        }

        let updatedUserInfo = await userModel.findById(user.userId).select('-password').select('-email')
        const { _doc } = updatedUserInfo;

        res.status(200).json({ message: 'User information updated!', ..._doc, token: token })
      })
    }

  } catch (error) {
    return res.json({ error: "It's not possible change the user data.", error });
  }

}


// Getting all users/authors.
// GET: api/users/authors
// UNPROTECTED AREA
const getAuthors = async (req, res, next) => {
  try {
    const authors = await userModel.find().select('-password -email')
    if (!authors) {
      return res.status(500).json({ message: "Could not find authors!" })
    }

    res.status(200).json(authors)

  } catch (error) {
    res.status(500).json({ message: "An error Occurred! It's not possible find authors!", error });
  }
}


// Getting all users/authors.
// GET: api/users/authors
// UNPROTECTED AREA
const getVerification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id })

    if (!user) {
      return res.status(400).json({ message: 'Invalid user' })
    }


    const token = await tokenModel.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    })

    if (!token) {
      return res.status(400).json({ message: 'Invalid token' })
    }
    // await tokenModel.findByIdAndDelete(token._id);
    const newUser = await userModel.updateOne({ _id: user._id }, { verified: true });


    if (!newUser) {
      return res.status(500).json({ message: "Not possible verify this user!" });
    }

    const link = `${process.env.BASE_URL}/users/verify/${user.id}/${token.token}`
    await sendEmail(user.email, "Verify Email", link, user.username, 'Welcome to our App! We\'re very excited to have you on board.', 'To get started with us, please click here:', '#1B9C85');

    res.status(200).json({ message: "Email verified successfully! You will be redirect to the Login Page.", newUser })


  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ message: "An error occurred during email verification" });
  }
}



// Sending user email - Verify to change password
// GET: api/users/send-email
// UNPROTECTED AREA
const userSendEmail = async (req, res) => {


  try {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ error: 'The email field is required!' })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(422).json({ error: 'User not found.' })
    }

    const token = await tokenModel.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    })

    if (!token) {
      return res.status(422).json({ error: 'Token not found.' })
    }

    const link = `${process.env.BASE_URL}/users/change-password/${user.id}/${token.token}`
    await sendEmail(user.email, "Change Password", link, user.username, 'Thank you for use our app. We\'re very excited to have you.', 'To change your password just click here:', 'red');

    const newUser = await userModel.findOneAndUpdate({ _id: user._id }, { changePassword: 0 }).select('-password')

    //await tokenModel.findByIdAndDelete(token._id);


    res.status(200).json({ message: "Link sent. Please, check your email.", newUser })


  } catch (error) {
    res.status(500).json({ error: error })

  }
}


const changePassword = async (req, res) => {

  const { id, token } = req.params;
  try {
    const { email, password, confirmPassword } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPassEdit = await bcrypt.hash(password, salt)


    if (!email || !password || !confirmPassword) {
      return res.status(422).json({ error: 'All fields are required!' })
    }

    const user = await userModel.findById(id)

    if (!user) {
      return res.status(422).json({ error: 'Could not find user.' })
    }

    const tokenUser = await tokenModel.findOne({ token })
    if (!tokenUser) {
      return res.status(422).json({ error: 'Token not found.' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return res.status(422).json({ error: 'The New Password must be different from the old Password.' })
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ error: 'Password and Confirm Password must match!' })

    }
    // Find user and increase count by one.
    const currentUser = await userModel.findById(id)
    const userChangePassword = currentUser.changePassword + 1;

    await userModel.findByIdAndUpdate(id, { password: hashedPassEdit, changePassword: userChangePassword }, { new: true })
    await tokenModel.findByIdAndDelete(tokenUser._id)

    res.status(200).json({ message: 'Password updated!' })


  } catch (error) {
    res.status(500).json({ error })

  }

}



// Logout logic
const userLogout = async (req, res) => {
  try {
    res.clearCookie('token')
    return res.status(200).json({ message: 'Successfully Logout' });
  } catch (error) {
    res.status(500).json({ error: 'Could not logout.' })
  }
}

module.exports = {
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
}