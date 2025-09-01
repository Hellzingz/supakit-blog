import React from 'react'
import { Github,Facebook,Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='container fixed bottom-0 px-13 py-8 lg:py-16 mx-auto'>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <p>Git in touch</p>
                <Github color='blue'/>
                <Facebook color='blue'/>
                <Instagram color='red'/>             
            </div>
            <div>
                <Link to="/">Home page</Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer