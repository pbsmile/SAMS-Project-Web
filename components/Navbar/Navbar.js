import React, { useEffect, useState } from "react";
import Router from "next/router";
import MenuItems from "./MenuItem";
import User from "../../Image/circle.svg";

const navbar = () => {
  console.log("Menu", MenuItems);
  const [toggle, setToggle] = useState("");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (toggle == "main") {
      console.log("main");
    }
    if (toggle == "activity") {
      console.log("activity");
    }
  }, [toggle, refresh]);

  const handleClick = (toggleType) => {
    if (toggleType == "main") {
      setToggle("main");
    }
    if (toggleType == "activity") {
      setToggle("activity");
    }
  };

  return (
    <div className="Nav-Items-Div">
      <nav className="Nav-Items Nav-Items-Flex">
        <div className="Nav-Logo-Flex">
          <h1 className="Nav-Logo" href="#">
            SAMS
          </h1>
        </div>
        <div className="Nav-Elements-Flex">
          <ul className="Nav-Elements">
            <li>
              <a
                className={toggle == "main" ? "Nav-Home" : "Nav-Home-Trans"}
                onClick={() => handleClick("main")}
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
                onClick={() => handleClick("activity")}
                onClick={() => Router.push("/activity")}
              >
                กิจกรรมทั้งหมด
              </a>
            </li>
          </ul>
        </div>
        <div className="Nav-Profile-Flex">
          <img className="Nav-Profile-Img" src={User} />
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
