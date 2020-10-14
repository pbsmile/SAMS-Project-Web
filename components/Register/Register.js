import React, { useState } from "react";
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

const register = () => {
    const [userInfo, setUserInfo] = useState({
        type:"student",
        name: "",
        studentId: "",
        major: "Engineering",
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
        // console.log(e.target.value)
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

    return (
        <div className="register_user_card">
            <div className="d-flex justify-content-center register_form_container">
                <div className="d-flex justify-content-center register_header">
                    <h3>ลงทะเบียน</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="register_input mb-3">
                        <label htmlFor="username">ชื่อ-นามสกุล</label>
                        <input type="text" name="name" className="register_input_data" defaultValue="" placeholder="" onChange={handleChange} value={userInfo.name} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">รหัสนักศึกษา</label>
                        <input type="text" name="studentId" className="register_input_data" defaultValue="" placeholder="" onChange={handleChange} value={userInfo.studentId} />
                    </div>
                    {/* <div className="register_input mb-3" onChange={handleChange}>
                        <label>คณะ/วิทยาลัย</label>
                        <select className="register_input_data" name="major">
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
                        </select>
                    </div> */}
                    <div className="register_input mb-3">
                        <label htmlFor="password">เบอร์โทรศัพท์</label>
                        <input type="text" name="phoneNumber" className="register_input_data" defaultValue="" placeholder="" onChange={handleChange} value={userInfo.phoneNumber} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="username">อีเมล</label>
                        <input type="text" name="email" className="register_input_data" defaultValue="" placeholder="" onChange={handleChange} value={userInfo.email} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" name="password" className="register_input_data" defaultValue="" placeholder="" onChange={handleChange} value={userInfo.password} />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">ยืนยันรหัสผ่าน</label>
                        <input type="password" name="" className="register_input_data" defaultValue="" placeholder="" onChange={handleChange} />
                    </div>
                    <div className="register_form-group">
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" name="button" className="register_btn">REGISTER</button>
                        </div>
                        <div className="d-flex justify-content-center register_links">
                            Do you have an account? <a href="#" className="register_login">Sign In?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default register;