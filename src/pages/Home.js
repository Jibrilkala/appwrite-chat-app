import React from 'react'
import { Link } from 'react-router-dom'
import chat from '../assets/images/chat.jpg'

const Home = () => {
  return (
    <div className='flex px-6'>
        <div className="mt-14">
            <div className="w-20 h-2 bg-orange-400 rounded mb-6"></div>    
            <div className="right-header">
                <h1 className='text-blue-700 font-bold text-2xl mb-10'> M-CHAT is a free and anonymous chatting app, where you can talk to interesting people while performing simple tasks.</h1>
                <p className='text-gray-500 mb-10'> M-CHAT is a special type of messaging app - it’s an ai powered chatting social media website that allows people to chat together in real time with our advanced artificial intelligence. In m-CHAT, you can make friends, have fun and share your interests with everyone on earth</p>
            </div>
            <div className="flex flex-col">
                <button className='border-2 border-orange-400 rounded-xl h-14 mb-4 text-blue-700 font-bold text-xl'><Link to='/signup'>Sign Up</Link></button>
                <button className='border-2 border-orange-400 rounded-xl h-14 mb-4 text-blue-700 font-bold text-xl'><Link to='/signin'>Sign In</Link></button>
            </div>
        </div>
        <div className="hidden md:block">
            <img src={chat} alt="chat" />
        </div>       
    </div>
  )
}

export default Home