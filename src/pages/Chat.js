import React, {useState, useEffect, useRef} from 'react'
import { account } from '../appwrite/appwriteConsig'
import { databases } from '../appwrite/appwriteConsig'
import Message from '../components/Message'


const Chat = () => {

    const [messages, setMessages] = useState([])

    const [userData, setUserData] = useState()

    const messageInputRef = useRef('')

    useEffect(() => { // Get user data
        const getUser = account.get()

        getUser.then(res => {
            setUserData(res)
        }, err => {
            console.log(err)
        })

    }, []) 

    useEffect(() => { // Get messages
        databases.listDocuments('Collection ID').then(res => { // Collection ID is the ID of the collection you want to get the documents from
            setMessages(res.documents)
        }, err => {
            console.log(err)
        })
    }, [])

    const handleSubmit = (e) => { // Send message
        e.preventDefault()

        const messageInput = messageInputRef.current.value

        databases.createDocument("Collection ID", 'unique()', { // Collection ID is the ID of the collection you want to create the document in
            message: messageInput,
            name: userData.name
        }).then(res => {
            setMessages([...messages, {message: messageInput, name: userData.name}])
        }, err => {
            console.log(err)
        })

        messageInputRef.current.value = '' // Clear input field, NOT A GOOD PRACTICE to do this in Prductive code
        

    }
  return (
    <div className='mt-10'>
        {userData && (
            <>
                <div className="welcome text-center">
                    <h1 className='text-2xl font-bold'>Hello <span className='text-blue-700'>{userData.name},</span></h1>
                    <p>You can chat with strangers and make some friends.</p>
                    <h2>You should behave in this chat</h2>
                </div>
                <div className="relative mx-4 mt-10 bg-gray-200 h-full rounded-md md:mx-40 flex flex-col justify-between mb-40 pb-2">
                    <div className="messages ml-4 mt-4">
                        <h2 className='font-bold text-blue-700 text-xl'>RectJs Room</h2>
                        {messages.map((message, index) => {
                            return <div key={index} className="each-message">
                                <Message message={message.message} name={message.name}/>
                            </div>
                        })}
                    </div>

                    <form onSubmit={handleSubmit} className='flex px-2 w-[70%] mx-auto rounded-md h-[50px] items-end gap-2'>
                        <div className="message">
                            <input ref={messageInputRef} className='outline-none bg-transparent border-2 border-orange-400 h-8 rounded px-2' type="text" placeholder='Message 🤩' />
                        </div>
                        <div className="">
                            <button className='bg-orange-400 w-20 text-center rounded-md h-8'>Send</button>
                        </div>
                    </form>
                </div>
            </>
        )}
    </div>
  )
}

export default Chat