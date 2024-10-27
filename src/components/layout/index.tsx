import React, { useEffect } from 'react'
import { Container } from '../container'
import { NavBar } from '../nav-bar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Layout = () => {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}