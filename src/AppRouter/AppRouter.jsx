import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import SignUp from '../pages/signup'
import Todo from '../pages/todoPage'
import AuthGaurd from '../AuthGaurd/AuthGaurd'
import LogoutProtection from '../LogoutProtection/LogoutProtection'
import NoPage from '../pages/NoPage/NoPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthGaurd />}>
                        <Route path='/todo' element={<Todo />} />
                    </Route>
                    <Route element={<LogoutProtection />}>
                        <Route path='/' element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                    </Route>
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </BrowserRouter>
            
            <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Bounce
                />
        </>
    )
}

export default AppRouter