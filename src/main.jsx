import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './pages/App.jsx'
import Home from './pages/Home'
import About from './pages/About'
import Testing from './pages/Testing.jsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
