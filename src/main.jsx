import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Testing from './pages/Testing.jsx'
import Register from './pages/Register.jsx'
import Recognition from './pages/Recognition.jsx'
import WebcamPage from './pages/WebcamPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import './index.css'
import './App.css'
import toastr from 'toastr';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path:'/home',
        element: <Home />,
    },
    {
        path:'/testing',
        element: <Testing />,
    },
    {
        path:'/about',
        element: <About />,
    },
    {
        path:'/register',
        element: <Register />,
    },
    {
        path:'/recognition',
        element: <Recognition />,
    },
    {
        path:'/webcam',
        element: <WebcamPage />,
    }
])

// POP UP Message
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right', // notification position
    preventDuplicates: false, // prevent duplicates notification
    onclick: null, // Callback function when notification is clicked
    showDuration: '500',
    hideDuration: '1000', //hide animation duration
    timeOut: '5000', // Delay for notification to automatically close
    extendedTimeOut: '1000', // Added delay to close time on user mouseover (milliseconds)
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
};

//Custom Setting
// toastr.success('custom success', 'Success', {
//     timeOut: 10000
// });



ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
)
