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
import Link from "next/link"

const QUERY_POSTAUTH = gql`
  query {
    getAllPostsByAuthen {
      posts {
        _id
        name
        canJoin
        canFav
      }
    }
  }
`;

const MainPageCard = () => {
  const { data } = useQuery(QUERY_POSTAUTH, {
    pollInterval: 3000
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
    <div className="Main-Page-Card-Div">
      <div className="Main-Page-Fixed-Bg">
        <nav className="Main-Page-Card-Nav">
          <p className="Main-Page-Card-Nav-Popular">กิจกรรมยอดนิยม</p>
        </nav>
        <div className="Main-Page-Card-List">
          {data && (
            <>
              {/* {data.getAllPostsByAuthen.posts.map((prod) => (
              <div key={prod._id}>
                <h4>{prod.name}</h4>
              </div>
            ))} */}
              {data.getAllPostsByAuthen.posts.map((prod) => (
                <div key={prod._id}>
                  <Card className="Main-Page-Card">
                    <CardActions>
                      <div className="Main-Page-Card-Top-Div">
                        {/* <button className="Main-Page-Card-Join"></button> */}
                        <div className="Main-Page-Card-Box">
                          <img
                            className="Main-Page-Card-Join"
                            src={toggleJoin == "unjoin" ? Unjoin : Join}
                            onClick={() => handleClickJoin()}
                          ></img>
                          <label
                            className="Main-Page-Card-Join-Text"
                            onClick={() => handleClickJoin()}
                          >
                            {toggleJoin == "unjoin" ? "เข้าร่วม" : "ยกเลิก"}
                          </label>
                        </div>

                        {/* <button className="Main-Page-Card-Favorite"></button> */}
                        <div className="Main-Page-Card-Box">
                          <img
                            className="Main-Page-Card-Join"
                            src={toggleFav == "unfav" ? Unfav : Fav}
                            onClick={() => handleClickFav()}
                          ></img>
                          <label
                            className="Main-Page-Card-Favorite-Text"
                            onClick={() => handleClickFav()}
                          >
                            {toggleFav == "unfav" ? "ชื่นชอบ" : "เลิกชอบ"}
                          </label>
                        </div>
                      </div>
                    </CardActions>
                    <div className="Main-Page-Card-Area">
                      <div className="Main-Page-Card-Flex">
                        <div className="Main-Page-Card-Left">
                          <img className="Main-Page-Card-Img" src={Circle} />
                          <label className="Main-Page-Card-Status">
                            สถานะกิจกรรม :
                          </label>
                          <label className="Main-Page-Card-Status">ปิด</label>
                        </div>
                        <div className="Main-Page-Card-Right">
                          <label className="Main-Page-Card-Name">
                            {prod.name}
                          </label>
                          <div className="Main-Page-Card-Date-Time">
                            <label className="Main-Page-Card-Date">
                              <img
                                className="Main-Page-Card-Icon-Size"
                                src={Day}
                              />
                            </label>
                            <label className="Main-Page-Card-Time">
                              <img
                                className="Main-Page-Card-Icon-Size"
                                src={Time}
                              />
                            </label>
                          </div>

                          <label className="Main-Page-Card-Location">
                            <img
                              className="Main-Page-Card-Icon-Size"
                              src={Location}
                            />
                          </label>
                          <div className="Main-Page-Card-Members-Close">
                            <label className="Main-Page-Card-Members">
                              <img
                                className="Main-Page-Card-Icon-Size"
                                src={Members}
                              />
                            </label>
                            <label className="Main-Page-Card-Close">
                              <img
                                className="Main-Page-Card-Icon-Size"
                                src={Closed}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardActions>
                      <div className="Main-Page-Card-More-Div">
                        <button className="Main-Page-Card-More">
                          รายละเอียดเพิ่มเติม >>
                        </button>
                      </div>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPageCard;
