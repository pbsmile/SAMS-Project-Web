import React, { useEffect, useState } from "react";
import ProfileCard from "../Card/ProfileCard";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ProfileToggle = () => {
  const [toggle, setToggle] = useState("mypost");
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
        <ProfileCard />
        <ul className="Profile-Toggle-Button-Items">
          <label
            className={
              toggle == "mypost"
                ? "Profile-Toggle-Button-MyPost"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("mypost")}
          >
            โพสต์ของฉัน
          </label>
          <label
            className={
              toggle == "favorite"
                ? "Profile-Toggle-Button-Favorite"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("favorite")}
          >
            ชื่นชอบ
          </label>
          <label
            className={
              toggle == "history"
                ? "Profile-Toggle-Button-History"
                : "Profile-Toggle-Button-Trans"
            }
            onClick={() => handleClick("history")}
          >
            ประวัติ
          </label>
        </ul>
      </nav>
      <div className="Profile-Toggle-List">
        {
          toggle == "mypost" && (
            <nav className="Profile-Toggle-Nav">
              <p className="Profile-Toggle-Nav-Mypost">โพสต์ของฉัน</p>
            </nav>
          )

          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "favorite" && (
            <nav className="Profile-Toggle-Nav">
              <p className="Profile-Toggle-Nav-Favorite">ชื่นชอบ</p>
            </nav>
          )
          //   order.map((item, index) => (
          //     <CardOrder item={item} key={index} isComplete={_isComplete} />
          //   ))
        }
        {
          toggle == "history" && (
            <nav className="Profile-Toggle-Nav">
              <p className="Profile-Toggle-Nav-History">ประวัติ</p>
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
