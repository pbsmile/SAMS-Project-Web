import React, { useEffect, useState, useContext, createContext } from "react";
import { AuthContext } from "../../appState/AuthProvider";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";

import CreateAct from "../../Image/create.png"
import ImageLogo from "../../Image/img.png"
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";

const EDITPOST = gql`
mutation EDITPOST(
    $postId: String!,
    $photo: String, 
    $name: String!, 
    $dateStart: Date!, 
    $dateEnd: Date!, 
    $timeStart: String!, 
    $timeEnd: String!, 
    $place: String!, 
    $participantsNumber: Number!, 
    $dateCloseApply: Date!, 
    $major: String!, 
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
    }
  }
`;

function useRadioButtons(name) {
    const [value, setState] = useState(null);

    const handleChange = (event) => {
        RadioGroup
        setState(event.target.value);
    };

    const inputProps = {
        onChange: handleChange,
        name,
        type: "radio"
    };

    return [value, inputProps];
}

const RadioGroupContext = createContext();

function RadioGroup({ children, name, onChange }) {
    const [state, inputProps] = useRadioButtons(name);
    return (
        <RadioGroupContext.Provider value={inputProps}>
            {children}
        </RadioGroupContext.Provider>
    );
}

function RadioButton(props) {
    const context = useContext(RadioGroupContext);
    return (
        <label>
            <input {...props} {...context} />
            {props.label}
        </label>
    );
}

const EditPost = () => {
    const [major, setMajor] = useState(null);
    const [status, setStatus] = useState(null)
    const [radio, setRadio] = useState(null);
    const [NumofPerson, setNumofPerson] = useState(null);

    const route = useRouter();
    console.log(route);
    const postId = route.query.activityId;
    const { user, signout } = useContext(AuthContext);
    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log("JOIN", data.getOnePost.canJoin);
                console.log(data.getOnePost);
                //Router.push("/activity");
            }
        },
    });

    console.log("postId", postId);

    if (error) return <p>Something went wrong, please try again.</p>;

    if (loading) return <p>Loading ...</p>;


    const [userInfo, setUserInfo] = useState({
        photo: "",
        name: "",
        dateStart: "2020-12-10",
        dateEnd: "2020-12-11",
        timeStart: "12:00",
        timeEnd: "18:00",
        place: "",
        participantsNumber: "",
        dateCloseApply: "2020-12-01T23:59",
        major: "",
        description: "",
    });

    const [editpost] = useMutation(EDITPOST, {
        variables: { postId },
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
                Router.push("/activity")
            }
        },
    })

    const handleSubmit = async () => {
        console.log("handle submit")
        await editpost()
    };

    const handleChange = e => {
        console.log("Value", e.target.value)


        setUserInfo({
            ...userInfo,

            [e.target.name]: e.target.value
        })
    }



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



    return (
        <div className="Post-Page" >
            <form className="Post-Page" onSubmit={handleSubmit}>
                <nav className="Post-Toggle-Button-Menu active">
                    <ul className="Post-Toggle-Button-Items">
                        <label>
                            <img src={CreateAct} id="Post-Logo"></img>
                        </label>
                        <label >
                            สร้างกิจกรรมใหม่
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
                                    <TextField
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
                                    />
                                </form>
                                <h3 className="Post-Calendar-Time">ถึง</h3>
                                <form noValidate className="Post-Calendar">
                                    <TextField
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
                                    />
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
                                    <TextField
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
                                    />
                                </form>

                                <h3 className="Post-Calendar-Time">ถึง</h3>
                                <form className="Post-Calendar-Time">
                                    <TextField
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
                                    />
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
                                <RadioGroup name="participantsNumber" >
                                    <RadioButton label="ไม่จำกัดจำนวน" value="10000000000" />
                                    <RadioButton value={NumofPerson} />
                                    <input type="text" className="Post-Input-Small-Fill-Data Post-Input-Fill-Data" onChange={(e) => { setNumofPerson(e.target.value) }} />
                                </RadioGroup>
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
                                <TextField
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
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="Post-Column Post-Input">
                            <h2>คณะ/วิทยาลัย</h2>
                        </div>
                        <div className="Post-Column2 Post-Input" onChange={handleChange} value={major}>
                            <select className="Post-Input-Fill-Data" name="major" onChange={(e) => { setMajor(e.target.value) }} value={major}>
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
                                <option value="15">ไม่ระบุ</option>
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
                                <button type="submit" name="button" className="Post-Submit-Button">สร้างกิจกรรม</button>
                            </div>
                        </div>
                    </div>
                </div>


            </form>
        </div>
    );
};

export default EditPost;
