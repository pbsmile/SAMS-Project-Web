import React from "react";
import MenuItems from "./MenuItem";

const navbar = () => {
  console.log("Menu",MenuItems)
  console.log("Menu C Name",MenuItems.cName)
  return (
    <div>
      <nav className="Nav-Items">
        <h1 className="Nav-Logo">
          SAMS<i className="fas fa-people-carry"></i>
        </h1>
        <div className="Nav-MenuIcon"></div>
        <ul>
          {/* {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={MenuItems.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })} */}
        </ul>
      </nav>
    </div>
  );
};

export default navbar;
