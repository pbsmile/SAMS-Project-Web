import React, { useEffect, useState, useContext, createContext } from "react";
import { AuthContext } from "../../appState/AuthProvider";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { Route, Switch } from "react-router";
import Router from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";

import CreateAct from "../../Image/create.png"
import ImageLogo from "../../Image/img.png"
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";


import Datetime from 'react-datetime';

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
            major
    }
  }
`;


const EditPost = () => {
    // const [major, setMajor] = useState(null);
    // const [status, setStatus] = useState(null)
    // const [radio, setRadio] = useState(null);
    // const [NumofPerson, setNumofPerson] = useState(null);

    console.log("testrouter")
    const route = useRouter();
    console.log(route);
    const postId = route.query.activityId;
    
    // const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
    //     variables: { postId },
    //     onCompleted: (data) => {
    //         if (data) {
    //             // console.log("JOIN", data.getOnePost.canJoin);
    //             console.log("data");
    //             console.log(data.getOnePost.name);
    //             // userInfo()
    //             //Router.push("/activity");
    //         }
    //     },
    // });

    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
    });
    if (data) {
        console.log("have data")
        console.log(data)
    }

    console.log("pass oncomplete");

    
    if (loading) return <p>Loading ...</p>;

    console.log("postId", postId);

    //edit format date
    // var dateStart_cut = data.getOnePost.dateStart
    // var dateEnd_cut = data.getOnePost.dateEnd
    // var dateClose = data.getOnePost.dateCloseApply
    // console.log(data.getOnePost.dateStart)
    const dateFormat = require("dateformat");
    // const d_start=dateFormat(dateStart_cut, "isoDate")
    // const d_end=dateFormat(dateEnd_cut, "isoDate")
    // const d_close = dateFormat(dateClose, "")

    // console.log(dateFormat(d, "isoDate"))

    // console.log(d_start)
    // console.log(d_end)
    // console.log(dateFormat(data.getOnePost.dateCloseApply,"yyyy-mm-dd'T'HH:MM"))
    // if (error) return <p>Something went wrong, please try again.</p>;

    // else if (loading) return <p>Loading ...</p>;
    console.log("before test" )
    const [test, settest] = useState("null");
    console.log("test" + test)
    
    const [userInfo, setUserInfo] = useState({
        // photo: "data.getOnePost.photo",
        photo: data.getOnePost.photo,
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

    // const [userInfo, setUserInfo] = useState(data.getOnePost.major)

    console.log(userInfo)

    


    const [EditPost] = useMutation(EDITPOST, {
        variables: { postId, ...userInfo },
        //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
        onCompleted: (dataset) => {
            if (dataset) {
                console.log(dataset);
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
            Router.push('/main');
            console.log("on complete")
            console.log(userInfo)
        },


    })

    
    const handleChange = e => {
        console.log("Value", e.target.value)
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        console.log(userInfo)
        console.log("handle submit")
        // await EditPost();
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
    const handleUnSubmit = async () => {
        Router.push('/main');
    };

    //image
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            userInfo.photo = e.target.files[0].name
            reader.readAsDataURL(e.target.files[0]);
        }

    };

    // Set Drop down and radio
    const [major, setMajor] = useState(null);
    // const [status, setStatus] = useState(null)
    const [radio, setRadio] = useState(null);
    // const [NumofPerson, setNumofPerson] = useState(null);
    // const [shouldRender, setShouldRender] = useState(true);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setShouldRender(false);
    //     }, 5000);
    // }, []);

    // if( !shouldRender ) return null;
    return (
        <div className="Post-Page" >
            <form className="Post-Page" onSubmit={handleSubmit}>
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
                        <img className="post_image" src={imgData} />
                        <div className="post_choseimage">
                            <input id="profilePic" type="file" onChange={onChangePicture} />
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
                                    <input type="date" name="dateStart" data-date-format="MM-DD-YYY" className="Post-Input-Fill-Data" onChange={handleChange} value={userInfo.dateStart} />

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
                                    <input type="date" name="dateEnd" data-date-format="MM-DD-YYY" className="Post-Input-Fill-Data" onChange={handleChange} value={userInfo.dateEnd} />
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
                            <div className="Post-Flex-Row Post-margin-top" onChange={(e) => { setRadio(e.target.value) }} onChange={handleChange} value={radio}>
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
                            <select className="Post-Input-Fill-Data" name="major" onChange={(e) => { setMajor(e.target.value) }} value={userInfo.major}>
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
                                <button type="submit" name="button" className="Post-Submit-Button">บันทึก</button>
                            </div>
                            {/* <div className="Post-Right-Button">
                                <button type="submit" name="button" className="Post-Submit-Button">บันทึก</button>
                            </div> */}


                        </div>
                    </div>
                </div>


            </form>
        </div>
        // <div className="Post-Page" >
        //     <form className="Post-Page" onSubmit={handleSubmit}>

        //         {/* <h3>{data.getOnePost.name}</h3>
        //         <h3>{data.getOnePost.name}</h3>
        //         <h3>{data.getOnePost.name}</h3>
        //         <h3>{data.getOnePost.name}</h3>
        //         <h3>{data.getOnePost.name}</h3> */}
        //         <input type="text" name="name" className="Post-Input-Fill-Data" placeholder="" value={userInfo.name} />
        //         <input type="text" name="name" className="Post-Input-Fill-Data" placeholder="" value={userInfo.name} onChange={handleChange} />
        //         <input type="date" name="dateStart" className="Post-Input-Fill-Data" placeholder="" value={userInfo.dateStart} />
        //         <input type="date" name="dateEnd" className="Post-Input-Fill-Data" placeholder="" value={userInfo.dateEnd} />
        //         <input type="text" name="place" className="Post-Input-Fill-Data" placeholder="" value={userInfo.place} onChange={handleChange} />
        //         <input type="text" name="participantsNumber" className="Post-Input-Fill-Data" placeholder="" value={userInfo.participantsNumber} onChange={handleChange} />
        //         <input type="text" name="description" className="Post-Input-Fill-Data" placeholder="" value={userInfo.description} onChange={handleChange} />
        //         <h2>{data.getOnePost.timeStart}</h2>
        //         <h2>{data.getOnePost.timeEnd}</h2>
        //         <div className="Post-Left-Button">
        //             <button type="submit" name="button" className="Post-Submit-Button">บันทึก</button>
        //         </div>
        //     </form>

        // </div>
    );
};

export default EditPost;
