import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Testing from './pages/Testing.jsx'
import Register from './pages/Register.jsx'
import Recognition from './pages/Recognition.jsx'
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
    }
])

// 配置Toastr选项
toastr.options = {
    closeButton: true, // 显示关闭按钮
    debug: false, // 是否开启debug模式
    newestOnTop: false, // 新的通知是否排在顶部
    progressBar: true, // 是否显示进度条
    positionClass: 'toast-top-right', // 通知出现的位置
    preventDuplicates: false, // 是否阻止显示重复的通知
    onclick: null, // 点击通知时的回调函数
    showDuration: '500', // 显示动画的持续时间（毫秒）
    hideDuration: '1000', // 隐藏动画的持续时间（毫秒）
    timeOut: '5000', // 通知自动关闭的延迟时间（毫秒）
    extendedTimeOut: '1000', // 用户鼠标悬停时增加的延迟关闭时间（毫秒）
    showEasing: 'swing', // 显示动画的缓动效果
    hideEasing: 'linear', // 隐藏动画的缓动效果
    showMethod: 'fadeIn', // 显示动画的方法
    hideMethod: 'fadeOut' // 隐藏动画的方法
};

//Custom Setting
// toastr.success('特别的成功消息', '特别成功', {
//     timeOut: 10000 // 仅对这个通知，设置10秒后自动关闭
// });



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
