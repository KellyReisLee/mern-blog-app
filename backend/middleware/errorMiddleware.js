// Unsupported 404 routes:
const notFound = (req, res, next) => {
  const err = new Error(`Not found - ${req.originalUrl}`)
  res.status(404);
  next(err)
}



// Middleware para tratamento de erros
const errorMiddleware = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err)
  }
  res.status(err.code || 500).json({ error: err.message || 'An unknow error occured' });
};



module.exports = {
  notFound,
  errorMiddleware
}