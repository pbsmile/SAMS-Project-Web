import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Circle from "../../Image/circle.png";
import Filter from "../Filter/ActivityFilter";

const ActivityCard = () => {
  return (
    <div className="Activity-Page-Card-Div">
      <div className="Activity-Page-Fixed-Bg">
        <nav className="Activity-Page-Card-Nav">
          <p className="Activity-Page-Card-Nav-Popular">กิจกรรมทั้งหมด</p>
        </nav>
        <Filter />
      </div>

      <div className="Activity-Page-Card-List">
        <Card className="Activity-Page-Card">
          <CardActions>
            <div className="Activity-Page-Card-Top-Div">
              <button className="Activity-Page-Card-Join"></button>
              <label className="Activity-Page-Card-Join-Text">เข้าร่วม</label>
              <button className="Activity-Page-Card-Favorite"></button>
              <label className="Activity-Page-Card-Favorite-Text">
                ชื่นชอบ
              </label>
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
                  ชื่อกิจกรรมเต็ม
                </label>
                <div className="Activity-Page-Card-Date-Time">
                  <label className="Activity-Page-Card-Date">วัน</label>
                  <label className="Activity-Page-Card-Time">เวลา</label>
                </div>

                <label className="Activity-Page-Card-Location">สถานที่</label>
                <div className="Activity-Page-Card-Members-Close">
                  <label className="Activity-Page-Card-Members">จำนวนรับ</label>
                  <label className="Activity-Page-Card-Close">ปิดรับ</label>
                </div>
              </div>
            </div>
          </div>
          <CardActions>
            <div className="Activity-Page-Card-More-Div">
              <button className="Activity-Page-Card-More">
                รายละเอียดเพิ่มเติม >>
              </button>
            </div>
          </CardActions>
        </Card>
        <Card className="Activity-Page-Card">
          <CardActions>
            <div className="Activity-Page-Card-Top-Div">
              <button className="Activity-Page-Card-Join"></button>
              <label className="Activity-Page-Card-Join-Text">เข้าร่วม</label>
              <button className="Activity-Page-Card-Favorite"></button>
              <label className="Activity-Page-Card-Favorite-Text">
                ชื่นชอบ
              </label>
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
                  ชื่อกิจกรรมเต็ม
                </label>
                <div className="Activity-Page-Card-Date-Time">
                  <label className="Activity-Page-Card-Date">วัน</label>
                  <label className="Activity-Page-Card-Time">เวลา</label>
                </div>

                <label className="Activity-Page-Card-Location">สถานที่</label>
                <div className="Activity-Page-Card-Members-Close">
                  <label className="Activity-Page-Card-Members">จำนวนรับ</label>
                  <label className="Activity-Page-Card-Close">ปิดรับ</label>
                </div>
              </div>
            </div>
          </div>
          <CardActions>
            <div className="Activity-Page-Card-More-Div">
              <button className="Activity-Page-Card-More">
                รายละเอียดเพิ่มเติม >>
              </button>
            </div>
          </CardActions>
        </Card>
        <Card className="Activity-Page-Card">
          <CardActions>
            <div className="Activity-Page-Card-Top-Div">
              <button className="Activity-Page-Card-Join"></button>
              <label className="Activity-Page-Card-Join-Text">เข้าร่วม</label>
              <button className="Activity-Page-Card-Favorite"></button>
              <label className="Activity-Page-Card-Favorite-Text">
                ชื่นชอบ
              </label>
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
                  ชื่อกิจกรรมเต็ม
                </label>
                <div className="Activity-Page-Card-Date-Time">
                  <label className="Activity-Page-Card-Date">วัน</label>
                  <label className="Activity-Page-Card-Time">เวลา</label>
                </div>

                <label className="Activity-Page-Card-Location">สถานที่</label>
                <div className="Activity-Page-Card-Members-Close">
                  <label className="Activity-Page-Card-Members">จำนวนรับ</label>
                  <label className="Activity-Page-Card-Close">ปิดรับ</label>
                </div>
              </div>
            </div>
          </div>
          <CardActions>
            <div className="Activity-Page-Card-More-Div">
              <button className="Activity-Page-Card-More">
                รายละเอียดเพิ่มเติม >>
              </button>
            </div>
          </CardActions>
        </Card>
        <Card className="Activity-Page-Card">
          <CardActions>
            <div className="Activity-Page-Card-Top-Div">
              <button className="Activity-Page-Card-Join"></button>
              <label className="Activity-Page-Card-Join-Text">เข้าร่วม</label>
              <button className="Activity-Page-Card-Favorite"></button>
              <label className="Activity-Page-Card-Favorite-Text">
                ชื่นชอบ
              </label>
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
                  ชื่อกิจกรรมเต็ม
                </label>
                <div className="Activity-Page-Card-Date-Time">
                  <label className="Activity-Page-Card-Date">วัน</label>
                  <label className="Activity-Page-Card-Time">เวลา</label>
                </div>

                <label className="Activity-Page-Card-Location">สถานที่</label>
                <div className="Activity-Page-Card-Members-Close">
                  <label className="Activity-Page-Card-Members">จำนวนรับ</label>
                  <label className="Activity-Page-Card-Close">ปิดรับ</label>
                </div>
              </div>
            </div>
          </div>
          <CardActions>
            <div className="Activity-Page-Card-More-Div">
              <button className="Activity-Page-Card-More">
                รายละเอียดเพิ่มเติม >>
              </button>
            </div>
          </CardActions>
        </Card>
        <Card className="Activity-Page-Card">
          <CardActions>
            <div className="Activity-Page-Card-Top-Div">
              <button className="Activity-Page-Card-Join"></button>
              <label className="Activity-Page-Card-Join-Text">เข้าร่วม</label>
              <button className="Activity-Page-Card-Favorite"></button>
              <label className="Activity-Page-Card-Favorite-Text">
                ชื่นชอบ
              </label>
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
                  ชื่อกิจกรรมเต็ม
                </label>
                <div className="Activity-Page-Card-Date-Time">
                  <label className="Activity-Page-Card-Date">วัน</label>
                  <label className="Activity-Page-Card-Time">เวลา</label>
                </div>

                <label className="Activity-Page-Card-Location">สถานที่</label>
                <div className="Activity-Page-Card-Members-Close">
                  <label className="Activity-Page-Card-Members">จำนวนรับ</label>
                  <label className="Activity-Page-Card-Close">ปิดรับ</label>
                </div>
              </div>
            </div>
          </div>
          <CardActions>
            <div className="Activity-Page-Card-More-Div">
              <button className="Activity-Page-Card-More">
                รายละเอียดเพิ่มเติม >>
              </button>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default ActivityCard;
