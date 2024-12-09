import React, { useEffect, useState } from 'react'
import { NavBar } from '../nav-bar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout, selectCurrent, selectIsAuthenticated } from '../../features/player/playerSlice'
import { useLazyGetCurrentPlayerQuery } from '../../app/services/playerApi'
import { useDispatch } from 'react-redux'

export const Layout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const current = useSelector(selectCurrent);
  const [triggerGetCurrentPlayer] = useLazyGetCurrentPlayerQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
      navigate("/auth");
    } else if (!current) {
      triggerGetCurrentPlayer();
    }
  }, [isAuthenticated, current, navigate, triggerGetCurrentPlayer]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}