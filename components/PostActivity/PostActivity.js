import { Divider } from "@material-ui/core";
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
                        <h2>Column 1</h2>
                        <p>Some text..</p>
                    </div>
                    <div className="column">
                        <div className="post_input">
                            <h2>ชื่อกิจกรรม</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                        </div>
                        <div className="post_input">
                            <h2>วันที่จัดกิจกรรม</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
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
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                        </div>
                        <div className="post_input">
                            <h2>วันที่ปิดรับสมัคร</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
                        </div>
                        <div className="post_input">
                            <h2>คณะ/วิทยาลัย</h2>
                            <input type="text" name="" className="post_input_data" defaultValue="" placeholder="" />
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