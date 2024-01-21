import React from 'react'
import Todo from '../pages/todoPage'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AuthGaurd = () => {
    return (
        <>
            {localStorage.getItem("uid") ? <Outlet /> : <Navigate to={"/"} />}
        </>
    )
}

export default AuthGaurd