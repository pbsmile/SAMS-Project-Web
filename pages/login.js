import React from 'react'
import apolloClient from "../apollo/apolloClient"
import Navbar from '../components/Navbar/Navbar'
import Login from '../components/Login/Login'


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
