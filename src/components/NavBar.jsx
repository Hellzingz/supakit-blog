import React from 'react'
import Logo from '../assets/img/logo.png'
import { useToggle } from '../hooks/useToggle'
import { GiHamburgerMenu } from "react-icons/gi";

export function NavBar() {
  const {toggle,changeToggle} = useToggle(false)

  return (
    <>
        <nav className='mx-auto h-[80px] flex items-center justify-between px-20 py-10 border-b border-[#DAD6D1] bg-[#F9F8F6]'>
            <div>
                <img src={Logo} alt="" />
            </div>
            <GiHamburgerMenu className='block sm:hidden' size={20} onClick={changeToggle}/>
            
            <div className='hidden sm:flex space-x-4'>
            <a href="/login" className="px-8 py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white">Log in</a>
            <a href="/Signup" className="px-8 py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white">Sign up</a>                     
            </div>
        </nav>
        {toggle &&  
        <div className='flex flex-col items-center w-full gap-5 shadow-xl py-10'>
        <a href="/login" className=" w-full text-center py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white">Log in</a>
        <a href="/Signup" className=" w-full text-center py-2 rounded-full border border-[##75716B] hover:bg-black hover:text-white">Sign up</a>    
        </div>}
    </>
  )
}
