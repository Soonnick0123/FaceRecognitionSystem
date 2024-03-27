import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Testing from './pages/Testing.jsx'
import Register from './pages/Register.jsx'
import Recognition from './pages/Recognition.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './App.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path:'/Home',
        element: <Home />,
    },
    {
        path:'/Testing',
        element: <Testing />,
    },
    {
        path:'/About',
        element: <About />,
    },
    {
        path:'/Register',
        element: <Register />,
    },
    {
        path:'/Recognition',
        element: <Recognition />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
