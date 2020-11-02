import React, { useState, Children, createContext, useContext } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import { Height } from "@material-ui/icons";

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
    return (
        <div className="post_user_card">
            {/* <div className="d-flex justify-content-center post_form_container"> */}
            <div className="d-flex justify-content-center post_header">
                <h3>สร้างกิจกรรมใหม่</h3>
            </div>

            <div className="row">
                <div className="column1">
                    img
                    </div>
                <div className="column">
                    <div className="row post_input">
                        <h2>ชื่อกิจกรรม</h2>
                        <input type="text" name="" className="post_input_default post_input_data" placeholder="" />
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
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                                <h3>ถึง</h3>
                                <form noValidate>
                                    <TextField
                                        id="date"
                                        label="ถึง"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                label="Alarm clock"
                                type="time"
                                defaultValue="07:30"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <h3>ถึง</h3>
                            <TextField
                                id="time"
                                label="Alarm clock"
                                type="time"
                                defaultValue="07:30"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </div>
                    </div>

                    <div className="row post_input">
                        <h2>สถานที่จัดกิจกรรม</h2>
                        <input type="text" name="" className="post_input_default post_input_data" placeholder="" />
                    </div>
                    <div className="row post_input">
                        <h2>จำนวนที่เปิดรับสมัคร</h2>
                        <div className="post_flex1">

                            <RadioGroup name="NumberOfPeople">
                                <RadioButton label="ไม่จำกัดจำนวน" value="nolimit" />
                                <RadioButton value="nolimit" />
                                <input type="text" name="" className="post_input_small post_input_data" placeholder="" />
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
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className="row post_input">
                        <h2>คณะ/วิทยาลัย</h2>

                        <div className="row post_selectfac">
                            <select className="post_input_default post_input_data">
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
                        <input type="text" name="" className="post_input_large post_input_data" placeholder=""></input>
                    </div>
                </div>
            </div>

            {/* </div> */}
        </div>
    );
};

export default post;