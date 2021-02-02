import React, { useEffect, useState } from "react";
import ProfileCard from "../Card/ProfileCard";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MyPostCard from "../Card/MyPostCard";
import FavoriteCard from "../Card/FavoriteCard";
import HistoryCard from "../Card/HistoryCard";
import MainPageCard from '../Card/MainPageCard'
import PopularCard from '../Card/PopularCard'
import ClosingCard from '../Card/ClosingCard'
import NearingCard from '../Card/NearingCard'

const MainToggle = () => {
  const [toggle, setToggle] = useState("popularpost");
  const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   if (toggle == "mypost") {
  //     console.log("MyPost");
  //   }
  //   if (toggle == "favorite") {
  //     console.log("MyFav");
  //   }
  //   if (toggle == "history") {
  //     console.log("MyHist");
  //   }
  //   setToggle(toggle);

  //   if (refresh == true) {
  //     console.log("Refresh");
  //   }
  // }, [toggle, refresh]);

  const handleClick = (toggleType) => {
    if (toggleType == "popularpost") {
      setToggle("popularpost");
    }
    if (toggleType == "closingpost") {
      setToggle("closingpost");
    }
    if (toggleType == "nearingpost") {
      setToggle("nearingpost");
    }
  };

  return (
    <div className="Profile-Toggle-Div Profile-Toggle-Button-List">
      <nav className="Profile-Toggle-Button-Menu active">
        {/* <ProfileCard /> */}
        <ul className="Profile-Toggle-Button-Items">
          <label
            className={
              toggle == "popularpost"
                ? "Profile-Toggle-Button-MyPost"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("popularpost")}
          >
            กิจกรรมยอดนิยม
          </label>
          <label
            className={
              toggle == "closingpost"
                ? "Profile-Toggle-Button-MyPost"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("closingpost")}
          >
            ใกล้ปิดรับสมัคร
          </label>
          <label
            className={
              toggle == "nearingpost"
                ? "Profile-Toggle-Button-Favorite"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("nearingpost")}
          >
            จัดขึ้นเร็วๆ นี้
          </label>
        </ul>
      </nav>
      <div className="Profile-Toggle-List">
        {
          toggle == "popularpost" && (
            <nav className="Profile-Toggle-Nav">
              {/* <p className="Profile-Toggle-Nav-Mypost">โพสต์ของฉัน</p> */}
              <MainPageCard />
            </nav>
          )

          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "closingpost" && (
            <nav className="Profile-Toggle-Nav">
              {/* <p className="Profile-Toggle-Nav-Mypost">โพสต์ของฉัน</p> */}
              <MainPageCard />
            </nav>
          )

          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "nearingpost" && (
            <nav className="Profile-Toggle-Nav">
              {/* <p className="Profile-Toggle-Nav-Favorite">ชื่นชอบ</p> */}
              <MainPageCard />
            </nav>
          )
          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "history" && (
            <nav className="Profile-Toggle-Nav">
              {/* <p className="Profile-Toggle-Nav-History">ประวัติ</p> */}
              <HistoryCard />
            </nav>
          )
          //   orderHistory.map((item, index) => (
          //     <CardHistory item={item} key={index} />
          //   ))
        }
      </div>
    </div>
  );
};

export default MainToggle;
