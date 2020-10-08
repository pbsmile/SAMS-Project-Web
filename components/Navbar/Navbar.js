import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Router from "next/router";
import MenuItems from "./MenuItem";
import User from "../../Image/user.png";
import Logo from "../../Image/logo.png";

import { usePath } from "hookrouter";

const navbar = () => {
  //console.log("Menu", MenuItems);
  const [toggle, setToggle] = useState("");
  const [refresh, setRefresh] = useState(false);

  const path = usePath();

  useEffect(() => {
    if (toggle == "main") {
      console.log("main");
    }
    if (toggle == "activity") {
      console.log("activity");
    }

    // if (path == '/main') {
    //   setToggle("main");
    // }
    // if (path == '/activity') {
    //   setToggle("activity");
    // }
  }, [toggle, refresh, path]);

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
          </ul>
        </div>
        <div className="Nav-Profile-Flex">
          <img
            className="Nav-Profile-Img"
            src={User}
            //onClick={() => handleClick("")}
            onClick={() => Router.push("/profile")}
          />
          <div className="Nav-Profile-Flex-Text">
            <label className="Nav-Profile-Username">60010549</label>
            <label className="Nav-Profile-Logout">LOGOUT</label>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
