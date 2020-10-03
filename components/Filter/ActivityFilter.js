import React from "react";
import Router from "next/router";

const ActivityFilter = () => {
  return (
    <div>
      <div className="Filter-Items-Div">
        <nav className="Filter-Items Filter-Items-Flex">
          <select className="Filter-Years" id="Filter-Years">
            <option value="2561">2561</option>
            <option value="2562">2562</option>
            <option value="2563">2563</option>
          </select>
          <select className="Filter-Departments" id="Filter-Departments">
            <option value="Eng">วิศวกรรมศาสตร์</option>
            <option value="Argo">เกษตร</option>
            <option value="Arch">สถาปัตยกรรมศาสตร์</option>
          </select>
          <select className="Filter-Statuses" id="Filter-Filter-Statuses">
            <option value="Open">เปิดรับสมัคร</option>
            <option value="Close">ปิดรับสมัคร</option>
            <option value="Limites">เต็มจำนวนรับ</option>
            <option value="ComingSoon">เร็วๆนี้</option>
          </select>
        </nav>
      </div>
    </div>
  );
};

export default ActivityFilter;
