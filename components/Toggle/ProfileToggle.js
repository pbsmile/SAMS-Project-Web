import React, { useEffect, useState } from "react";

const ProfileToggle = () => {
  const [toggle, setToggle] = useState("mypost");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (toggle == "mypost") {
      console.log("MyPost");
    }
    if (toggle == "favorite") {
      console.log("MyFav");
    }
    if (toggle == "history") {
      console.log("MyHist");
    }
    setToggle(toggle);

    if (refresh == true) {
      console.log("Refresh");
    }
  }, [toggle, refresh]);

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
    <div>
      <div className="Profile-Toggle-Button-List">
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
      </div>
      <div className="Profile-Toggle-List">
        {toggle == "mypost" && (
            <h1>My Post</h1>
        )
        //   order.map((item, index) => (
        //     <CardOrder item={item} key={index} isComplete={_isComplete} />
        //   ))
    }
        {toggle == "favorite" && (
            <h1>Favorite</h1>
        )
        //   order.map((item, index) => (
        //     <CardOrder item={item} key={index} isComplete={_isComplete} />
        //   ))
    }
        {toggle == "history" && (
            <h1>History</h1>
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
