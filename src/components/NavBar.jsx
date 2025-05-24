import React from 'react'

import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <div className="flex flex-row sm:flex-row gap-4 sm:gap-7 bg-[#0d0628] text-white p-4 rounded-lg shadow-md justify-center items-center w-full max-w-4xl mx-auto mt-2"> 
      <NavLink to="/" className={({ isActive }) => isActive ? 'underline' : ''}>Home</NavLink>
      <NavLink to="/pastes" className={({ isActive }) => isActive ? 'underline' : ''}>Pastes</NavLink>
    </div>
  )
}

export default NavBar