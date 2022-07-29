import React, { useRef} from 'react'
import { account } from '../appwrite/appwriteConsig'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const nameInputRef = useRef('') 
    const emailInputRef = useRef('')
    const passwordInputRef = useRef('')

    const navigate = useNavigate() // Hook for navigate

    const handleSubmit = async (e) => { // Sign up user
        e.preventDefault()
        
        const nameInput = nameInputRef.current.value
        const emailInput = emailInputRef.current.value
        const passwordInput = passwordInputRef.current.value

        await account.create('unique()', emailInput, passwordInput, nameInput).then(res => { // Create user
            navigate('/signin')
        }, err => {
            console.log(err)
        });
    } 

  return ( 
    <div className='flex flex-col items-center mt-20 px-20'>
        <h1 className='font-bold text-3xl text-blue-700 mb-4 w-[250px]'>Sign up for free</h1>
        <h2 className='text-gray-600'>Chat with your friends and family in a way you can't on other platforms</h2>
        <form className='w-full md:w-[60%] mt-10' onSubmit={handleSubmit}>
            <div className="name flex flex-col mb-5">
                <label htmlFor="name">Name:</label>
                <input ref={nameInputRef} className='border border-gray400 h-10 rounded outline-none pl-4' id='name' type="text" placeholder='Your full name' required />
            </div>
            <div className="email flex flex-col mb-5">
                <label htmlFor="email">Email:</label>
                <input ref={emailInputRef} className='border border-gray400 h-10 rounded outline-none pl-4' id='email' type="email" placeholder='you@example.com' required />
            </div>
            <div className="password flex flex-col">
                <label htmlFor="password">Create a password:</label>
                <input ref={passwordInputRef} className='border border-gray400 h-10 rounded outline-none pl-4' id='password' type="password" placeholder='Enter a strong password' required />
            </div>
            <div className="text-center mt-10">
                <button className='border-2 border-orange-400 py-1 px-10 md:px-20 rounded-md text-xl font-bold text-blue-700'>Sign Up</button>
            </div>
        </form>
    </div>
  )
}

export default Signup