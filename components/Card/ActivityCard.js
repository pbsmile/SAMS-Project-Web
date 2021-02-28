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

  const dateFormat = require("dateformat");
  dateFormat.i18n = {
    dayNames: [
      "วันอาทิตย์",
      "วันจันทร์",
      "วันอังคาร",
      "วันพุธ",
      "วันพฤหัสบดี",
      "วันศุกร์",
      "วันเสาร์",
      "วันอาทิตย์",
      "วันจันทร์",
      "วันอังคาร",
      "วันพุธ",
      "วันพฤหัสบดี",
      "วันศุกร์",
      "วันเสาร์",
    ],
    monthNames: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
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
        <Filter />
      </div>

      <div className="Activity-Page-Card-List">
      {data && (
          <>
            {/* {data.getAllPostsByAuthen.posts.map((prod) => (
              <div key={prod._id}>
                <h4>{prod.name}</h4>
              </div>
            ))} */}
            {data.getAllPostsByAuthen.posts.map((prod) => (
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
                          <img className="Activity-Page-Card-Img" src={Chest} />
                        </Link>
                        {/* <label className="Activity-Page-Card-Status">
                          สถานะกิจกรรม :
                        </label>
                        <label className="Activity-Page-Card-Status"> {prod.status} </label> */}
                      </div>
                      <div className="Activity-Page-Card-Right">
                        <label className="Activity-Page-Card-Name">
                          {prod.name}
                        </label>
                        <div className="Activity-Page-Card-Date-Time">
                          <label className="Activity-Page-Card-Date">
                            <img
                              className="Activity-Page-Card-Icon-Size"
                              src={Day}
                            />
                            {dateFormat(prod.dateStart, "d mmmm yyyy")}
                            {/* <Moment format="D MMM YYYY">
                              {prod.dateStart}
                            </Moment> */}
                          </label>
                          <label className="Activity-Page-Card-Time">
                            <img
                              className="Activity-Page-Card-Icon-Size"
                              src={Time}
                            />
                            {prod.timeStart} น.
                          </label>
                        </div>

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
