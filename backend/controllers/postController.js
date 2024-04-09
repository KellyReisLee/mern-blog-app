const Post = require('../model/postsModel')
const User = require('../model/userModel')
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')



// ____________CREATE POST
// POST: api/posts
// Protected area.
const createPost = async (req, res, next) => {

  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return res.status(422).json({ error: 'All fields are required.' })
    }

    const { image } = req.files

    if (image.size > 5000000) {
      return res.status(422).json({ error: 'This image is too big. Should be less than 500kb' })
    }

    let fileName = image.name;
    let splittedImage = fileName.split('.')
    let newFileName = splittedImage[0] + uuid() + '.' + splittedImage[splittedImage.length - 1]

    image.mv(path.join(__dirname, '..', 'uploads', 'uploadsPostImg', newFileName), async (err) => {
      if (err) {
        return res.json({ error: err })
      } else {
        const newPost = await Post.create({ title, category, description, image: newFileName, creator: req.user.userId })

        if (!newPost) {
          return res.status(422).json({ error: 'Could not create user.' })
        }

        // Find user and increase count by one.
        const currentUser = await User.findById(req.user.userId)
        const userPostCount = currentUser.posts + 1;
        const userUpdated = await User.findByIdAndUpdate(currentUser, { posts: userPostCount }, { new: true }).select('-password').select('-email')
        res.status(201).json({ message: 'Post created successfully!', userUpdated })
      }



    })

  } catch (error) {
    res.status(500).json({ error: 'Could not create post', error })
  }


}


// ____________GET ALL POSTS
// GET: api/posts
// Unprotected area.
const getPosts = async (req, res, next) => {

  try {
    const allPosts = await Post.find().populate('creator', 'username avatar verified posts');

    if (!allPosts) {
      return res.status(404).json({ error: 'Could not find posts. Try later' })
    }

    res.status(200).json(allPosts)

  } catch (error) {
    return res.status(500).json({ error: 'Could not find posts', error })
  }


}


// ____________GET SINGLE POST
// GET: api/posts/:id
// Unprotected area.
const getSinglePost = async (req, res, next) => {
  //res.json('Get Single Post')
  try {
    const { id } = req.params

    const singlePost = await Post.findById(id).populate('creator', 'username avatar verified posts')
    if (!singlePost) {
      return res.status(404).json({ error: 'Could not find post.' })
    }

    res.status(200).json(singlePost)
  } catch (error) {
    return res.status(500).json({ error: 'Could not in post.', error })
  }

}


// ____________GET POSTS BY CATEGORY
// GET: api/posts/categories/:category
// Unprotected area.
const getPostsCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const catPosts = await Post.find({ category }).sort({ createdAt: 1 })
    if (!catPosts) {
      return res.status(404).json({ error: 'Could not find posts.', error })
    }

    res.status(200).json(catPosts)

  } catch (error) {
    return res.status(500).json({ error: 'Could not find posts from this category.' })
  }

}



// ____________GET USER/AUTHOR POSTs
// GET: api/posts/users/:id
// Unprotected area.
const getAuthorPosts = async (req, res) => {
  // Get all posts from a specific author.
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).populate('creator', 'username avatar verified posts');


    if (!posts) {
      return res.status(404).json({ error: 'Could not find posts.' })
    }

    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Could not find posts from this author.', error })
  }
}


// ____________EDIT POST
// PATH: api/posts/:id
// Protected area.
const editPost = async (req, res, next) => {

  try {
    let fileName;
    let newFileName
    let updatePost;
    const id = req.params.id
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(422).json({ error: 'All fields are required!' })
    }

    //get old post
    const oldPost = await Post.findById(id);

    if (req.user.userId == oldPost.creator) {



      if (!req.files) {
        updatePost = await Post.findByIdAndUpdate(id, { title, category, description }, { new: true })


      } else {

        // delete an old image from uploadsPostImg.
        fs.unlink(path.join(__dirname, '..', 'uploadsPostImg', oldPost.image), async (err) => {
          if (err) {
            return res.status(422).json({ error: 'Could not find image.' })
          }

        })

        // upload new image.
        const { image } = req.files;
        // Check the size:
        if (image.size > 5000000) {
          return res.status(422).json({ error: 'This image is too big. Should be less than 500kb' })
        }

        fileName = image.name;
        let splittedImage = fileName.split('.')
        newFileName = splittedImage[0] + uuid() + '.' + splittedImage[splittedImage.length - 1]

        // Move the image file to the uploadsPostImg
        image.mv(path.join(__dirname, '..', 'uploadsPostImg', newFileName), async (err) => {
          if (err) {
            return res.json({ error: err || 'Could not move image to the specified folder.' })
          }

        })

        updatePost = await Post.findByIdAndUpdate(id, { title, category, description, image: newFileName }, { new: true })
      }
    }

    if (!updatePost) {
      return res.status(500).json({ error: 'Could not update this post.' })
    }

    res.status(200).json({ message: 'Post updated successfully!', updatePost })
  } catch (error) {
    return res.status(500).json({ error: 'Could not edit the post.', error })
  }
}



// _____________DELETE POST
// DELETE: api/posts/:id
// Protected area.
const deletePost = async (req, res, next) => {

  try {
    const id = req.params.id

    if (!id) {
      return res.status(400).json({ error: 'Post Unavailable.' })
    }
    const post = await Post.findById(id)
    const fileName = post?.image;


    if (req.user.userId == post.creator) {
      // Delete image from uploads folder.
      fs.unlink(path.join(__dirname, '..', 'uploadsPostImg', fileName), async (err) => {
        if (err) {
          return res.status(400).json({ error: 'Could not delete image.', err })
        } else {

          await Post.findByIdAndDelete(id)
          // Find user and reduce the posts count by 1:
          const userData = await User.findById(req.user.userId)
          const userPostsCount = userData.posts - 1;
          await User.findByIdAndUpdate(req.user.userId, { posts: userPostsCount }, { new: true })

        }
      })


      res.status(200).json({
        message: `Post ${id} deleted successfully!
  ` })

    } else {
      return res.status(403).json({ error: 'You are not authorized to delete this post.' })
    }

  } catch (error) {
    return res.status(500).json({ error: 'Could not delete the post.', error })
  }

}


module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  getPostsCategory,
  getAuthorPosts,
  editPost,
  deletePost


}