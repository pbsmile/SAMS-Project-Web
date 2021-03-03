import React, { useState, Children, createContext, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const REGISTER = gql`
mutation REGISTER($type: String!,$name: String!, $studentId: String!, $major: String!, $phoneNumber: String!, $email: String!, $password: String!){
    register(input: { type: $type, name: $name, studentId: $studentId, major: $major, phoneNumber: $phoneNumber, email: $email, password: $password })
    {
        accessToken
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


// Register API
const register = () => {
    const [userInfo, setUserInfo] = useState({
        type: "",
        name: "",
        studentId: "",
        major: "",
        phoneNumber: "",
        email: "",
        password: ""
    });


    const [register, { loading, error }] = useMutation(REGISTER, {
        variables: { ...userInfo },
        //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
        onCompleted: (data) => {
            if (data) {
                console.log(data);
                setUserInfo({
                    type: "",
                    name: "",
                    studentId: "",
                    major: "",
                    phoneNumber: "",
                    email: "",
                    password: ""
                });
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
    console.log(userInfo)

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            await register();
        } catch (error) {
            console.log(error);
        }
    };

    // Set Drop down
    const [dropdown, setDropdown] = useState(null);
    const [radio, setRadio] = useState(null);
    // const [isChecked, setIsChecked] = useState(false);


    return (

        <div className="register_user_card">
            <div className="d-flex justify-content-center register_form_container">
                <div className="d-flex justify-content-center register_header">
                    <h3>ลงทะเบียน</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="register_input mb-3">
                        <label htmlFor="username">สถานะ</label>
                        <div name="type" className="register_input_size" onChange={(e) => { setRadio(e.target.value) }} onChange={handleChange} value={radio}>
                            <RadioGroup name="type">
                                <div className="flex1">
                                    <div className="flex2">
                                        <RadioButton label="นักศึกษา" value="student" />
                                        <RadioButton label="อาจารย์/นักวิจัย" value="teacher" />
                                    </div>
                                    <div className="flex2">
                                        <RadioButton label="บุคลากรภายใน" value="personnel" />
                                        <RadioButton label="อื่นๆ" value="other" />
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="register_input mb-3">
                        <label htmlFor="username">ชื่อ-นามสกุล</label>
                        <input type="text" name="name" className="register_input_data" onChange={handleChange} value={userInfo.name} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">รหัสนักศึกษา</label>
                        <input type="text" name="studentId" className="register_input_data" onChange={handleChange} value={userInfo.studentId} />
                    </div>
                    <div className="register_input mb-3">
                        <div onChange={handleChange} value={dropdown}>
                            <label>คณะ/วิทยาลัย</label>
                            <select className="register_input_data" name="major" onChange={(e) => { setDropdown(e.target.value) }} value={dropdown} >
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
                            </select>
                        </div>
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">เบอร์โทรศัพท์</label>
                        <input type="text" name="phoneNumber" className="register_input_data" placeholder="" onChange={handleChange} value={userInfo.phoneNumber} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="username">อีเมล</label>
                        <input type="text" name="email" className="register_input_data" placeholder="" onChange={handleChange} value={userInfo.email} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" name="password" className="register_input_data" placeholder="" onChange={handleChange} value={userInfo.password} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">ยืนยันรหัสผ่าน</label>
                        <input type="password" name="" className="register_input_data" placeholder="" onChange={handleChange} />
                    </div>
                    <div className="register_form-group">
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" name="button" className="register_btn">สมัคร</button>
                        </div>
                        <div className="d-flex justify-content-center register_links">
                            คุณมีบัญชีอยู่แล้ว? <a href="#" className="register_login">เข้าสู่ระบบ ?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default register;