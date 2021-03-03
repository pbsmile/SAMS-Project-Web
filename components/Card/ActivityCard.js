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
import MainPageSlidebar from "../Slidebar/MainPageSlidebar";
import Moment from "react-moment";
import "moment-timezone";

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
        canJoin
        canFav
      }
    }
  }
`;

const ActivityCard = () => {
  const { data } = useQuery(QUERY_POSTAUTH, {
    pollInterval: 3000,
  });
  console.log(data);
  //console.log(result.data.getAllPostsByAuthen.posts)

  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>", toggleFav);

  const [value, setValue] = useState();
  const [valueYear, setValueYear] = useState();
  const [valueMajor, setValueMajor] = useState();
  const [valueStatus, setValueStatus] = useState();

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
        <nav className="Activity-Page-Card-Nav">
          <p className="Activity-Page-Card-Nav-Popular">กิจกรรมทั้งหมด</p>
        </nav>
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
            <input
              className="Filter-Search-Bar"
              placeholder="ค้นหากิจกรรม"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></input>
          </div>
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
                if (!value) return true;
                if (
                  item._id.includes(value) ||
                  (item.name.includes(value))
                ) {
                  return true;
                }
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
                              src={Chest}
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
