import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/_normalBtn.scss';
export default function NormalBtn({ link, text }) {
  return (
    <NavLink to={link}>
      <button className="  py-1    border normalbtn text-capitalize">
        {text}
      </button>
    </NavLink>
  );
}
