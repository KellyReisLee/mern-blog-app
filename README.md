<H1 align ="center" > Code-Blog - MERN Project Complete </h1>
<h5  align ="center"> 
Fullstack open source blogging application made with MongoDB, Express, React & Nodejs (MERN). </h5>
<br/>

<h3>Description: </h3>
<h5  align ="center"> 
Blog created for developers that want to share information about Web development. </h5>

- [Configuration and Setup](#configuration-and-setup)
- [Key Features](#key-features)
- [Technologies used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [📸 Screenshots](#screenshots)
- [Author](#author)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd Frontend
$ npm install (to install frontend-side dependencies)
$ npm run start (to start the frontend) or npm run dev for vite projects.
```

In the second terminal

- cd Backend and Set environment variables in config.env under ./config
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---

NODE_ENV = development
PORT =5000
URI =http://localhost:4000
MONGO_URI =
JWT_SECRET_KEY =
JWT_EXPIRE = 20m
RESET_PASSWORD_EXPIRE = 600000

# Nodemailer

SMTP_HOST =smtp.gmail.com
SMTP_PORT =587
EMAIL_USERNAME = example@gmail.com
EMAIL_PASS = your_password
```

```
# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```

## Key Features

- User registration and login
- Authentication using JWT Tokens
- Story searching and pagination
- CRUD operations (Story create, read, update and delete)
- Upload user ımages and story ımages to the server
- Creating posts, editing and deleting for authors that have a account
- Skeleton loading effect
- Responsive Design

<br/>

## Technologies used

This project was created using the following technologies.

#### Frontend

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Css](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface
- [CK-Editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Rich Text Editor
- [uuid](https://www.npmjs.com/package/uuid) - For random id generator
- [React icons](https://react-icons.github.io/react-icons/) -
  Small library that helps you add icons to your react apps.

#### Backend

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [Nodemailer](https://nodemailer.com/about/) - Send e-mails from Node.js
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [multer](https://www.npmjs.com/package/multer) - Node.js middleware for uploading files
- [slugify](https://www.npmjs.com/package/slugify) - For encoding titles into a URL-friendly format
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware

#### Database

- [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections.

## Screenshots

<h3>First Blog Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JS1koFa.png" alt="JS1koFa.png" border="0" /></a>
<a href="https://freeimage.host/"><img src="https://iili.io/JS1mPse.png" alt="JS1mPse.png" border="0" /></a>

---

<h3>Authors Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JS1yoyQ.png" alt="JS1yoyQ.png" border="0" /></a>

---

<h3>Author's Post Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JS1yPcb.png" alt="JS1yPcb.png" border="0" /></a>

---

<h3>Category's Post Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSE9Pst.png" alt="JSE9Pst.png" border="0" /></a>

---

<h3>Sign in Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEJAnS.png" alt="JSEJAnS.png" border="0" /></a>

---

<h3>Register Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEnhIn.png" alt="JSEnhIn.png" border="0" /></a>

---

<h3>Change-Password Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEoqvI.png" alt="JSEoqvI.png" border="0" /></a>

---

<h3>Sent Image confirmation Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEotMG.png" alt="JSEotMG.png" border="0" /></a>

---

<h3>User Profile Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSExkRS.png" alt="JSExkRS.png" border="0" /></a>

---

<h3>Post Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEz2Jp.png" alt="JSEz2Jp.png" border="0" /></a>

---

<h3>Edit Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEzRm7.png" alt="JSEzRm7.png" border="0" /></a>

---

<h3>Create Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEIEnn.png" alt="JSEIEnn.png" border="0" /></a>

---

<h3>Delete Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEz1rx.png" alt="JSEz1rx.png" border="0" /></a>

---

<h3>Author's Posts Page</h3>
<a href="https://freeimage.host/"><img src="https://iili.io/JSEzjhF.png" alt="JSEzjhF.png" border="0" /></a>

---

## Author

- Portfolio: [kellywebdeveloper](https://kellydeveloper.vercel.app)
- Github: [KellyReisLee](https://github.com/KellyReisLee)
- Linkedin: [kellyreis-webdev](https://www.linkedin.com/in/kellyreis-webdev/)
- Email: [kellyreislee.com](mailto:kellyreislee@gmail.com)
