import React, { useEffect, useState, useContext} from "react";
import { useMutation } from "@apollo/react-hooks";
import { onError } from "@apollo/client/link/error";
import gql from "graphql-tag";
import Cookies from "js-cookie"
import Router from "next/router"
import { AuthContext } from "../../appState/AuthProvider"

const LOG_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input:{email: $email, password: $password}) {
      accessToken
    }
  }
`;

const login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const {setAuthUser} = useContext(AuthContext)

  const [login, { loading, error }] = useMutation(LOG_IN, {
    variables: { ...userInfo },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        setAuthUser(data.login.accessToken)
        Cookies.set('jwt',data.login.accessToken) // เอา cookies ไปใส่ใน headers apolloclients
        console.log(data);
        setUserInfo({
          email: "",
          password: "",
        })
        Router.push('/main')
      }
    },
  });

  const handleChange = (e) => {
    //console.log(e.target.value);
    setUserInfo({
      ...userInfo, //copy ค่าจากที่เราพิมพ์เข้าไป
      [e.target.name]: e.target.value,
    });
  };

  console.log(userInfo);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await login();
    } catch (error) {
      console.log("err1",error);
    }
  };

  return (
    <div className="login_user_card">
      <div className="d-flex justify-content-center login_form_container">
        <div className="d-flex justify-content-center login_header">
          <h3>LOGIN</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login_input mb-3">
            <label htmlFor="username">USERNAME</label>
            <input
              type="email"
              name="email"
              className="login_input-user-pass"
              placeholder="username"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login_input mb-3">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              name="password"
              className="login_input-user-pass"
              placeholder="password"
              value={userInfo.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login_form-group">
            <div className="login_custom-control login_custom-checkbox">
              <input type="checkbox" className="login_custom-control-input" />
              <label className="login_custom-control-label">Remember me</label>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <button type="submit" name="button" className="btn login_btn">
                Login
              </button>
            </div>

            <div className="d-flex justify-content-center login_links">
              Don't have an account?{" "}
              <a href="#" className="login_register">
                Register
              </a>
            </div>

            <div className="d-flex justify-content-center login_links">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
