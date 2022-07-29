import React, { useEffect, useState } from 'react'
import { account } from '../appwrite/appwriteConsig'

const Message = ({message, name}) => {

    const [userData, setUserData] = useState() 

    useEffect(() => { // Get user data
        const getUser = account.get()

        getUser.then(res => { 
            setUserData(res) 
        }, err => {
            console.log(err)
        })

    }, []) 

  return (


    <div>
        {userData && <div
                        className={userData.name === name ? "text-white rounded-xl px-4 gap-2 mt-2 mb-2 font-bold bg-blue-600 ml-[70%] mr-4 py-4" : "flex flex-col text-white rounded-xl px-4 gap-2 mt-2 mb-2 font-bold bg-gray-400 mr-[70%] py-4"}>
                            <p>{userData.name === name ? '' : `${name}:`}</p>
                            <p className='break-words'>{message}</p>
                    </div>}
    </div>
  )
}

export default Message