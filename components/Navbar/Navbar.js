import React from "react";
import MenuItems from "./MenuItem";

const navbar = () => {
  console.log("Menu", MenuItems);

  return (
    <div>
      <nav className="Nav-Items Nav-Items-Flex">
        <div className="Nav-Logo-Flex">
          <h1 className="Nav-Logo" href="#">SAMS</h1>
        </div>
        <div className="Nav-Elements-Flex">
          <ul className="Nav-Elements">
            <li>
              <a className="Nav-Home" href="#">
                หน้าแรก
              </a>
            </li>
            <li>
              <a className="Nav-Activities" href="#">
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
