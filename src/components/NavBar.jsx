import React from 'react'

import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <div className="flex flex-row gap-7 bg-[#0d0628] text-white p-4 rounded-lg shadow-md justify-center items-center"> 
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pastes">Pastes</NavLink>
    </div>
  )
}

export default NavBar