import React from 'react'
import { NavLink } from 'react-router-dom'

const Aside = () => {

  const usersIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0069d9" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
  </svg>)
  const createUserIcon = (<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users-plus" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0069d9" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M16 19h6" />
    <path d="M19 16v6" />
  </svg>)
  const productsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-basket" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0069d9" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z" />
      <path d="M17 10l-2 -6" />
      <path d="M7 10l2 -6" />
    </svg>
  )
  const createProductIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-basket-plus" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0069d9" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 10l-2 -6" />
      <path d="M7 10l2 -6" />
      <path d="M12 20h-4.756a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304l-.359 2.043" />
      <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>
  )
  return (
    <aside>
      <div className='lnk'>
        {usersIcon}
        <NavLink to='users'>Users</NavLink>
      </div>
      <div className='lnk'>
        {createUserIcon}
        <NavLink to='users/create'>New User</NavLink>
      </div>
      <div className='lnk'>
        {productsIcon}
        <NavLink to='products'>Products</NavLink>
      </div>
      <div className='lnk'>
        {createProductIcon}
        <NavLink to='products/create'>New Product</NavLink>
      </div>
    </aside>
  )
}

export default Aside