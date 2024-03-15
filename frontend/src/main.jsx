import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
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
import Logout from './pages/Logout.jsx'
import Authors from './pages/Authors.jsx'
import DeletePost from './pages/DeletePost.jsx'
import VerificationPage from './pages/VerificationPage.jsx'
import { UserContextProvider } from '../context/userContext'



// Define a URL base para todas as requisições dentro do axios.
axios.defaults.baseURL = 'http://localhost:4000';
//Esta linha configura o Axios para enviar cookies junto com as requisições feitas para o servidor.
axios.defaults.withCredentials = true


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "api/users/verify", element: <VerificationPage /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "api/users/register", element: <RegisterPage /> },
      { path: "api/users/login", element: <LoginPage /> },
      { path: "api/users/verify/:id/:token", element: <VerificationPage /> },
      { path: "api/users/profile/:id", element: <UserProfile /> },
      { path: "create", element: <CreatePosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "logout", element: <Home /> },
      { path: "authors", element: <Authors /> },


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
