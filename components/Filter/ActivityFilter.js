import React from "react";
import Router from "next/router";

const ActivityFilter = () => {
  return (
    <div>
      <div className="Filter-Items-Div">
        <nav className="Filter-Items Filter-Items-Flex">
          <select className="Filter-Years" id="Filter-Years">
            <option value="0000">ปีการศึกษา</option>
            <option value="2561">2561</option>
            <option value="2562">2562</option>
            <option value="2563">2563</option>
          </select>
          <select className="Filter-Departments" id="Filter-Departments">
            <option value="0">เลือกคณะ/วิทยาลัย</option>
            <option value="1">คณะวิศวกรรมศาสตร์</option>
            <option value="2">คณะสถาปัตยกรรมศาสตร</option>
            <option value="3">คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี</option>
            <option value="4">คณะวิทยาศาสตร์</option>
            <option value="5">คณะเทคโนโลยีการเกษตร </option>
            <option value="6">คณะเทคโนโลยีสารสนเทศ</option>
            <option value="7">คณะการบริหารและการจัดการ</option>
            <option value="8">คณะศิลปศาสตร์</option>
            <option value="9">คณะแพทยศาสตร์</option>
            <option value="10">
              วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง
            </option>
            <option value="11">วิทยาลัยนวัตกรรมการผลิตขั้นสูง</option>
            <option value="12">วิทยาลัยอุตสาหกรรมการบินนานาชาติ</option>
            <option value="13">วิทยาลัยวิจัยนวัตกรรมทางการศึกษา</option>
            <option value="14">วิทยาลัยวิศวกรรมสังคีต</option>
          </select>
          <select className="Filter-Statuses" id="Filter-Filter-Statuses">
            <option value="Status">สถานะโครงการ</option>
            <option value="Open">เปิดรับสมัคร</option>
            <option value="Close">ปิดรับสมัคร</option>
            <option value="Limites">เต็มจำนวนรับ</option>
          </select>
        </nav>
      </div>
    </div>
  );
};

export default ActivityFilter;
