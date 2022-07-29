import { createContext, useEffect, useState } from "react";
import { account } from '../appwrite/appwriteConsig';

const AuthContext = createContext({
    isAuthenticated: false,
    onLogOut: () => {},
    onLogin: () => {}
});



export const AuthContextProvider = (props) => { 

    const [userData, setUserData] = useState() 
    
    useEffect(() => {
        const getUser = account.get()

        getUser.then(res => {
            setUserData(res)
        }, err => {
            console.log(err)
        })

    }, [])

    const logOutHandler = async () => { // Log out user
        try {
            await account.deleteSession("current")
            setUserData(false)
            window.location.href = "/";
        } catch (err) {
            console.log(err)
        }
    }

    const loginHandler = async () => {
        setUserData(true)
    }
    



    return <AuthContext.Provider value={{
            isAuthenticated: userData,
            onLogOut: logOutHandler,
            onLogin: loginHandler
        }}>
        {props.children}
    </AuthContext.Provider>;
}

export default AuthContext;