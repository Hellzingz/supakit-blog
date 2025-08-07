import React from 'react'
import Logo from '../assets/img/logo.png'

export function NavBar() {
  return (
    <>
        <nav className='h-[80px] flex items-center justify-between px-30 py-4 border-b border-[#DAD6D1] bg-[#F9F8F6]'>
            <div>
                <img src={Logo} alt="" />
            </div>
            <div className='hidden md:flex space-x-4'>
            <a href="/login" className="px-8 py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white">Log in</a>
            <a href="/login" className="px-8 py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white">Sign up</a>          
            </div>
        </nav>
    </>
  )
}
