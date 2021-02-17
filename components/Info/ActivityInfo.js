import React, { useEffect, useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Circle from "../../Image/circle.png";
import Chest from "../../Image/chest.jpg";
import Filter from "../Filter/ActivityFilter";
import Join from "../../Image/add1.png";
import Unjoin from "../../Image/add2.png";
import Fav from "../../Image/heart1.png";
import Unfav from "../../Image/heart2.png";
import Day from "../../Image/info_date.png";
import Time from "../../Image/clock.png";
import Location from "../../Image/info_flag.png";
import Members from "../../Image/info_user.png";
import Closed from "../../Image/info_closed.png";
import { AuthContext } from "../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";

import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";

import Moment from "react-moment";
import "moment-timezone";

const REVIEW = gql`
  mutation REVIEW($reviewPostId: String!, $reviewComment: String ,$reviewRate: Number!) {
    createReview(input: { reviewPostId: $reviewPostId, comment: $reviewComment , rate: $reviewRate })
    {
      _id
    }
  }
`;

const REPORT = gql`
  mutation REPORT($reportPostId: String!, $reportComment: String!) {
    createReport(input: { reportPostId: $reportPostId, comment: $reportComment })
    {
      _id
    }
  }
`;

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
      canReview
      avgRate
    }
  }
`;

const ActivityInfo = () => {
  const route = useRouter();
  console.log(route);
  const postId = route.query.activityId;
  const reportPostId = route.query.activityId;
  const reviewPostId = route.query.activityId;
  const comment = "ทดสอบ";
  const reportComment = "ทดสอบReport";
  const reviewComment = "ทดสอบReview";
  const reviewRate = 5;

  console.log("reportPostId", reportPostId);
  console.log("reportComment", reportComment);
  console.log("reviewComment", reviewComment);
  console.log("reviewRate", reviewRate);

  const [toggleJoin, setToggleJoin] = useState("");
  console.log("Join State>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("");
  console.log("Fav State>>", toggleFav);
  const [createUser, setCreateUser] = useState(false);
  console.log("create User >>", createUser);
  const [canReview, setCanReview] = useState(false);
  console.log("can review >>", canReview);

  const { user, signout } = useContext(AuthContext);

  const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
    variables: { postId },
    onCompleted: (data) => {
      if (data) {
        console.log("JOIN", data.getOnePost.canJoin);
        console.log(data.getOnePost.canFav);
        if (data.getOnePost.canJoin == "joined") {
          setToggleJoin("join");
        }
        if (data.getOnePost.canJoin == "canJoin") {
          setToggleJoin("unjoin");
        }
        if (data.getOnePost.canJoin == "createUser") {
          setToggleJoin("unjoin");
          setCreateUser(true);
        }
        if (data.getOnePost.canJoin == "full") {
          setToggleJoin("unjoin");
        }
        if (data.getOnePost.canJoin == "closed") {
          setToggleJoin("unjoin");
        }

        if (data.getOnePost.canFav == false) {
          setToggleFav("fav");
        }
        if (data.getOnePost.canFav == true) {
          setToggleFav("unfav");
        }

        if (data.getOnePost.canReview == false) {
          setCanReview(false);
        }
        if (data.getOnePost.canReview == true) {
          setCanReview(true);
        }
        //Router.push("/activity");
      }
    },
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
    },
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
    },
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
    },
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
    },
  });

  const [report] = useMutation(REPORT, {
    variables: { reportPostId, reportComment },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        //Router.push("/activity");
      }
    },
  });

  const [review] = useMutation(REVIEW, {
    variables: { reviewPostId, reviewComment , reviewRate },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        //Router.push("/activity");
      }
    },
  });

  console.log("postId", postId);

  const handleClickJoin = async () => {
    if (toggleJoin == "unjoin") {
      //setToggleJoin("join");
      await joinpost();
    }
    if (toggleJoin == "join") {
      //setToggleJoin("unjoin");
      await unjoinpost();
    }
  };

  const handleClickFav = async () => {
    if (toggleFav == "unfav") {
      //setToggleFav("fav");
      await favpost();
    }
    if (toggleFav == "fav") {
      //setToggleFav("unfav");
      await unfavpost();
    }
  };

  const handleClickReport = async () => {
    await report();
  };

  const handleClickReview = async () => {
    await review();
  };

  if (error) return <p>Something went wrong, please try again.</p>;

  if (loading) return <p>Loading ...</p>;

  return (
    <div className="Activity-Info-Page-Card-Div">
      <div className="Activity-Info-Page-Card-List">
        <div className="Activity-Info-Page-Card">
          <div className="Activity-Info-Page-Card-Area">
            <div className="Activity-Info-Page-Card-Flex">
              <div className="Activity-Info-Page-Card-Left">
                <img className="Activity-Info-Page-Card-Img" src={Chest} />
                {/* <label className="Activity-Info-Page-Card-Status">
                  สถานะกิจกรรม :
                </label> 
                <label className="Activity-Info-Page-Card-Status">ปิด</label>*/}
              </div>
              <div className="Activity-Info-Page-Card-Right">
                <label className="Activity-Info-Page-Card-Name">
                  {data.getOnePost.name}
                </label>
                <div className="Activity-Info-Page-Card-Date-Time">
                  <label className="Activity-Info-Page-Card-Date">
                    <img
                      className="Activity-Info-Page-Card-Icon-Size"
                      src={Day}
                    />
                    <Moment format="D MMM YYYY">
                      {data.getOnePost.dateStart}
                    </Moment>
                    <label className="Activity-Info-Page-Card-Time">
                      {data.getOnePost.timeStart} น.
                    </label>
                  </label>
                  {/* <label className="Activity-Info-Page-Card-Time">
                    <img
                      className="Activity-Info-Page-Card-Icon-Size"
                      src={Time}
                    />
                    {data.getOnePost.timeStart} น.
                  </label> */}
                </div>

                <label className="Activity-Info-Page-Card-Location">
                  <img
                    className="Activity-Info-Page-Card-Icon-Size"
                    src={Location}
                  />
                  {data.getOnePost.place}
                </label>
                <div className="Activity-Info-Page-Card-Members-Close">
                  <label className="Activity-Info-Page-Card-Members">
                    <img
                      className="Activity-Info-Page-Card-Icon-Size"
                      src={Members}
                    />
                    {data.getOnePost.participantsNumber} คน
                  </label>
                  {/* <label className="Activity-Info-Page-Card-Close">
                    <img
                      className="Activity-Info-Page-Card-Icon-Size"
                      src={Closed}
                    />
                    {data.getOnePost.dateCloseApply}
                  </label> */}
                </div>
                <label className="Activity-Info-Page-Card-Status">
                  <img
                    className="Activity-Info-Page-Card-Icon-Size"
                    src={Closed}
                  />
                  {data.getOnePost.status}
                </label>
              </div>
            </div>
            <div>
              <div className="Activity-Info-Page-Card-Top-Div">
                {/* <button className="Activity-Info-Page-Card-Join"></button> */}

                {user && !createUser && (
                  <>
                    <div className="Activity-Info-Page-Card-Box">
                      <img
                        className="Activity-Info-Page-Card-Join"
                        src={toggleJoin == "unjoin" ? Unjoin : Join}
                        onClick={() => handleClickJoin()}
                      ></img>
                      <label
                        className="Activity-Info-Page-Card-Join-Text"
                        onClick={() => handleClickJoin()}
                      >
                        {toggleJoin == "unjoin" ? "เข้าร่วม" : "ยกเลิก"}
                      </label>
                    </div>
                  </>
                )}

                {/* <button className="Activity-Info-Page-Card-Favorite"></button> */}
                {user && (
                  <>
                    <div className="Activity-Info-Page-Card-Box">
                      <img
                        className="Activity-Info-Page-Card-Join"
                        src={toggleFav == "unfav" ? Unfav : Fav}
                        onClick={() => handleClickFav()}
                      ></img>
                      <label
                        className="Activity-Info-Page-Card-Favorite-Text"
                        onClick={() => handleClickFav()}
                      >
                        {toggleFav == "unfav" ? "ชื่นชอบ" : "เลิกชอบ"}
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="Activity-Info-Page-Card-Flex Activity-Info-Page-Card-Action">
              {createUser && (
                <>
                  <div>
                    <Link
                      key={data.getOnePost._id}
                      href="/editActivity/[activityId]"
                      as={`/editActivity/${data.getOnePost._id}`}
                    >
                      <button>แก้ไข</button>
                    </Link>

                    <button>ส่งข้อมูล</button>
                    <button>เช็คชื่อ</button>
                    <button>ลบ</button>
                  </div>
                </>
              )}
              {user && !createUser && canReview && (
                <>
                  <div>
                    <button onClick={() => handleClickReview()}>รีวิว</button>
                  </div>
                </>
              )}
              {user && !createUser && (
                <>
                  <div>
                    <button onClick={() => handleClickReport()}>รีพอร์ต</button>
                  </div>
                </>
              )}
            </div>

            <div className="Activity-Info-Page-Card-Description">
              <div className="Activity-Info-Page-Card-Flex">
                <label className="Activity-Info-Page-Card-Description-Name">
                  {data.getOnePost.name}
                </label>
              </div>
              <div className="Activity-Info-Page-Card-Flex Activity-Info-Page-Card-Description-More">
                {data.getOnePost.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityInfo;
