import React, { useState, Children, createContext, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import { Height } from "@material-ui/icons";
import gql from "graphql-tag";


const CREATEPOST = gql`
mutation CREATEPOST($name: String!, $dateStart: Date!, $dateEnd: Date!, $timeStart: String!, $timeEnd: String!, $place: String!, $participantsNumber: Number!, $dateCloseApply: Date!, $major: String!, $description: String)
{
    createPost(input:{name: $name, dateStart: $dateStart , dateEnd: $dateEnd , timeStart: $timeStart ,timeEnd: $timeEnd, place: $place, participantsNumber: $participantsNumber, dateCloseApply: $dateCloseApply, major: $major, description: $description })
    {
        name
    }
}
`;
// Set Radio
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

const post = () => {
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

    const [post, { loading, error }] = useMutation(CREATEPOST, {
        variables: { ...userInfo },
        //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
        onCompleted: (data) => {
            if (data) {
                console.log(data);
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
    });

    const handleChange = e => {
        console.log("value", e.target.value)


        setUserInfo({
            ...userInfo,

            [e.target.name]: e.target.value
        })
    }
    console.log("value2", userInfo)

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            await post();
        } catch (error) {
            console.log(error);
        }
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
    const [status, setStatus] = useState(null)
    const [radio, setRadio] = useState(null);
    const [NumofPerson, setNumofPerson] = useState(null);

    return (
        <div className="post_user_card">
            <form onSubmit={handleSubmit}>
                {/* <div className="d-flex justify-content-center post_form_container"> */}
                <div className="d-flex justify-content-center post_header">
                    <h3>สร้างกิจกรรมใหม่</h3>
                </div>

                <div className="row">
                    <div className="column1" >
                        <div className="row">
                            <div className="previewProfilePic center">
                                <img className="post_image" src={imgData} />
                            </div>
                            <div className="post_choseimage">
                                <input id="profilePic" type="file" onChange={onChangePicture} />
                            </div>
                        </div>
                        <div className="row" onChange={handleChange} value={status}>
                            <select className="post_status_input" name="status" onChange={(e) => { setStatus(e.target.value) }} value={status}>
                                <option value="status">สถานะกิจกรรม</option>
                                <option value="close">ปิดรับสมัคร</option>
                                <option value="open">เปิดรับสมัคร</option>
                                <option value="full">เต็มจำนวนรับสมัคร</option>
                            </select>
                        </div>
                    </div>
                    <div className="column">
                        <div className="row post_input">
                            <h2>ชื่อกิจกรรม</h2>
                            <input type="text" name="name" className="post_input_default post_input_data" placeholder="" onChange={handleChange} value={userInfo.name} />
                        </div>
                        <div className="row post_input">
                            <h2>วันที่จัดกิจกรรม</h2>
                            <div className="post_input_size">
                                <div className="post_flex1 ">
                                    <form noValidate>
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
                                    <h3>ถึง</h3>
                                    <form noValidate>
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
                        <div className="row post_input">
                            <h2>เวลาที่จัดกิจกรรม</h2>
                            <div className="post_flex1">
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
                                <h3>ถึง</h3>
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
                            </div>
                        </div>

                        <div className="row post_input">
                            <h2>สถานที่จัดกิจกรรม</h2>
                            <input type="text" name="place" className="post_input_default post_input_data" placeholder="" onChange={handleChange} value={userInfo.place} />
                        </div>
                        <div className="row post_input">
                            <h2>จำนวนที่เปิดรับสมัคร</h2>
                            <div className="post_flex1" onChange={(e) => { setRadio(e.target.value) }} onChange={handleChange} value={radio}>
                                <RadioGroup name="participantsNumber" >
                                    <RadioButton label="ไม่จำกัดจำนวน" value="10000000000" />
                                    <RadioButton value={NumofPerson} />
                                    <input type="text" className="post_input_small post_input_data" onChange={(e) => { setNumofPerson(e.target.value) }} />
                                </RadioGroup>
                                <h4>คน</h4>
                            </div>
                        </div>
                        <div className="row post_input">
                            <h2>วันที่ปิดรับสมัคร</h2>
                            <div className="post_flex1">
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
                        <div className="row post_input">
                            <div onChange={handleChange} value={major}>
                                <h2>คณะ/วิทยาลัย</h2>
                                <select className="post_input_default post_input_data" name="major" onChange={(e) => { setMajor(e.target.value) }} value={major}>
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
                        <div className="row post_input">
                            <h2>รายละเอียดเพิ่มเติม</h2>
                            <textarea type="text" name="description" className="post_input_large post_input_data" placeholder="" onChange={handleChange} value={userInfo.description} />
                        </div>

                    </div>
                </div>
                <div className="register_form-group d-flex justify-content-center mt-3">
                    <button type="submit" name="button" className="register_btn">โพสต์</button>
                </div>
            </form>
        </div>
    );
};

export default post;