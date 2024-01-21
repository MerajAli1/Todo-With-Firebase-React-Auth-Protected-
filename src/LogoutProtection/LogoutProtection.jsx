import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const LogoutProtection = () => {
  return (
    <>
      {!localStorage.getItem("uid") ? <Outlet /> : <Navigate to={"/todo"} />}
    </>
  )
}

export default LogoutProtection