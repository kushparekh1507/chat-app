import React from 'react'
import logo from "../assets/logo.png"

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className='flex items-center justify-center py-4 shadow-md bg-whitex'>
        <img src={logo} width={180} height={60} alt="" />
      </header>
      {
        children
      }
    </>
  )
}

export default AuthLayout
