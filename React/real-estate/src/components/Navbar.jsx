import React, { useEffect } from 'react'
import {assets} from '../assets/assets'

const Navbar = () => {
    const [showMenu, setShowMenu] = React.useState(false);
    useEffect(() => {
        if(showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [showMenu])
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
        <div className='container mx-auto flex justify-between items-center py4 px-6 md:px-20 lg:px-32 background-transparent'>
            <img src={assets.logo} alt="" />
            <ul className='hidden md:flex gap-7 text-white'>
                <a href="#Header" className='cursor-pointer hover:text-grey-400'>Home</a>
                <a href="#Header" className='cursor-pointer hover:text-grey-400'>About</a>
                <a href="#Header" className='cursor-pointer hover:text-grey-400'>Projects</a>
                <a href="#Header" className='cursor-pointer hover:text-grey-400'>Testimonials</a>
            </ul>
            <button type="button" className='hidden md:block bg-white px-8 py-2 rounded-full'>Sign up</button>
            <img onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="" className='w-6 h-6 md:hidden block cursor-pointer' />
        </div>
        {/* ------Mobile Menu------ */}
        <div className={`md:hidden right-0 top-0 bottom-0 transition-all overflow-hidden bg-white w-0 ${showMenu ? 'fixed w-full' : 'hidden'} h-screen z-20 transition-all duration-300`}>
            <div className='flex justify-end p-6'>
                <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer' alt="" />
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 mx-5 text-lg font-medium transition-all'>
                <a onClick={() => setShowMenu(false)} href="#Header" className='px-4 py-2 rounded-full inline-block'>Home</a>
                <a onClick={() => setShowMenu(false)} href="#About" className='px-4 py-2 rounded-full inline-block'>About</a>
                <a onClick={() => setShowMenu(false)} href="#Projects" className='px-4 py-2 rounded-full inline-block'>Projects</a>
                <a onClick={() => setShowMenu(false)} href="#Testimonials" className='px-4 py-2 rounded-full inline-block'>Testimonials</a>
            </ul>
        </div>
    </div>
  )
}

export default Navbar