import React, { useEffect, useState, useContext } from "react";
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
import { AuthContext } from "../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";

import { useMutation } from "@apollo/react-hooks";


const JOINPOST = gql`
  mutation JOINPOST($postId: String!) {
    joinPost(input: { postId: $postId }) {
      name
    }
  }
`;

const UNJOINPOST = gql`
  mutation UNJOINPOST($postId: String!) {
    unjoinPost(input: { postId: $postId }) {
      name
    }
  }
`;

const FAVPOST = gql`
  mutation FAVPOST($postId: String!) {
    favPost(input: { postId: $postId }) {
      name
    }
  }
`;

const UNFAVPOST = gql`
  mutation UNFAVPOST($postId: String!) {
    unfavPost(input: { postId: $postId }) {
      name
    }
  }
`;

const QUERY_ACTIVITY = gql`
  query QUERY_ACTIVITY($postId: String!) {
    getOnePost(input: { postId: $postId }) {
      name
      _id
      status
      dateStart
      dateEnd
      timeStart
      timeEnd
      place
      participantsNumber
      dateCloseApply
      description
      canJoin
      canFav
    }
  }
`;


const ActivityInfo = () => {
  const route = useRouter();
  console.log(route);
  const postId = route.query.activityId

  const [toggleJoin, setToggleJoin] = useState("");
  console.log("Join State>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("");
  console.log("Fav State>>", toggleFav);

  const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
    variables: { postId },
    onCompleted: (data) => {
      if (data) {
        console.log(data.getOnePost.canJoin)
        console.log(data.getOnePost.canFav);
        if (data.getOnePost.canJoin == false)
        {
          setToggleJoin("join");
        }
        if (data.getOnePost.canJoin == true)
        {
          setToggleJoin("unjoin");
        }
        if (data.getOnePost.canFav == false)
        {
          setToggleFav("fav");
        }
        if (data.getOnePost.canFav == true)
        {
          setToggleFav("unfav");
        }
        //Router.push("/activity");
      }
    }
  });


  // console.log("canJoin",data.getOnePost.canJoin)

  // const JoinTog = data.getOnePost.canJoin

  // if (JoinTog == "true") {
  //   joinState = "unjoin"
  // }
  // if (JoinTog == "false") {
  //   joinState = "join"
  // }

  

  
  const [joinpost] = useMutation(JOINPOST, {
    variables: { postId },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setToggleJoin("join");
        //Router.push("/activity");
      }
    }
  });

  const [unjoinpost] = useMutation(UNJOINPOST, {
    variables: { postId },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setToggleJoin("unjoin");
        //Router.push("/activity");
      }
    }
  });

  const [favpost] = useMutation(FAVPOST, {
    variables: { postId },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setToggleFav("fav");
        //Router.push("/activity");
      }
    }
  });

  const [unfavpost] = useMutation(UNFAVPOST, {
    variables: { postId },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setToggleFav("unfav");
        //Router.push("/activity");
      }
    }
  });

  console.log("postId",postId)

  const handleClickJoin = async () => {
    if (toggleJoin == "unjoin") {
      //setToggleJoin("join");
      await joinpost()
    }
    if (toggleJoin == "join") {
      //setToggleJoin("unjoin");
      await unjoinpost()
    }
  };

  const handleClickFav = async () => {
    
    if (toggleFav == "unfav") {
      //setToggleFav("fav");
      await favpost()
    }
    if (toggleFav == "fav") {
      //setToggleFav("unfav");
      await unfavpost()
    }
  };
  
  if (error) return <p>Something went wrong, please try again.</p>;

  if (loading) return <p>Loading ...</p>;


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
                    {data.getOnePost.dateStart}
                  </label>
                  <label className="Activity-Page-Card-Time">
                    <img className="Activity-Page-Card-Icon-Size" src={Time} />
                    {data.getOnePost.timeStart}
                  </label>
                </div>

                <label className="Activity-Page-Card-Location">
                  <img
                    className="Activity-Page-Card-Icon-Size"
                    src={Location}
                  />
                  {data.getOnePost.place}
                </label>
                <div className="Activity-Page-Card-Members-Close">
                  <label className="Activity-Page-Card-Members">
                    <img
                      className="Activity-Page-Card-Icon-Size"
                      src={Members}
                    />
                    {data.getOnePost.participantsNumber}
                  </label>
                  <label className="Activity-Page-Card-Close">
                    <img
                      className="Activity-Page-Card-Icon-Size"
                      src={Closed}
                    />
                    {data.getOnePost.dateCloseApply}
                  </label>
                </div>
              </div>
            </div>
            <div className="Activity-Page-Card-Flex Activity-Page-Card-Description">
              {data.getOnePost.description}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivityInfo;
