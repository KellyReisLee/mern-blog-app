const express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
require('dotenv').config()
const { notFound, errorMiddleware } = require('./middleware/errorMiddleware')
const upload = require('express-fileupload')
var cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const postsRoutes = require('./routes/postsRoutes')

const app = express()
// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(upload())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cookieParser());

// Routes.
// Esse é o caminho que será solicitad0.
app.use('/api/users', userRoutes)
app.use('/api/posts', postsRoutes)

// leading with errors:
app.use(notFound)
app.use(errorMiddleware)

// Connection database.
connect(process.env.MONGO_URL).then(() => {
  console.log('Database connected!!!');
}).catch((error) => {
  console.log(error);
})

app.listen(process.env.PORT, () => console.log(`Listening post ${process.env.PORT}.`))

