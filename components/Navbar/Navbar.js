import React from "react";
import MenuItems from "./MenuItem";

const navbar = () => {
  console.log("Menu", MenuItems);
  
  return (
    <div>
      <nav className="Nav-Items">
        <h1 className="Nav-Logo">
          SAMS<i className="fas fa-people-carry"></i>
        </h1>
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
      </nav>
    </div>
  );
};

export default navbar;
