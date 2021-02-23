import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Router from "next/router";
import MenuItems from "./MenuItem";
import User from "../../Image/user.png";
import Logo from "../../Image/logo.png";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { usePath } from "hookrouter";
import { AuthContext } from "../../appState/AuthProvider";

export const QUERY_USERPROFILE = gql`
  query {
    getOneUser {
      name
      studentId
      major
    }
  }
`;

const navbar = () => {
  //console.log("Menu", MenuItems);
  const [toggle, setToggle] = useState("");
  const [refresh, setRefresh] = useState(false);

  const path = usePath();

  const { user, signout } = useContext(AuthContext);
  console.log(user);

  // const { data, loading, error } = useQuery(QUERY_USERPROFILE)
  // if (error) return <p>Ooobs...something went wrong, please try again later.</p>
  // if (loading) return <p>Loading...</p>
  // console.log(data.getOneUser)

  //useEffect(() => {
  //   if (toggle == "main") {
  //     console.log("main");
  //   }
  //   if (toggle == "activity") {
  //     console.log("activity");
  //   }

  //   if (path == '/main') {
  //     setToggle("main");
  //   }
  //   if (path == '/activity') {
  //     setToggle("activity");
  //   }
  // }, [toggle, refresh, path]);

  // const handleClick = (toggleType) => {
  //   if (toggleType == "main") {
  //     Router.push("/main")
  //   }
  //   if (toggleType == "activity") {
  //     Router.push("/activity")
  //   }
  // };

  console.log("toggle nav", toggle);

  return (
    <div className="Nav-Items-Div">
      <nav className="Nav-Items Nav-Items-Flex">
        <div className="Nav-Logo-Flex">
          <img
            className="Nav-Logo-Img"
            src={Logo}
            onClick={() => Router.push("/main")}
          />
          <h1
            className="Nav-Logo"
            href="#"
            onClick={() => Router.push("/main")}
          >
            กิจกรรมนักศึกษา
          </h1>
        </div>
        <div className="Nav-Elements-Flex">
          <ul className="Nav-Elements">
            <li>
              <a
                className={toggle == "main" ? "Nav-Home" : "Nav-Home-Trans"}
                //onClick={() => handleClick("main")}
                onClick={() => Router.push("/main")}
              >
                หน้าแรก
              </a>
            </li>
            <li>
              <a
                className={
                  toggle == "activity"
                    ? "Nav-Activities"
                    : "Nav-Activities-Trans"
                }
                //onClick={() => handleClick("activity")}
                onClick={() => Router.push("/activity")}
              >
                กิจกรรมทั้งหมด
              </a>
            </li>
            {user && (
              <>
                <li>
                  <a
                    className={
                      toggle == "create"
                        ? "Nav-Activities"
                        : "Nav-Activities-Trans"
                    }
                    //onClick={() => handleClick("activity")}
                    onClick={() => Router.push("/post")}
                  >
                    สร้างกิจกรรม
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        {user && (
          <>
            <div className="Nav-Profile-Flex">
              <img
                className="Nav-Profile-Img"
                src={User}
                //onClick={() => handleClick("")}
                onClick={() => Router.push("/profile")}
              />
              <div className="Nav-Profile-Flex-Text">
                <label className="Nav-Profile-Username">{user.studentId}</label>
                <label className="Nav-Profile-Logout" onClick={signout}>
                  LOGOUT
                </label>
              </div>
            </div>
          </>
        )}
        {!user && (
          <>
            <div className="Nav-Profile-Flex">
              <div className="Nav-Profile-Flex-Text">
                <label
                  className="Nav-Profile-Logout"
                  onClick={() => Router.push("/login")}
                >
                  LOGIN
                </label>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default navbar;
