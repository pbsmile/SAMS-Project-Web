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
import { useRouter } from "next/router";
import gql from "graphql-tag";

const QUERY_ACTIVITY = gql`
  query QUERY_ACTIVITY( $postId : String! ) {
    getOnePost(input: { postId: $postId }) {
      name
      dateStart
      dateEnd
      description
    }
  }
`;

const ActivityInfo = () => {
  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>", toggleFav);

  const route = useRouter();
  console.log(route);

  const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
    variables: { postId: route.query.activityId },
  });

  console.log(data);

  if (error) return <p>Something went wrong, please try again.</p>;

  if (loading) return <p>Loading ...</p>;

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

      <div className="Activity-Page-Card-List">
        <Card className="Activity-Page-Card">
          <CardActions>
            <div className="Activity-Page-Card-Top-Div">
              {/* <button className="Activity-Page-Card-Join"></button> */}
              <div className="Activity-Page-Card-Box">
                <img
                  className="Activity-Page-Card-Join"
                  src={toggleJoin == "unjoin" ? Unjoin : Join}
                  onClick={() => handleClickJoin()}
                ></img>
                <label
                  className="Activity-Page-Card-Join-Text"
                  onClick={() => handleClickJoin()}
                >
                  {toggleJoin == "unjoin" ? "เข้าร่วม" : "ยกเลิก"}
                </label>
              </div>

              {/* <button className="Activity-Page-Card-Favorite"></button> */}
              <div className="Activity-Page-Card-Box">
                <img
                  className="Activity-Page-Card-Join"
                  src={toggleFav == "unfav" ? Unfav : Fav}
                  onClick={() => handleClickFav()}
                ></img>
                <label
                  className="Activity-Page-Card-Favorite-Text"
                  onClick={() => handleClickFav()}
                >
                  {toggleFav == "unfav" ? "ชื่นชอบ" : "เลิกชอบ"}
                </label>
              </div>
            </div>
          </CardActions>
          <div className="Activity-Page-Card-Area">
            <div className="Activity-Page-Card-Flex">
              <div className="Activity-Page-Card-Left">
                <img className="Activity-Page-Card-Img" src={Circle} />
                <label className="Activity-Page-Card-Status">
                  สถานะกิจกรรม :
                </label>
                <label className="Activity-Page-Card-Status">ปิด</label>
              </div>
              <div className="Activity-Page-Card-Right">
                <label className="Activity-Page-Card-Name">
                  {data.getOnePost.name}
                </label>
                <div className="Activity-Page-Card-Date-Time">
                  <label className="Activity-Page-Card-Date">
                    <img className="Activity-Page-Card-Icon-Size" src={Day} />
                  </label>
                  <label className="Activity-Page-Card-Time">
                    <img className="Activity-Page-Card-Icon-Size" src={Time} />
                  </label>
                </div>

                <label className="Activity-Page-Card-Location">
                  <img
                    className="Activity-Page-Card-Icon-Size"
                    src={Location}
                  />
                </label>
                <div className="Activity-Page-Card-Members-Close">
                  <label className="Activity-Page-Card-Members">
                    <img
                      className="Activity-Page-Card-Icon-Size"
                      src={Members}
                    />
                  </label>
                  <label className="Activity-Page-Card-Close">
                    <img
                      className="Activity-Page-Card-Icon-Size"
                      src={Closed}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivityInfo;