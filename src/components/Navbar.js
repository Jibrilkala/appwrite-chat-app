import React, { useEffect, useState, useContext } from 'react'
import {BsFillChatDotsFill} from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { account } from '../appwrite/appwriteConsig'
import AuthContext from '../contex/auth-contex'


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false) // Toggle menu
    const [userData, setUserData] = useState() // User data

    const context = useContext(AuthContext) // Context

    useEffect(() => {
        const getUser = account.get()

        getUser.then(res => {
            setUserData(res)
        }, err => {
            
        })

    }, [userData])

  return (
    <div className='text-blue-800'>
        <nav className='hidden md:flex justify-between items-center p-5 font-bold'>
            <div className="flex items-center gap-5">
                <NavLink className='flex items-center gap-5' to='/'>
                    <h2 className='text-xl'>M-Chat</h2>
                    <BsFillChatDotsFill className="h-8 w-8" />
                </NavLink>
            </div>
            <div className="menu-items flex gap-20 mr-10">
                <a href="/">Home</a>
                {!context.isAuthenticated && <Link to='/signin'>Login</Link>}
                {!context.isAuthenticated && <Link to='/signup'>Signup</Link>}
                {context.isAuthenticated && <button onClick={context.onLogOut} className=''>Log Out</button>}
            </div>
        </nav>
        {/* Mobile-menu */}
        <div className="flex md:hidden p-6 justify-between font-bold">
            <div className="flex items-center gap-5">
                <NavLink className='flex items-center gap-5' to='/'>
                    <h2 className='text-xl'>M-Chat</h2>
                    <BsFillChatDotsFill className="h-8 w-8" />
                </NavLink>
            </div>
            <div className="icons">
                {!isOpen && <AiOutlineMenu className="h-8 w-8 cursor-pointer" onClick={() => setIsOpen(true)} />}
                {isOpen && <AiOutlineClose className="h-8 w-8 cursor-pointer" onClick={() => setIsOpen(false)} />}
            </div>
        </div>
        {isOpen && <div className='relative text-blue-800 font-bold'>
            <div className="absolute flex flex-col pl-2 pt-2 justify-between md:hidden bg-gray-100 w-[150px] h-[120px] right-5 top-[-15px] rounded-md">
                <a href="/">Home</a>
                {!context.isAuthenticated && <Link to='/signin'>Login</Link>}
                {!context.isAuthenticated && <Link to='/signup'>Signup</Link>}
                {context.isAuthenticated && <button onClick={context.onLogOut} className='text-start'>Log Out</button>}
            </div>
        </div>}
    </div>
  )
}

export default Navbar