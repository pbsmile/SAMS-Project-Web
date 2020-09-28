import React, { useEffect, useState } from "react";
import Router from 'next/router'
import MenuItems from "./MenuItem";

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
    <div>
      <nav 
      className="Nav-Items Nav-Items-Flex">
        <div className="Nav-Logo-Flex">
          <h1 className="Nav-Logo" href="#">SAMS</h1>
        </div>
        <div className="Nav-Elements-Flex">
          <ul className="Nav-Elements">
            <li>
              <a 
              className={
                toggle == "main"
                  ? "Nav-Home"
                  : "Nav-Home-Trans"
              }
              onClick={() => handleClick("main")}
              onClick={() => Router.push('/main')}
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
              onClick={() => Router.push('/activity')} >
                กิจกรรมทั้งหมด
              </a>
            </li>
            <div className="Nav-MenuIcon"></div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
