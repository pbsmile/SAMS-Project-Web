import React, { useEffect, useState } from "react";
import ProfileCard from "../Card/ProfileCard";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MyPostCard from "../Card/MyPostCard";
import FavoriteCard from "../Card/FavoriteCard";
import HistoryCard from "../Card/HistoryCard";
import MainPageCard from "../Card/MainPageCard";
import PopularCard from "../Card/PopularCard";
import ClosingCard from "../Card/ClosingCard";
import NearingCard from "../Card/NearingCard";

import PopularPNG from "../../Image/main_popular.png";
import ClosingPNG from "../../Image/main_closing.png";
import NearingPNG from "../../Image/main_nearing.png";

const MainToggle = () => {
  const [toggle, setToggle] = useState("popularpost");
  const [refresh, setRefresh] = useState(false);
  console.log("maintoggle", toggle);

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
    <div className="Main-Toggle-Div Main-Toggle-Button-List">
      <nav className="Main-Toggle-Button-Menu active">
        {/* <ProfileCard /> */}
        <ul className="Main-Toggle-Button-Items">
          <label
            className={
              toggle == "popularpost"
                ? "Main-Toggle-Button-Popular"
                : "Main-Toggle-Button-Trans"
            }
            onClick={() => handleClick("popularpost")}
          >
            <div className="Profile-Toggle-Button-Items-Flex">
              <div>
                <img
                  className={
                    toggle == "popularpost"
                      ? "Main-Toggle-Button-Popular-Img"
                      : "Main-Toggle-Button-Img-Trans"
                  }
                  src={PopularPNG}
                ></img>
              </div>
              <div>กิจกรรมยอดนิยม</div>
            </div>
          </label>
          <label
            className={
              toggle == "closingpost"
                ? "Main-Toggle-Button-Closing"
                : "Main-Toggle-Button-Trans"
            }
            onClick={() => handleClick("closingpost")}
          >
            <div className="Main-Toggle-Button-Items-Flex">
              <div>
                <img
                  className={
                    toggle == "closingpost"
                      ? "Main-Toggle-Button-Closing-Img"
                      : "Main-Toggle-Button-Img-Trans"
                  }
                  src={ClosingPNG}
                ></img>
              </div>
              <div>ใกล้ปิดรับสมัคร</div>
            </div>
          </label>
          <label
            className={
              toggle == "nearingpost"
                ? "Main-Toggle-Button-Nearing"
                : "Main-Toggle-Button-Trans"
            }
            onClick={() => handleClick("nearingpost")}
          >
            <div className="Profile-Toggle-Button-Items-Flex">
              <div>
                <img
                  className={
                    toggle == "nearingpost"
                      ? "Main-Toggle-Button-Nearing-Img"
                      : "Main-Toggle-Button-Img-Trans"
                  }
                  src={NearingPNG}
                ></img>
              </div>
              <div>จัดขึ้นเร็วๆ นี้</div>
            </div>
          </label>
        </ul>
      </nav>
      <div className="Main-Toggle-List">
        {
          toggle == "popularpost" && (
            <nav className="Main-Toggle-Nav">
              {/* <p className="Main-Toggle-Nav-Mypost">โพสต์ของฉัน</p> */}
              <PopularCard />
            </nav>
          )

          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "closingpost" && (
            <nav className="Main-Toggle-Nav">
              {/* <p className="Main-Toggle-Nav-Mypost">โพสต์ของฉัน</p> */}
              <ClosingCard />
            </nav>
          )

          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "nearingpost" && (
            <nav className="Main-Toggle-Nav">
              {/* <p className="Main-Toggle-Nav-Favorite">ชื่นชอบ</p> */}
              <NearingCard />
            </nav>
          )
          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
      </div>
    </div>
  );
};

export default MainToggle;
