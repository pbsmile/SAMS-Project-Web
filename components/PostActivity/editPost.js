import React, { useEffect, useState, useContext } from "react";
// import Button from "@material-ui/core/Button";

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

// import Modal from 'react-modal';

// import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal} from 'react-bootstrap';


const EDITPOST = gql`
mutation EDITPOST(
    $postId: String!,
    $photoHeader: String, 
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
        photoHeader: $photoHeader, 
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
      photoHeader
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

// Modal.setAppElement('#yourAppElement')

const EditPost = () => {
    const route = useRouter();
    console.log(route);
    const postId = route.query.activityId;


    const dateFormat = require("dateformat");
    const [userInfo, setUserInfo] = useState({
        photoHeader: "",
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

    // var subtitle;
    // const [modalIsOpen, setIsOpen] = React.useState(false);
    // function openModal() {
    //     setIsOpen(true);
    // }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    // function closeModal() {
    //     setIsOpen(false);
    // }

    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '50%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         marginRight: '-50%',
    //         transform: 'translate(-50%, -50%)'
    //     }
    // };

    const [show, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    const [newmajor, setMajor] = useState("")

    const { user, signout } = useContext(AuthContext);

    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log(data.getOnePost)

                setUserInfo({
                    photoHeader: data.getOnePost.photoHeader,
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
                    photoHeader: "",
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

    const cancleSubmit = async e => {
        Router.push('/activity/' + postId);
    }

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


    // dateFormat.i18n = {
    //     dayNames: [
    //       "วันอาทิตย์",
    //       "วันจันทร์",
    //       "วังอังคาร",
    //       "วันพุธ",
    //       "วันพฤหัสบดี",
    //       "วันศุกร์",
    //       "วันเสาร์",
    //       "Sunday",
    //       "Monday",
    //       "Tuesday",
    //       "Wednesday",
    //       "Thursday",
    //       "Friday",
    //       "Saturday",
    //     ],
    //     monthNames: [
    //       "Jan",
    //       "Feb",
    //       "Mar",
    //       "Apr",
    //       "May",
    //       "Jun",
    //       "Jul",
    //       "Aug",
    //       "Sep",
    //       "Oct",
    //       "Nov",
    //       "Dec",
    //       "January",
    //       "February",
    //       "March",
    //       "April",
    //       "May",
    //       "June",
    //       "July",
    //       "August",
    //       "September",
    //       "October",
    //       "November",
    //       "December",
    //     ],
    //     timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"]

    // }
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
                        <img className="post_image" src={userInfo.photoHeader}/>
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
                                <div noValidate className="Post-Calendar-Time">
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
                                </div>
                                <h3 className="Post-Calendar-Time">ถึง</h3>
                                <div noValidate className="Post-Calendar">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row Post-Input">
                        <div className="Post-Column Post-Input">
                            <h2>เวลาที่จัดกิจกรรม</h2>
                        </div>
                        <div className="Post-Column2 Post-Input">
                            <div className="Post-Flex-Row">
                                <div className="Post-Calendar-Time Post-Time">
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
                                </div>

                                <h3 className="Post-Calendar-Time">ถึง</h3>
                                <div className="Post-Calendar-Time">
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
                                </div>

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
                                <option value="ไม่ระบุ">เลือกคณะ/วิทยาลัย</option>
                                <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                                <option value="คณะสถาปัตยกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์</option>
                                <option value="คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</option>
                                <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                                <option value="คณะเทคโนโลยีการเกษตร">คณะเทคโนโลยีการเกษตร </option>
                                <option value="คณะเทคโนโลยีสารสนเทศ">คณะเทคโนโลยีสารสนเทศ</option>
                                <option value="คณะการบริหารและการจัดการ">คณะการบริหารและการจัดการ</option>
                                <option value="คณะศิลปศาสตร์">คณะศิลปศาสตร์</option>
                                <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
                                <option value="วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง">วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง</option>
                                <option value="วิทยาลัยนวัตกรรมการผลิตขั้นสูง">วิทยาลัยนวัตกรรมการผลิตขั้นสูง</option>
                                <option value="วิทยาลัยอุตสาหกรรมการบินนานาชาติ">วิทยาลัยอุตสาหกรรมการบินนานาชาติ</option>
                                <option value="วิทยาลัยวิจัยนวัตกรรมทางการศึกษา">วิทยาลัยวิจัยนวัตกรรมทางการศึกษา</option>
                                <option value="วิทยาลัยวิศวกรรมสังคีต">วิทยาลัยวิศวกรรมสังคีต</option>
                                <option value="ทั้งหมด">ทั้งหมด</option>
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
                    {/* <div className="row">
                        <div className="Post-Column"> </div>
                        <div className="Post-Column2">
                            <div className="Post-Left-Button">
                                <button name="button" className="Post-Unsubmit-Button" >ยกเลิก</button>
                                <button type="submit" name="button" className="Post-Submit-Button" onClick={handleSubmit}>บันทึก</button>
                            </div>
                      </div>
                    </div> */}
                </div>
            </form>
            <div className="Post-Page">
                <div className="row">
                    <div className="Post-Column"> </div>
                    <div className="Post-Column2">
                        <div className="Post-Left-Button">
                            <button name="button" className="Post-Unsubmit-Button" onClick={cancleSubmit}>ยกเลิก</button>
                            <button type="submit" name="button" className="Post-Submit-Button" onClick={handleEditShow}>บันทึก</button>
                        </div>
                    </div>
                </div>

                {/* <Button variant="primary" >
                    Launch static backdrop modal
                </Button> */}

                <Modal
                    show={show}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>ยืนยันข้อมูลกิจกรรม</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ชื่อกิจกรรม : {userInfo.name}<br></br>
                        วันที่จัดกิจกรรม : {dateFormat(userInfo.dateStart, "d/m/yyyy")} ถึง {dateFormat(userInfo.dateEnd, "d/m/yyyy")}<br></br>
                        เวลาที่จัดกิจกรรม : {userInfo.timeStart} น. ถึง {userInfo.timeEnd} น.<br></br>
                        สถานที่ : {userInfo.place}<br></br>
                        คณะ/วิทยาลัย : {userInfo.major}<br></br>
                        จำนวนที่เปิดรับสมัคร : {userInfo.participantsNumber} คน<br></br>
                    วันที่ปิดรับสมัคร : {dateFormat(userInfo.dateCloseApply, "d/m/yyyy HH:MM")} น.<br></br>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-outline-danger" onClick={handleEditClose}>ยกเลิก</Button>
                        <Button variant="btn btn-info" onClick={handleSubmit}>ยืนยัน</Button>
                    </Modal.Footer>
                </Modal>
                {/* <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >

                    <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
                    <button onClick={closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal> */}
            </div>
        </div>



    );
};

export default EditPost;
