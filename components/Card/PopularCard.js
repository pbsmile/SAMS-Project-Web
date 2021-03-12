import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Circle from "../../Image/circle.png";
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
import { Query } from "react-apollo";
import apolloClient from "../../apollo/apolloclient";
import Link from "next/link";

import Chest from "../../Image/chest.jpg";

const QUERY_POSTAUTH = gql`
  query {
    getPopularPosts {
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
        photoHeader
      }
    }
  }
`;

const PopularCard = () => {
  const { data } = useQuery(QUERY_POSTAUTH, {
    pollInterval: 3000,
  });
  console.log(data);
  //console.log(result.data.getPopularPosts.posts)

  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>", toggleFav);

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
    <div className="Main-Page-Card-Div">
      
      {/* <div className="Main-Page-Fixed-Bg">
        <nav className="Main-Page-Card-Nav">
          <p className="Main-Page-Card-Nav-Popular">กิจกรรมยอดนิยม</p>
        </nav>
        <MainPageSlidebar/>
      </div> */}

      <div className="Main-Page-Card-List">
        {data && (
          <>
            {/* {data.getAllPostsByAuthen.posts.map((prod) => (
              <div key={prod._id}>
                <h4>{prod.name}</h4>
              </div>
            ))} */}
            {data.getPopularPosts.posts.map((prod) => (
              <div key={prod._id}>
                <Card className="Main-Page-Card">
                  <div className="Main-Page-Card-Area">
                    <div className="Main-Page-Card-Flex">
                      <div className="Main-Page-Card-Left">
                        <Link
                          key={prod._id}
                          href="/activity/[activityId]"
                          as={`/activity/${prod._id}`}
                        >
                          <img className="Main-Page-Card-Img" src={prod.photoHeader} />
                        </Link>
                        {/* <label className="Main-Page-Card-Status">
                        สถานะกิจกรรม :
                      </label>
                      <label className="Main-Page-Card-Status"> {prod.status} </label> */}
                      </div>
                      <div className="Main-Page-Card-Right">
                        <div className="Main-Page-Card-Date-Time">
                          <label className="Main-Page-Card-Date">
                            {/* <img
                            className="Main-Page-Card-Icon-Size"
                            src={Day}
                          /> */}
                            {dateFormat(prod.dateStart, "dddd d mmmm yyyy")} -{" "}
                            {prod.timeStart} น.
                            {/* <Moment format="D MMM YYYY">
                            {prod.dateStart}
                          </Moment> */}
                          </label>
                          {/* <label className="Main-Page-Card-Time">
                          <img
                            className="Main-Page-Card-Icon-Size"
                            src={Time}
                          />
                          {prod.timeStart} น.
                        </label> */}
                        </div>
                        <label className="Main-Page-Card-Name">
                          {prod.name}
                        </label>

                        <label className="Main-Page-Card-Location">
                          <img
                            className="Main-Page-Card-Icon-Size"
                            src={Location}
                          />

                          {prod.place}
                        </label>
                        {/* <div className="Main-Page-Card-Members-Close">
                        <label className="Main-Page-Card-Members">
                          <img
                            className="Main-Page-Card-Icon-Size"
                            src={Members}
                          />
                           {prod.participantsNumber}
                        </label>
                        <label className="Main-Page-Card-Close">
                          <img
                            className="Main-Page-Card-Icon-Size"
                            src={Closed}
                          />
                          {prod.dateCloseApply}
                        </label>
                      </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <CardActions>
                  <div className="Main-Page-Card-More-Div">
                    <Link
                      key={prod._id}
                      href="/activity/[activityId]"
                      as={`/activity/${prod._id}`}
                    >
                      <button className="Main-Page-Card-More">
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

export default PopularCard;
