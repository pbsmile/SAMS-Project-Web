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
                            <input type="text" name="" className="register_input-user-pass" defaultValue="" placeholder="username" />
                        </div>
                        <div className="register_input mb-3">
                            <label htmlFor="password">รหัสนักศึกษา</label>
                            <input type="password" name="" className="register_input-user-pass" defaultValue="" placeholder="password" />
                        </div>
                        <div className="register_input mb-3">
                            <label htmlFor="username">ชื่อ-นามสกุล</label>
                            <input type="text" name="" className="register_input-user-pass" defaultValue="" placeholder="username" />
                        </div>
                        <div className="register_input mb-3">
                            <label htmlFor="password">เบอร์โทรศัพท์</label>
                            <input type="password" name="" className="register_input-user-pass" defaultValue="" placeholder="password" />
                        </div>
                        <div className="register_input mb-3">
                            <label htmlFor="username">อีเมล</label>
                            <input type="text" name="" className="register_input-user-pass" defaultValue="" placeholder="username" />
                        </div>
                        <div className="register_input mb-3">
                            <label htmlFor="password">รหัสผ่าน</label>
                            <input type="password" name="" className="register_input-user-pass" defaultValue="" placeholder="password" />
                        </div>
                        <div className="register_input mb-3">
                            <label htmlFor="password">ยืนยันรหัสผ่าน</label>
                            <input type="password" name="" className="register_input-user-pass" defaultValue="" placeholder="password" />
                        </div>
                        <div className="register_form-group">
                            <div className="register_custom-control register_custom-checkbox">
                                <input type="checkbox" className="register_custom-control-input" />
                                <label className="register_custom-control-label">Remember me</label>
                            </div>

                            <div className="d-flex justify-content-center mt-3">
                                <button type="button" name="button" className="register_btn">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        

    );
};

export default register;