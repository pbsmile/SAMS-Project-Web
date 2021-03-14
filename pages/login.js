import React from 'react'
import apolloClient from "../apollo/apolloclient"
import Navbar from '../components/Navbar/Navbar'
import Login from '../components/Login/Login'
// import Login from '../components/NewLogin/NewLogin'




const login = () => {
    return (
        <div>
            <Navbar/>
            jj
            <Login/>
        </div>
    )
}

export default apolloClient(login);
