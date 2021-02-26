import React, { useEffect, useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Circle from "../../Image/circle.png";
import Chest from "../../Image/chest.jpg";
import Filter from "../Filter/ActivityFilter";
import Join from "../../Image/add1.png";
import Unjoin from "../../Image/add2.png";
import Fav from "../../Image/heart1.png";
import Unfav from "../../Image/heart2.png";
import Day from "../../Image/info_date.png";
import Time from "../../Image/clock.png";
import Location from "../../Image/info_flag.png";
import Members from "../../Image/info_user.png";
import Closed from "../../Image/info_closed.png";
import { AuthContext } from "../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";

import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";

import Moment from "react-moment";
import "moment-timezone";

import CreateAct from "../../Image/create.png"
import ImageLogo from "../../Image/img.png"

import Router from "next/router";


const EDITPOST = gql`
mutation EDITPOST(
    $postId: String!,
    $photo: String, 
    $name: String, 
    $dateStart: Date, 
    $dateEnd: Date, 
    $timeStart: String, 
    $timeEnd: String, 
    $place: String, 
    $participantsNumber: Number, 
    $dateCloseApply: Date, 
    $major: String, 
    $description: String
    )
{
    editPost(input:{
        postId: $postId,
        photo: $photo, 
        name: $name, 
        dateStart: $dateStart, 
        dateEnd: $dateEnd , 
        timeStart: $timeStart ,
        timeEnd: $timeEnd, 
        place: $place, 
        participantsNumber: $participantsNumber, 
        dateCloseApply: $dateCloseApply, 
        major: $major, 
        description: $description })
    {
        name
    }
}
`;



const QUERY_ACTIVITY = gql`
  query QUERY_ACTIVITY($postId: String!) {
    getOnePost(input: { postId: $postId }) {
      name
      _id
      status
      dateStart
      dateEnd
      timeStart
      timeEnd
      place
      participantsNumber
      dateCloseApply
      description
      canJoin
      canFav
      canReview
      avgRate
      major
    }
  }
`;

const EditPost = () => {
    const route = useRouter();
    console.log(route);
    const postId = route.query.activityId;
    

    const dateFormat = require("dateformat");
    const [userInfo, setUserInfo] = useState({
        photo: "",
        name: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        place: "",
        participantsNumber: "",
        dateCloseApply: "",
        major: "",
        description: "",
    });

    const [newmajor,setMajor] = useState("")
   
    const { user, signout } = useContext(AuthContext);

    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log(data.getOnePost)
                
                setUserInfo({
                    photo: "",
                    name: data.getOnePost.name,
                    dateStart: dateFormat(data.getOnePost.dateStart, "isoDate"),
                    dateEnd: dateFormat(data.getOnePost.dateEnd, "isoDate"),
                    timeStart: data.getOnePost.timeStart,
                    timeEnd: data.getOnePost.timeEnd,
                    place: data.getOnePost.place,
                    participantsNumber: data.getOnePost.participantsNumber,
                    dateCloseApply: dateFormat(data.getOnePost.dateCloseApply, "yyyy-mm-dd'T'HH:MM"),
                    major: data.getOnePost.major,
                    description: data.getOnePost.description,
                });
               
            }
        },
    });

    
    


    const [EditPost] = useMutation(EDITPOST, {
        variables: { postId, ...userInfo },
        //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
        onCompleted: (data2) => {
            if (data2) {
                console.log(data2);
                setUserInfo({
                    photo: "",
                    name: "",
                    dateStart: "",
                    dateEnd: "",
                    timeStart: "",
                    timeEnd: "",
                    place: "",
                    participantsNumber: "",
                    dateCloseApply: "",
                    major: "",
                    description: "",
                });

            }
            // window.location.reload();
            Router.push('/activity/' + postId);
            
            console.log("on complete")
            console.log(userInfo)
        },
    })



    const handleSubmit = async e => {
        console.log(userInfo)
        console.log("handle submit")
        try {
            console.log("Doneeeeeeeeeee1")
            e.preventDefault();
            console.log("Doneeeeeeeeeee2")
            await EditPost();
            console.log("Doneeeeeeeeeee3")
            console.log(userInfo)
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = e => {
        console.log("Value", e.target.value)
        setUserInfo({
            ...userInfo,

            [e.target.name]: e.target.value
        })
    }

    const majorChange = e => {
        setUserInfo[{
            major: e.target.value
        }]
    }


    
    console.log("postId", postId);


    if (error) return <p>Something went wrong, please try again.</p>;

    if (loading) return <p>Loading ...</p>;

    return (
        
            <div className="Post-Page" >
            <form className="Post-Page">
                <nav className="Post-Toggle-Button-Menu active">
                    <ul className="Post-Toggle-Button-Items">
                        <label>
                            <img src={CreateAct} id="Post-Logo"></img>
                        </label>
                        <label >
                            แก้ไขข้อมูลกิจกรรม
                </label>
                    </ul>
                </nav>
                <hr></hr>
                <div className="Post-poster-container" >
                    <div className="previewProfilePic center">
                        <img className="post_image"/>
                        <div className="post_choseimage">
                            <input id="profilePic" type="file" />
                        </div>
                    </div>
                </div>
                <div className="Post-Input-Container" >
                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>ชื่อกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <input type="text" name="name" className="Post-Input-Fill-Data" placeholder="" onChange={handleChange} value={userInfo.name} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>วันที่จัดกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row">
                                <form noValidate className="Post-Calendar-Time">
                                    <input type="date" name="dateStart" InputLabelProps={{ shrink: true, }} data-date-format="MM-DD-YYY" className="Post-Input-Fill-Data" onChange={handleChange} value={userInfo.dateStart} />

                                    {/* <TextField
                                        id="date"
                                        label="จาก"
                                        type="date"
                                        name="dateStart"
                                        // defaultValue=""
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange}
                                        value={userInfo.dateStart}
                                    /> */}
                                </form>
                                <h3 className="Post-Calendar-Time">ถึง</h3>
                                <form noValidate className="Post-Calendar">
                                    <input type="date" name="dateEnd" InputLabelProps={{ shrink: true, }} data-date-format="MM-DD-YYY" className="Post-Input-Fill-Data" onChange={handleChange} value={userInfo.dateEnd} />
                                    {/* <TextField
                                        id="date"
                                        name="dateEnd"
                                        label="ถึง"
                                        type="date"
                                        // defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange}
                                        value={userInfo.dateEnd}
                                    /> */}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row Post-Input">
                        <div className="Post-Column Post-Input">
                            <h2>เวลาที่จัดกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row">
                                <form className="Post-Calendar-Time Post-Time">
                                    <input type="time" name="timeStart" className="Post-Input-Fill-Data" onChange={handleChange} value={userInfo.timeStart} />
                                    {/* <TextField
                                        id="time"
                                        name="timeStart"
                                        label="Alarm clock"
                                        type="time"
                                        // defaultValue="07:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        onChange={handleChange}
                                        value={userInfo.timeStart}
                                    /> */}
                                </form>

                                <h3 className="Post-Calendar-Time">ถึง</h3>
                                <form className="Post-Calendar-Time">
                                    <input type="time" name="timeEnd" className="Post-Input-Fill-Data" onChange={handleChange} value={userInfo.timeEnd} />
                                    {/* <TextField
                                        id="time"
                                        name="timeEnd"
                                        label="Alarm clock"
                                        type="time"
                                        // defaultValue="07:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        onChange={handleChange}
                                        value={userInfo.timeEnd}
                                    /> */}
                                </form>

                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>สถานที่จัดกิจกรรม</h2>
                        </div>

                        <div className="Post-Column2 Post-Input">
                            <input type="text" name="place" className="Post-Input-Fill-Data" placeholder="" onChange={handleChange} value={userInfo.place} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input" >
                            <h2>จำนวนที่เปิดรับ</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row Post-margin-top">
                                {/* <RadioGroup name="participantsNumber" >
                                    <RadioButton label="ไม่จำกัดจำนวน" value="10000000000" />
                                    <RadioButton value={NumofPerson} /> */}
                                <input type="number" name="participantsNumber" className="Post-Input-Small-Fill-Data Post-Input-Fill-Data" onChange={handleChange} value={userInfo.participantsNumber} />
                                {/* onChange={(e) => { setNumofPerson(e.target.value) } */}
                                {/* </RadioGroup> */}
                                <h4>คน</h4>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>วันที่ปิดรับสมัคร</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row">
                                <input type="datetime-local" name="dateCloseApply" className="Post-Input-Fill-Data" onChange={handleChange} value={userInfo.dateCloseApply} />

                                {/* <TextField
                                    id="datetime-local"
                                    label="close"
                                    name='dateCloseApply'
                                    type="datetime-local"
                                    // defaultValue="2017-05-24T10:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                    value={userInfo.dateCloseApply}
                                /> */}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>คณะ/วิทยาลัย</h2>
                        </div>
                        <div className="Post-Column2 Post-Input" onChange={handleChange} value={userInfo.major}>
                            <select className="Post-Input-Fill-Data" name="major" onChange={majorChange} value={userInfo.major}>
                                <option value="0">เลือกคณะ/วิทยาลัย</option>
                                <option value="1">คณะวิศวกรรมศาสตร์</option>
                                <option value="2">คณะสถาปัตยกรรมศาสตร</option>
                                <option value="3">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</option>
                                <option value="4">คณะวิทยาศาสตร์</option>
                                <option value="5">คณะเทคโนโลยีการเกษตร </option>
                                <option value="6">คณะเทคโนโลยีสารสนเทศ</option>
                                <option value="7">คณะการบริหารและการจัดการ</option>
                                <option value="8">คณะศิลปศาสตร์</option>
                                <option value="9">คณะแพทยศาสตร์</option>
                                <option value="10">วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง</option>
                                <option value="11">วิทยาลัยนวัตกรรมการผลิตขั้นสูง</option>
                                <option value="12">วิทยาลัยอุตสาหกรรมการบินนานาชาติ</option>
                                <option value="13">วิทยาลัยวิจัยนวัตกรรมทางการศึกษา</option>
                                <option value="14">วิทยาลัยวิศวกรรมสังคีต</option>
                                <option value="15">ทั้งหมด</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>คำอธิบายกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <textarea type="text" name="description" className="Post-Input-Fill-Data Post-Input-Large-Fill-Data" placeholder="" onChange={handleChange} value={userInfo.description} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>อัลบั้มรูปภาพ</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <img className="Post-margin-top" id="Post-Logo" src={ImageLogo}></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="Post-Column Post-Input"></div>
                        <div className="Post-Column2 Post-Input">

                        </div>
                    </div>
                    <div className="row">
                        <div className="Post-Column"> </div>
                        <div className="Post-Column2">
                            <div className="Post-Left-Button">
                                <button type="submit" name="button" className="Post-Unsubmit-Button">ยกเลิก</button>
                                <button type="submit" name="button" className="Post-Submit-Button" onClick={handleSubmit}>บันทึก</button>
                            </div>
                            {/* <div className="Post-Right-Button">
                                <button type="submit" name="button" className="Post-Submit-Button">บันทึก</button>
                            </div> */}


                        </div>
                    </div>
                </div>


            </form>
        </div>
        

       
    );
};

export default EditPost;
