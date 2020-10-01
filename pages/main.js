import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import MainPageCard from '../components/Card/MainPageCard'
import MainPageSlidebar from '../components/Slidebar/MainPageSlidebar'

const main = () => {
    return (
        <div>
            <Navbar/>
            Main Page
            for web
            SAMS
            <MainPageSlidebar/>
            <MainPageCard/>
        </div>
    )
}

export default main
