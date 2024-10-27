import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
}

const NavButton: React.FC<Props> = ({ to, children }) => {
  return (
    <NavLink
      className="nav-b"
      to={to}
      style={({ isActive }) => ({
        color: isActive ? "#FFFFFF" : "#373745",
      })}
    >
      {children}
    </NavLink>
  );
};

export default NavButton;