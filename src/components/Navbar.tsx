'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MenuOverlay, NavLink } from '.';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
    {
      title: "About",
      path: "#about",
    },
    {
      title: "Projects",
      path: "#projects",
    },
    {
      title: "Contact",
      path: "#contact",
    },
  ];

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { 
                setNavbarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-opacity-100">
        <div className='flex fle-wrap items-center justify-between mx-auto px-4 py-2 container lg:py-4'>
            <Link href={'/'} className='font-semibold'>
                Marouane
            </Link>
            <div className="mobile-menu block md:hidden">
                    {!navbarOpen ? (
                        <button
                        onClick={() => setNavbarOpen(true)}
                        className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
                        >
                        <Bars3Icon className="h-5 w-5" />
                        </button>
                    ) : (
                        <button
                        onClick={() => setNavbarOpen(false)}
                        className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
                        >
                        <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}
            </div>
            <div className='menu hidden md:block md:w-auto' id='navbar'>
                <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
            </div>
        </div>
        <div className={`md:hidden bg-black opacity-100`}>
        {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
        </div>
    </nav>
  )
}

export default Navbar