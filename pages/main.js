import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar/Navbar'
import MainPageCard from '../components/Card/MainPageCard'
import MainPageSlidebar from '../components/Slidebar/MainPageSlidebar'
import MainToggle from '../components/Toggle/MainToggle'

const main = () => {
    return (
        <div>
            <Navbar/>
            Main Page
            for web
            SAMS
            {/* <MainPageSlidebar/> */}
            <MainToggle/>
        </div>
    )
}

export default main
