import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home.jsx'
import PostDetail from './pages/PostDetail.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import UserProfile from './pages/UserProfile.jsx'
import CreatePosts from './pages/CreatePosts.jsx'
import EditPost from './pages/EditPost.jsx'
import CategoryPosts from './pages/CategoryPosts.jsx'
import AuthorPosts from './pages/AuthorPosts.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Authors from './pages/Authors.jsx'
import DeletePost from './pages/DeletePost.jsx'
import VerificationPage from './pages/VerificationPage.jsx'
import { UserContextProvider } from '../context/userContext'
import SendEmail from '../src/pages/SendEmail.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Header from './components/Header.jsx'



// Define a URL base para todas as requisições dentro do axios.
axios.defaults.baseURL = 'http://localhost:4000/';
//Esta linha configura o Axios para enviar cookies junto com as requisições feitas para o servidor.
axios.defaults.withCredentials = true


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "api/users/verify", element: <VerificationPage /> },
      { path: "api/users/register", element: <RegisterPage /> },
      { path: "api/users/login", element: <LoginPage /> },
      { path: "api/users/logout", element: <Home /> },
      { path: "api/users/verify/:id/:token", element: <VerificationPage /> },
      { path: "api/users/profile/:id", element: <UserProfile /> },
      { path: "api/posts/user/:id", element: <AuthorPosts /> },
      { path: "api/posts/:id", element: <PostDetail /> },
      { path: "create", element: <CreatePosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/edit/:id", element: <EditPost /> },
      { path: "posts/delete/:id", element: <DeletePost /> },
      { path: "posts/authors", element: <Authors /> },
      { path: "api/users/send-email", element: <SendEmail /> },
      { path: "api/users/change-password/:id/:token", element: <ChangePassword /> },

    ]

  }
]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
