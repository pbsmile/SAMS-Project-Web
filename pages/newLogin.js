import React from 'react'
import apolloClient from "../apollo/apolloClient"
import Navbar from '../components/Navbar/Navbar'
import NewLogin from '../components/NewLogin/NewLogin'
import Login from '../components/NewLogin/NewLogin'
// import Login from '../components/NewLogin/NewLogin'




const newLogin = () => {
    return (
        <div>
            <NewLogin/>
        </div>
    )
}

export default apolloClient(NewLogin);
