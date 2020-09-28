import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import ProfileToggle from '../components/Toggle/ProfileToggle'
import ProfileCard from '../components/Card/ProfileCard'

const profile = () => {
    return (
        <div>
            <Navbar/>
            <ProfileCard/>
            <ProfileToggle/>
        </div>
    )
}

export default profile
