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
    const { username, posts, verified, avatar } = user;
    const id = user._id;

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({ token, username, posts, verified, id, avatar });

      });

      // res.status(200).json({ token });
    }
    if (!passwordMatch) {
      return res.json({ error: 'Incorrect password' });
    }

    if (verified === false) {
      return res.status(422).json({ message: 'User not Verified! Check your email and activate the link.' })
    }

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
      return res.status(422).json({ message: 'Please! Add an image.' })
    }


    // Checking token data
    const token = req.cookies.token;
    if (!token) {
      return res.status(500).json('User Not Authorized!')
    }
    if (token) {
      jwt.verify(token, process.env.SECRET, {}, async (err, user) => {
        if (err) {
          return res.status(500).json({ message: "User not Authorized!", err });
        }




        //find the actual user from database and change data.
        const userData = await userModel.findById(user.userId);
        // Delete the old image.
        if (userData.avatar) {
          fs.unlink(path.join(__dirname, '..', 'uploads', userData.avatar), (err) => {
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
        let fileName;
        fileName = avatar.name;
        let splitName = fileName.split('.')
        let newFileName = splitName[0] + uuidv4() + '.' + splitName[splitName.length - 1]



        // let splitedData = newFileName[newFileName.length - 1]
        // let extensions = ['png', 'jpg', 'jpeg']
        // if (extensions.indexOf(splitedData) === -1) {
        //   return res.status(422).json({ error: 'Just these extensions are allowed: png, jpg, jpeg' })
        // }

        avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
          if (err) {
            return json({ error: err })
          }

          const updateUser = await userModel.findByIdAndUpdate(user.userId, { avatar: newFileName }, { new: true }).select('-password')

          if (!updateUser) {
            return res.status(422).json({ error: 'Could not update user image.' })
          }

          res.status(200).json({ message: 'Image Updated!', updateUser })

        })

      })

    }



  } catch (error) {
    return res.status(500).json({ message: "It's not possible change user image.", error, casa });
  }

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

    const token = await tokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    })

    if (!token) {
      return res.status(400).json({ message: 'Invalid token' })
    }
    // await tokenModel.findByIdAndDelete(token._id);
    const newUser = await userModel.updateOne({ _id: user._id }, { verified: true });


    if (!newUser) {
      return res.status(500).json({ message: "Not possible verify this user!" });
    }


    res.status(200).json({ message: "Email verified successfully!", user })

  } catch (error) {
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