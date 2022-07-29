import React, {useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import AuthContext from './contex/auth-contex'

const App = () => {

    const context = useContext(AuthContext)


  return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={!context.isAuthenticated ? <Home /> : <Chat />} />
            <Route path="/signup" element={!context.isAuthenticated ? <Signup /> : <Chat />} />
            <Route path={"/signin"} element={!context.isAuthenticated ? <Signin /> : <Chat />} />
            <Route path="/chat" element={context.isAuthenticated ? <Chat /> : <Signin />} />
            <Route path="*" element={<Home />} />
        </Routes>
    </div>
  )
}

export default App