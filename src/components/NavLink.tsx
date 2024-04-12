import React from 'react'
import { NavLinkProps } from '../../types'
import Link from 'next/link'
import { handleScrollSection } from '@/utils'


const NavLink = ({href, title}: NavLinkProps) => {
  return (
    <button onClick={() => handleScrollSection(href)} 
        className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-lg rounded md:p-0 hover:text-white'>
        {title}
    </button>
  )
}

export default NavLink