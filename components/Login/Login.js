import React from "react";

const login = () => {
    return (
        <div className="d-flex justify-content-center login_container h-100">
            <div className="login_user_card">
                <div className="d-flex justify-content-center login_form_container">
                    <div className="d-flex justify-content-center login_header">
                        <h3>LOGIN</h3>
                    </div>
                    <form>
                        <div className="login_input mb-3">
                            <label htmlFor="username">USERNAME</label>
                            <input type="text" name="" className="login_input-user-pass" defaultValue="" placeholder="username" />
                        </div>
                        <div className="login_input mb-3">
                            <label htmlFor="password">PASSWORD</label>
                            <input type="password" name="" className="login_input-user-pass" defaultValue="" placeholder="password" />
                        </div>
                        <div className="login_form-group">
                            <div className="login_custom-control login_custom-checkbox">
                                <input type="checkbox" className="login_custom-control-input" />
                                <label className="login_custom-control-label">Remember me</label>
                            </div>

                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button type="button" name="button" className="btn login_btn">Login</button>
                            </div>

                            <div className="d-flex justify-content-center login_links">
                                Don't have an account? <a href="#" className="login_register">Register</a>
                            </div>
                            
                            <div className="d-flex justify-content-center login_links">
                                <a href="#">Forgot your password?</a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    );
};

export default login;