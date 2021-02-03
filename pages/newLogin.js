import React from 'react'
import apolloClient from "../apollo/apolloClient"
import NewLogin from '../components/NewLogin/NewLogin'


const newLogin = () => {
    return (
        <div>
            <NewLogin/>
        </div>
    )
}

export default apolloClient(NewLogin);
