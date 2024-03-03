import React from 'react'
import { NavLink } from '.';

const MenuOverlay = ({ links }: { links: any[] }) => {
    return (
        <ul className="flex flex-col py-4 items-center">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink href={link.path} title={link.title} />
            </li>
          ))}
        </ul>
      );
}

export default MenuOverlay