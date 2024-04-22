const jwt = require('jsonwebtoken')


const authMiddleware = async (req, res, next) => {

  const authorization = req.headers.authorization || req.headers.Authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Token is not valid!' })
      }

      req.user = user
      next()

    })
  } else {
    return res.status(401).json('You are not authenticated.')
  }


}

module.exports = authMiddleware;