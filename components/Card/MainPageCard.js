import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Circle from "../../Image/circle.png";
import Join from "../../Image/add1.png"
import Unjoin from "../../Image/add2.png"
import Fav from "../../Image/heart1.png"
import Unfav from "../../Image/heart2.png"

const MainPageCard = () => {
  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>",toggleJoin)
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>",toggleFav)

  const handleClickJoin = () => {
    if (toggleJoin == "unjoin") {
      setToggleJoin("join")
    }
    if (toggleJoin == "join") {
      setToggleJoin("unjoin")
    }
  };

  const handleClickFav = () => {
    if (toggleFav == "unfav") {
      setToggleFav("fav")
    }
    if (toggleFav == "fav") {
      setToggleFav("unfav")
    }
  };

  return (
    <div className="Main-Page-Card-Div">
      <nav className="Main-Page-Card-Nav">
        <h1 className="Main-Page-Card-Nav-Popular">กิจกรรมยอดนิยม</h1>
      </nav>
      <div className="Main-Page-Card-Slider">
        <Card className="Main-Page-Card">
          <CardActions>
            <div className="Main-Page-Card-Top-Div">
              {/* <button className="Main-Page-Card-Join"></button> */}
              <img className="Main-Page-Card-Join" src={toggleJoin == "unjoin" ? Unjoin : Join} onClick={() => handleClickJoin()}></img>
              <label className="Main-Page-Card-Join-Text">เข้าร่วม</label>
              {/* <button className="Main-Page-Card-Favorite"></button> */}
              <img className="Main-Page-Card-Join" src={toggleFav == "unfav" ? Unfav : Fav} onClick={() => handleClickFav()}></img>
              <label className="Main-Page-Card-Favorite-Text">ชื่นชอบ</label>
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
                  <label className="Main-Page-Card-Name">ชื่อกิจกรรมเต็ม</label>
                  <div className="Main-Page-Card-Date-Time">
                    <label className="Main-Page-Card-Date">วัน</label>
                    <label className="Main-Page-Card-Time">เวลา</label>
                  </div>

                  <label className="Main-Page-Card-Location">สถานที่</label>
                  <div className="Main-Page-Card-Members-Close">
                    <label className="Main-Page-Card-Members">จำนวนรับ</label>
                    <label className="Main-Page-Card-Close">ปิดรับ</label>
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
        <Card className="Main-Page-Card">
          <CardActions>
            <div className="Main-Page-Card-Top-Div">
              {/* <button className="Main-Page-Card-Join"></button> */}
              <img className="Main-Page-Card-Join" src={toggleJoin == "unjoin" ? Unjoin : Join} onClick={() => handleClickJoin()}></img>
              <label className="Main-Page-Card-Join-Text">เข้าร่วม</label>
              {/* <button className="Main-Page-Card-Favorite"></button> */}
              <img className="Main-Page-Card-Join" src={toggleFav == "unfav" ? Unfav : Fav} onClick={() => handleClickFav()}></img>
              <label className="Main-Page-Card-Favorite-Text">ชื่นชอบ</label>
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
                  <label className="Main-Page-Card-Name">ชื่อกิจกรรมเต็ม</label>
                  <div className="Main-Page-Card-Date-Time">
                    <label className="Main-Page-Card-Date">วัน</label>
                    <label className="Main-Page-Card-Time">เวลา</label>
                  </div>

                  <label className="Main-Page-Card-Location">สถานที่</label>
                  <div className="Main-Page-Card-Members-Close">
                    <label className="Main-Page-Card-Members">จำนวนรับ</label>
                    <label className="Main-Page-Card-Close">ปิดรับ</label>
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
    </div>
  );
};

export default MainPageCard;
