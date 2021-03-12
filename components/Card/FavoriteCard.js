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

const QUERY_MYFAV = gql`
  query {
    getOneUser {
      name
      favs {
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
        photoHeader
      }
    }
  }
`;

const FavoriteCard = () => {
  const { data } = useQuery(QUERY_MYFAV, {
    pollInterval: 3000,
  });
  console.log(data);
  //console.log(result.data.getAllPostsByAuthen.posts)

  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>", toggleFav);

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
    <div className="My-Fav-Page-Card-Div">
      {/* <div className="My-Fav-Page-Fixed-Bg">
        <nav className="My-Fav-Page-Card-Nav">
          <p className="My-Fav-Page-Card-Nav-Popular">ชื่นชอบ</p>
        </nav>
      </div> */}
      <div className="My-Fav-Page-Card-List">
        {data && (
          <>
            {/* {data.getAllPostsByAuthen.posts.map((prod) => (
              <div key={prod._id}>
                <h4>{prod.name}</h4>
              </div>
            ))} */}
            {data.getOneUser.favs.map((prod) => (
              <div key={prod._id}>
                <Card className="My-Fav-Page-Card">
                  <div className="My-Fav-Page-Card-Area">
                    <div className="My-Fav-Page-Card-Flex">
                      <div className="My-Fav-Page-Card-Left">
                        <Link
                          key={prod._id}
                          href="/activity/[activityId]"
                          as={`/activity/${prod._id}`}
                        >
                          <img className="My-Fav-Page-Card-Img" src={prod.photoHeader} />
                        </Link>
                        {/* <label className="My-Fav-Page-Card-Status">
                          สถานะกิจกรรม :
                        </label>
                        <label className="My-Fav-Page-Card-Status"> {prod.status} </label> */}
                      </div>
                      <div className="My-Fav-Page-Card-Right">
                        <div className="My-Fav-Page-Card-Date-Time">
                          <label className="My-Fav-Page-Card-Date">
                            {/* <img
                              className="My-Fav-Page-Card-Icon-Size"
                              src={Day}
                            /> */}
                            {dateFormat(prod.dateStart, "dddd d mmmm yyyy")} - {prod.timeStart} น.
                            {/* <Moment format="D MMM YYYY">
                              {prod.dateStart}
                            </Moment> */}
                          </label>
                          {/* <label className="My-Fav-Page-Card-Time">
                            <img
                              className="My-Fav-Page-Card-Icon-Size"
                              src={Time}
                            />
                            {prod.timeStart} น.
                          </label> */}
                        </div>

                        <label className="My-Fav-Page-Card-Name">
                          {prod.name}
                        </label>

                        <label className="My-Fav-Page-Card-Location">
                          <img
                            className="My-Fav-Page-Card-Icon-Size"
                            src={Location}
                          />
                          {prod.place}
                        </label>
                        {/* <div className="My-Fav-Page-Card-Members-Close">
                          <label className="My-Fav-Page-Card-Members">
                            <img
                              className="My-Fav-Page-Card-Icon-Size"
                              src={Members}
                            />
                             {prod.participantsNumber}
                          </label>
                          <label className="My-Fav-Page-Card-Close">
                            <img
                              className="My-Fav-Page-Card-Icon-Size"
                              src={Closed}
                            />
                            {prod.dateCloseApply}
                          </label>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <CardActions>
                    <div className="My-Fav-Page-Card-More-Div">
                      <Link
                        key={prod._id}
                        href="/activity/[activityId]"
                        as={`/activity/${prod._id}`}
                      >
                        <button className="My-Fav-Page-Card-More">
                          <a>รายละเอียดเพิ่มเติม >></a>
                        </button>
                      </Link>
                    </div>
                  </CardActions> */}
                </Card>
              </div>
            )).reverse()}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteCard;
