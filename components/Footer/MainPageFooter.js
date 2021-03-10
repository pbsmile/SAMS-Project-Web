import React, { useEffect, useState, useContext } from "react";

const MainPageFooter = () => {
  return (
    <div className="Main-Page-Footer-Div">
      <div className="Main-Page-Footer-Div-Title">
        กิจกรรมนักศึกษา
        <br />
      </div>

      <div className="Main-Page-Footer-Div-Text">
        โทร : 012-3456789 ต่อ 123
        <br />
        อีเมล : student.actv@kmitl.ac.th
        <br />
        Facebook : Kmitl Student Events
        <br />
      </div>
    </div>
  );
};

export default MainPageFooter;
