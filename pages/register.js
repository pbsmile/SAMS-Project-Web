import React from 'react'
import apolloClient from "../apollo/apolloclient"
import Navbar from '../components/Navbar/Navbar'
import Register from '../components/Register/Register'

const register = () => {
    return (
        <div>
            <Navbar/>
            TT
            <Register/>
        </div>
    )
}

export default apolloClient(register);
