import React from "react";

const register = () => {
    return (
        <div className="register_user_card">
            <div className="d-flex justify-content-center register_form_container">
                <div className="d-flex justify-content-center register_header">
                    <h3>ลงทะเบียน</h3>
                </div>
                <form>
                    <div className="register_input mb-3">
                        <label htmlFor="username">ชื่อ-นามสกุล</label>
                        <input type="text" name="" className="register_input_data" defaultValue="" placeholder="" />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">รหัสนักศึกษา</label>
                        <input type="password" name="" className="register_input_data" defaultValue="" placeholder="" />
                    </div>
                    <div className="register_input mb-3">
                        <label>คณะ/วิทยาลัย</label>
                        <select className="register_input_data">
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
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="username">ชื่อ-นามสกุล</label>
                        <input type="text" name="" className="register_input_data" defaultValue="" placeholder="" />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">เบอร์โทรศัพท์</label>
                        <input type="password" name="" className="register_input_data" defaultValue="" placeholder="" />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="username">อีเมล</label>
                        <input type="text" name="" className="register_input_data" defaultValue="" placeholder="" />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" name="" className="register_input_data" defaultValue="" placeholder="" />
                    </div>
                    <div className="register_input mb-3">
                        <label htmlFor="password">ยืนยันรหัสผ่าน</label>
                        <input type="password" name="" className="register_input_data" defaultValue="" placeholder="" />
                    </div>
                    <div className="register_form-group">
                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" name="button" className="register_btn">REGISTER</button>
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