import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Circle from "../../Image/circle.png";
import Filter from "../Filter/ActivityFilter";
import Join from "../../Image/add1.png";
import Unjoin from "../../Image/add2.png";
import Fav from "../../Image/heart1.png";
import Unfav from "../../Image/heart2.png";
import Day from "../../Image/date.png";
import Time from "../../Image/clock.png";
import Location from "../../Image/location.png";
import Members from "../../Image/members.png";
import Closed from "../../Image/closed.png";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import Chest from "../../Image/chest.jpg";
import Magnify from "../../Image/filter_magnify.png";
import Title from "../../Image/filter_title.png";
import MainPageSlidebar from "../Slidebar/MainPageSlidebar";
import Moment from "react-moment";
import "moment-timezone";
import { isTypeNode } from "graphql";

const QUERY_POSTAUTH = gql`
  query {
    getAllPostsByAuthen {
      posts {
        _id
        name
        status
        dateStart
        dateEnd
        timeStart
        timeEnd
        place
        participantsNumber
        dateCloseApply
        major
        canJoin
        canFav
        photoHeader
      }
    }
  }
`;

const ActivityCard = () => {
  const [year, setYear] = useState("");

  const { data } = useQuery(QUERY_POSTAUTH, {
    pollInterval: 3000,
    // dateYear = data.getAllPostsByAuthen.posts.dateStart,
    // setYear(dateFormat(dateYear, "yyyy"))
  });
  console.log(data);
  //console.log(result.data.getAllPostsByAuthen.posts)

  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>", toggleFav);

  const [value, setValue] = useState("");
  const [valueYear, setValueYear] = useState("");
  const [valueMajor, setValueMajor] = useState("");
  const [valueStatus, setValueStatus] = useState("");

  console.log(valueYear);
  console.log(valueMajor);
  console.log(valueStatus);

  const dateFormat = require("dateformat");
  dateFormat.i18n = {
    dayNames: [
      "อา.",
      "จ.",
      "อ.",
      "พ.",
      "พฤ.",
      "ศ.",
      "ส.",
      "อา.",
      "จ.",
      "อ.",
      "พ.",
      "พฤ.",
      "ศ.",
      "ส.",
    ],
    monthNames: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
  };

  const handleClickJoin = () => {
    if (toggleJoin == "unjoin") {
      setToggleJoin("join");
    }
    if (toggleJoin == "join") {
      setToggleJoin("unjoin");
    }
  };

  const handleClickFav = () => {
    if (toggleFav == "unfav") {
      setToggleFav("fav");
    }
    if (toggleFav == "fav") {
      setToggleFav("unfav");
    }
  };
  return (
    <div className="Activity-Page-Card-Div">
      <div className="Activity-Page-Fixed-Bg">
        <div className="Activity-Page-Filter-Items-Div">
          <nav className="Activity-Page-Card-Nav">
            <img className="Activity-Page-Card-Title-Img" src={Title} />
            <p className="Activity-Page-Card-Nav-Activity">กิจกรรมทั้งหมด</p>
          </nav>
          <nav className="Activity-Page-Filter-Items Activity-Page-Filter-Items-Flex">
            <select
              className="Activity-Page-Filter-Years"
              id="Activity-Page-Filter-Years"
              onChange={(e) => setValueYear(e.target.value)}
              value={valueYear}
            >
              <option value="">ปีการศึกษา</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
            <select
              className="Activity-Page-Filter-Departments"
              id="Activity-Page-Filter-Departments"
              onChange={(e) => setValueMajor(e.target.value)}
              value={valueMajor}
            >
              <option value="">หน่วยงาน</option>
              <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
              <option value="คณะสถาปัตยกรรมศาสตร์">คณะสถาปัตยกรรมศาสตร์</option>
              <option value="คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี">
                คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี
              </option>
              <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
              <option value="คณะเทคโนโลยีการเกษตร">
                คณะเทคโนโลยีการเกษตร{" "}
              </option>
              <option value="คณะเทคโนโลยีสารสนเทศ">คณะเทคโนโลยีสารสนเทศ</option>
              <option value="คณะการบริหารและการจัดการ">
                คณะการบริหารและการจัดการ
              </option>
              <option value="คณะศิลปศาสตร์">คณะศิลปศาสตร์</option>
              <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
              <option value="วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง">
                วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง
              </option>
              <option value="วิทยาลัยนวัตกรรมการผลิตขั้นสูง">
                วิทยาลัยนวัตกรรมการผลิตขั้นสูง
              </option>
              <option value="วิทยาลัยอุตสาหกรรมการบินนานาชาติ">
                วิทยาลัยอุตสาหกรรมการบินนานาชาติ
              </option>
              <option value="วิทยาลัยวิจัยนวัตกรรมทางการศึกษา">
                วิทยาลัยวิจัยนวัตกรรมทางการศึกษา
              </option>
              <option value="วิทยาลัยวิศวกรรมสังคีต">
                วิทยาลัยวิศวกรรมสังคีต
              </option>
            </select>
            <select
              className="Activity-Page-Filter-Statuses"
              id="Activity-Page-Filter-Activity-Page-Filter-Statuses"
              onChange={(e) => setValueStatus(e.target.value)}
              value={valueStatus}
            >
              <option value="">สถานะโครงการ</option>
              <option value="open">เปิดรับสมัคร</option>
              <option value="closed">ปิดรับสมัคร</option>
              <option value="limit">เต็มจำนวนรับ</option>
            </select>
          </nav>
          <nav className="Activity-Page-Filter-Items-Search Activity-Page-Filter-Items-Flex">
            <input
              className="Activity-Page-Filter-Search-Bar"
              placeholder="ค้นหากิจกรรม"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></input>
            <img className="Activity-Page-Card-Search-Img" src={Magnify} />
          </nav>
        </div>

        {/* <Filter /> */}
      </div>

      <div className="Activity-Page-Card-List">
        {data && (
          <>
            {/* {data.getAllPostsByAuthen.posts.map((prod) => (
              <div key={prod._id}>
                <h4>{prod.name}</h4>
              </div>
            ))} */}
            {data.getAllPostsByAuthen.posts
              .filter((item) => {
                if (!value && !valueMajor && !valueYear && !valueStatus)
                  return true;
                if (
                  item.name.includes(value) &&
                  item.status.includes(valueStatus) &&
                  item.major.includes(valueMajor) &&
                  item.dateStart.includes(valueYear)
                )
                  return true;
              })
              .map((prod) => (
                <div key={prod._id}>
                  <Card className="Activity-Page-Card">
                    <div className="Activity-Page-Card-Area">
                      <div className="Activity-Page-Card-Flex">
                        <div className="Activity-Page-Card-Left">
                          <Link
                            key={prod._id}
                            href="/activity/[activityId]"
                            as={`/activity/${prod._id}`}
                          >
                            <img
                              className="Activity-Page-Card-Img"
                              src={prod.photoHeader}
                            />
                          </Link>
                          {/* <label className="Activity-Page-Card-Status">
                          สถานะกิจกรรม :
                        </label>
                        <label className="Activity-Page-Card-Status"> {prod.status} </label> */}
                        </div>
                        <div className="Activity-Page-Card-Right">
                          <div className="Activity-Page-Card-Date-Time">
                            <label className="Activity-Page-Card-Date">
                              {/* <img
                              className="Activity-Page-Card-Icon-Size"
                              src={Day}
                            /> */}
                              {dateFormat(prod.dateStart, "dddd d mmmm yyyy")} -{" "}
                              {prod.timeStart} น.
                              {/* <Moment format="D MMM YYYY">
                              {prod.dateStart}
                            </Moment> */}
                            </label>
                            {/* <label className="Activity-Page-Card-Time">
                            <img
                              className="Activity-Page-Card-Icon-Size"
                              src={Time}
                            />
                            {prod.timeStart} น.
                          </label> */}
                          </div>
                          <label className="Activity-Page-Card-Name">
                            {prod.name}
                          </label>

                          <label className="Activity-Page-Card-Location">
                            <img
                              className="Activity-Page-Card-Icon-Size"
                              src={Location}
                            />
                            {prod.place}
                          </label>
                          {/* <div className="Activity-Page-Card-Members-Close">
                          <label className="Activity-Page-Card-Members">
                            <img
                              className="Activity-Page-Card-Icon-Size"
                              src={Members}
                            />
                             {prod.participantsNumber}
                          </label>
                          <label className="Activity-Page-Card-Close">
                            <img
                              className="Activity-Page-Card-Icon-Size"
                              src={Closed}
                            />
                            {prod.dateCloseApply}
                          </label>
                        </div> */}
                        </div>
                      </div>
                    </div>
                    {/* <CardActions>
                    <div className="Activity-Page-Card-More-Div">
                      <Link
                        key={prod._id}
                        href="/activity/[activityId]"
                        as={`/activity/${prod._id}`}
                      >
                        <button className="Activity-Page-Card-More">
                          <a>รายละเอียดเพิ่มเติม >></a>
                        </button>
                      </Link>
                    </div>
                  </CardActions> */}
                  </Card>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
