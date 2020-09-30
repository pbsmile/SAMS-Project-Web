import React from "react";

const login = () => {
    return (
        <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center form_container">
                            <div className="d-flex justify-content-center login_header">
                                <h3>LOGIN</h3>
                            </div>
                        <form>
                            <div className="input-group mb-3">
                                <label htmlFor="username">USERNAME</label>
                                <input type="text" name="" className="input-user-pass" defaultValue="" placeholder="username" />
                            </div>
                            <div className="input-group mb-3">
                                <label htmlFor="password">PASSWORD</label>
                                <input type="password" name="" className="input-user-pass" defaultValue="" placeholder="password" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                </div>
                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button type="button" name="button" className="btn login_btn">Login</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>

                    <div className="form-group mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <a href="#" className="ml-2">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center links">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;