import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ActivityInfo from '../../components/Info/ActivityInfo'
import AttendanceCheck from '../../components/AttendanceCheck/AttendanceCheck'



const attendanceCheck = () => {
    return (
        <div>
            <Navbar/>
            Activities Page
            for web
            SAMS
            {/* <ActivityInfo/> */}
            <AttendanceCheck/>
        </div>
    )
}

export default attendanceCheck
