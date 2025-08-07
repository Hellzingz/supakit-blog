import React from 'react'
import { Github,Facebook,Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className='container px-13 py-8 lg:py-16 mx-auto'>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <p>Git in touch</p>
                <Github color='blue'/>
                <Facebook color='blue'/>
                <Instagram color='red'/>             
            </div>
            <div>
                <a href="">Home page</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer