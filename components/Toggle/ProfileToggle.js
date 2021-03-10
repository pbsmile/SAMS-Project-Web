import React, { useEffect, useState } from "react";
import ProfileCard from "../Card/ProfileCard";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MyPostCard from "../Card/MyPostCard";
import FavoriteCard from "../Card/FavoriteCard";
import HistoryCard from "../Card/HistoryCard";

import ProfilePNG from "../../Image/profile_profile.png";
import HistoryPNG from "../../Image/profile_history.png";
import FavoritePNG from "../../Image/profile_favorite.png";
import MypostPNG from "../../Image/profile_mypost.png";

const ProfileToggle = () => {
  const [toggle, setToggle] = useState("myprofile");
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
    if (toggleType == "myprofile") {
      setToggle("myprofile");
    }
    if (toggleType == "mypost") {
      setToggle("mypost");
    }
    if (toggleType == "favorite") {
      setToggle("favorite");
    }
    if (toggleType == "history") {
      setToggle("history");
    }
  };

  return (
    <div className="Profile-Toggle-Div Profile-Toggle-Button-List">
      <nav className="Profile-Toggle-Button-Menu active">
        {/* <ProfileCard /> */}
        <ul className="Profile-Toggle-Button-Items">
          <label
            className={
              toggle == "myprofile"
                ? "Profile-Toggle-Button-MyProfile"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("myprofile")}
          >
            <div className="Profile-Toggle-Button-Items-Flex">
              <div>
                <img
                  className={
                    toggle == "myprofile"
                      ? "Profile-Toggle-Button-Profile-Img"
                      : "Profile-Toggle-Button-Img-Trans"
                  }
                  src={ProfilePNG}
                ></img>
              </div>
              <div>ข้อมูลส่วนตัว</div>
            </div>
          </label>
          <label
            className={
              toggle == "history"
                ? "Profile-Toggle-Button-History"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("history")}
          >
            <div className="Profile-Toggle-Button-Items-Flex">
              <div>
                <img
                  className={
                    toggle == "history"
                      ? "Profile-Toggle-Button-History-Img"
                      : "Profile-Toggle-Button-Img-Trans"
                  }
                  src={HistoryPNG}
                ></img>
              </div>
              <div>ประวัติ</div>
            </div>
          </label>
          <label
            className={
              toggle == "favorite"
                ? "Profile-Toggle-Button-Favorite"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("favorite")}
          >
            <div className="Profile-Toggle-Button-Items-Flex">
              <div>
                <img
                  className={
                    toggle == "favorite"
                      ? "Profile-Toggle-Button-Favorite-Img"
                      : "Profile-Toggle-Button-Img-Trans"
                  }
                  src={FavoritePNG}
                ></img>
              </div>
              <div>ชื่นชอบ</div>
            </div>
          </label>
          <label
            className={
              toggle == "mypost"
                ? "Profile-Toggle-Button-MyPost"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("mypost")}
          >
            <div className="Profile-Toggle-Button-Items-Flex">
              <div>
                <img
                  className={
                    toggle == "mypost"
                      ? "Profile-Toggle-Button-Mypost-Img"
                      : "Profile-Toggle-Button-Img-Trans"
                  }
                  src={MypostPNG}
                ></img>
              </div>
              <div>โพสต์ของฉัน</div>
            </div>
          </label>
        </ul>
      </nav>
      <div className="Profile-Toggle-List">
        {
          toggle == "myprofile" && (
            <nav className="Profile-Toggle-Nav">
              {/* <p className="Profile-Toggle-Nav-Mypost">โพสต์ของฉัน</p> */}
              <ProfileCard />
            </nav>
          )

          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "mypost" && (
            <nav className="Profile-Toggle-Nav">
              {/* <p className="Profile-Toggle-Nav-Mypost">โพสต์ของฉัน</p> */}
              <MyPostCard />
            </nav>
          )

          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "favorite" && (
            <nav className="Profile-Toggle-Nav">
              {/* <p className="Profile-Toggle-Nav-Favorite">ชื่นชอบ</p> */}
              <FavoriteCard />
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

export default ProfileToggle;
