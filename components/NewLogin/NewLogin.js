import React, { useEffect, useRef, useState, Children, createContext, useContext, Component } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import { render } from "react-dom";
import login from "../../Image/login.png";

const useEventListener = (target, type, listener, ...options) => {
    React.useEffect(
        () => {
            const targetIsRef = target.hasOwnProperty("current");
            const currentTarget = targetIsRef ? target.current : target;
            if (currentTarget)
                currentTarget.addEventListener(type, listener, ...options);
            return () => {
                if (currentTarget)
                    currentTarget.removeEventListener(type, listener, ...options);
            };
        },
        [target, type, listener, options]
    );
};

const NewLogin = () => {

    // const signUp = useState('signUp');
    // const signIn = useState('signIn');
    // const container = useState('container');

    const signUp = React.useRef(null);
    const signIn = React.useRef(null);
    const container = React.useRef(null);
    useEventListener(signIn, "click", () => container.current.classList.remove("right-panel-active"));
    useEventListener(signUp, "click", () => container.current.classList.add("right-panel-active"));

    return (
        <div className="login_body">
            <div className="container" id="container" ref={container}>
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" ref={signIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" ref={signUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div classNameName="cont">
        //     <div className="form sign-in">
        //         <h2>Sign In</h2>
        //         <label>
        //             <span>
        //                 Email Address
        //         </span>
        //             <input type="email" name="email"></input>
        //         </label>
        //         <label>
        //             <span>
        //                 Password
        //         </span>
        //             <input type="password" name="password"></input>
        //         </label>
        //         <button className="submit" type="button">Sign In</button>
        //         <p classNameName="forgot-pass">Forgot Password ?</p>


        //     </div>

        //     <div className="sub-cont">
        //         <div className="img">
        //             <div className="img-text m-up">
        //                 <h2>New here?</h2>
        //                 <p>Sign up and discover great amount of new opportunities!</p>
        //             </div>
        //             <div className="img-text m-in">
        //                 <h2>One of us?</h2>
        //                 <p>If you already has an account, just sign in. We've missed you!</p>
        //             </div>
        //             <div className="img-btn">
        //                 <span className="m-up">Sign Up</span>
        //                 <span className="m-in">Sign In</span>
        //             </div>
        //         </div>

        //         <div className="form sign-up">
        //             <h2>Sign Up</h2>
        //             <label>
        //                 <span>
        //                     Name
        //                 </span>
        //                 <input type="text"></input>
        //             </label>
        //             <label>
        //                 <span>
        //                     Email
        //                 </span>
        //                 <input type="text"></input>
        //             </label>
        //             <label>
        //                 <span>
        //                     Password
        //                 </span>
        //                 <input type="text"></input>
        //             </label>
        //             <label>
        //                 <span>
        //                     Confirm Password
        //                 </span>
        //                 <input type="text"></input>
        //             </label>
        //             <button type="button" classNameName="sunmit">Sign Up Now</button>
        //         </div>
        //     </div>
        // </div>
    );
};
export default NewLogin;