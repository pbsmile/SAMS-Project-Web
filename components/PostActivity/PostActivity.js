import React from "react";

const post = () => {
    return (
        <div className="post_user_card">
            <div className="d-flex justify-content-center post_form_container">
                <div className="d-flex justify-content-center post_header">
                    <h3>สร้างกิจกรรมใหม่</h3>
                </div>

                <div className="row">
                    <div className="column">
                        img
                    </div>
                    <div className="column">
                        <div className="post_input">
                            <h2>ชื่อกิจกรรม</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                        </div>
                        <div className="post_input">
                            <h2>วันที่จัดกิจกรรม</h2>
                            <div className="flex1">
                                <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                                <h2>ถึง</h2>
                                <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                            </div>
                        </div>
                        <div className="post_input">
                            <h2>เวลาที่จัดกิจกรรม</h2>
                            <div className="flex1">
                                <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                                <h2>ถึง</h2>
                                <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                            </div>
                        </div>
                        <div className="post_input">
                            <h2>สถานที่จัดกิจกรรม</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                        </div>
                        <div className="post_input">
                            <h2>จำนวนที่เปิดรับสมัคร</h2>
                            <div className="flex1">
                                <input type="radio" id="post_point_input" value="ไม่จำกัดจำนวน"></input>
                                <label htmlFor="age1">ไม่จำกัดจำนวน</label><br></br>
                                <input type="radio" id="post_point_input" value="เพิ่มเติม"></input>
                                <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                            </div>
                        </div>
                        <div className="post_input">
                            <h2>วันที่ปิดรับสมัคร</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                        </div>
                        <div className="post_input">
                            <h2>คณะ/วิทยาลัย</h2>
                            <div className="flex1">
                                <input type="radio" id="post_point_input" value="ไม่ระบุ"></input>
                                <label htmlFor="age1">ไม่ระบุ</label><br></br>
                                <input type="radio" id="post_point_input" value="เพิ่มเติม"></input>
                                <div className="post_selectfac">
                                    <select className="post_input_data">
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
                            </div>
                        </div>
                        <div className="post_input">
                            <h2>รายละเอียดเพิ่มเติม</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default post;