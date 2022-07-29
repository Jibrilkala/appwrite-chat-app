import React, {useEffect, useRef, useState, useContext} from 'react'
import { account } from '../appwrite/appwriteConsig'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contex/auth-contex'


const Signup = () => {
    const emailInputRef = useRef('')
    const passwordInputRef = useRef('')
    const [userData, setUserData] = useState()

    const context = useContext(AuthContext)
 
    useEffect(() => { // Get user data
        const getUser = account.get()

        getUser.then(res => {
            setUserData(res)
        }, err => {
            
        })

    }, [userData]) 

    const navigate = useNavigate()

    const handleSubmit = async (e) => { // Sign up user
        e.preventDefault()
        
        const emailInput = emailInputRef.current.value
        const passwordInput = passwordInputRef.current.value

        try { 
            await account.createEmailSession(emailInput, passwordInput) // Create email session
            navigate('/chat')
            context.onLogin()
        } catch (error) {
            console.log(error)
        } 
    }

  return (
    <div className='flex flex-col items-center mt-20 px-20'>
        <h1 className='font-bold text-3xl text-blue-700 mb-4 w-[250px]'>Login to your M-CHAT account</h1>
        <h2 className='text-gray-600'>Chat with your friends and family in a way you can't on other platforms</h2>
        <p>Use your registered credentials 👇</p>
        <form className='w-full md:w-[60%] mt-10' onSubmit={handleSubmit}>
            <div className="email flex flex-col mb-5">
                <label htmlFor="email">Email:</label>
                <input ref={emailInputRef} className='border border-gray400 h-10 rounded outline-none pl-4' id='email' type="email" placeholder='you@example.com' required />
            </div>
            <div className="password flex flex-col">
                <label htmlFor="password">Password:</label>
                <input ref={passwordInputRef} className='border border-gray400 h-10 rounded outline-none pl-4' id='password' type="password" placeholder='Enter your password' required />
            </div>
            <div className="text-center mt-10">
                <button className='border-2 border-orange-400 py-1 px-10 md:px-20 rounded-md text-xl font-bold text-blue-700'>Log in</button>
            </div>
        </form>
    </div>
  )
}

export default Signup