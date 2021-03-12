import React, { useEffect, useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
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
import Faculty from "../../Image/info_status.png";
import Rate from "../../Image/info_star.png";
import Rate1 from "../../Image/info_star1.png";
import Rate2 from "../../Image/info_star2.png";
import CloseDate from "../../Image/info_closedate.png";
import { AuthContext } from "../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import Router from "next/router";

import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";

import Moment from "react-moment";
import "moment-timezone";
import "bootstrap/dist/css/bootstrap.min.css";
// import {ฺModal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "jquery/dist/jquery.min.js"
// import "popper.js/dist/umd/popper.min.js"
// import "bootstrap/dist/js/bootstrap.min.js"

// import 'bootstrap/dist/js/bootstrap.bundle';
import { Button, Modal, DropdownButton, Dropdown } from "react-bootstrap";
// import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

import ReactStars from "react-rating-stars-component";
import AttendanceCheck from "../AttendanceCheck/AttendanceCheck"
import useScript from 'react-script-hook';

// import { HeadProvider, Title, Link, Meta } from 'react-head';


// import "js/jquery-1.11.2.min.js"
// import "js/bootstrap.min.js"

const REVIEW = gql`
  mutation REVIEW(
    $reviewPostId: String!
    $reviewComment: String
    $reviewRate: Number!
  ) {
    createReview(
      input: {
        reviewPostId: $reviewPostId
        comment: $reviewComment
        rate: $reviewRate
      }
    ) {
      _id
    }
  }
`;

const REPORT = gql`
  mutation REPORT($reportPostId: String!, $reportComment: String!) {
    createReport(
      input: { reportPostId: $reportPostId, comment: $reportComment }
    ) {
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

const SENDEMAIL = gql`
  mutation SENDEMAIL($postId: String!, $subject: String!, $message: String) {
    sendEmail(
      input: { postId: $postId, subject: $subject, message: $message }
    ) {
      name
    }
  }
`;

const DELETEPOST = gql`
  mutation DELETEPOST($postId: String!) {
    deletePost(input: { postId: $postId }) {
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
      major
      photoHeader
    }
  }
`;

const ActivityInfo = () => {
  // useScript({
  //   src: 'jquery/dist/jquery.min.js',
  //   onload: () => console.log('Script loaded!'),
  // })
  // useScript({
  //   src: 'popper.js/dist/umd/popper.min.js',
  //   onload: () => console.log('Script loaded!'),
  // })
  // useScript({
  //   src: 'bootstrap/dist/js/bootstrap.min.js',
  //   onload: () => console.log('Script loaded!'),
  // })
  const { user } = useContext(AuthContext);
  console.log("User Act Info", user);

  const route = useRouter();
  console.log(route);
  const postId = route.query.activityId;
  const reportPostId = route.query.activityId;
  const reviewPostId = route.query.activityId;
  const [reportComment, setReportComment] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRate, setReviewRate] = useState(0);

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
  const [isAdmin, setIsAdmin] = useState(false);
  console.log("Admin? >>", isAdmin);

  const [Status, setStatus] = useState("");
  console.log("Status? >>", Status);

  const ratingChanged = (newRating) => {
    setReviewRate(newRating);
    console.log(newRating);
  };
  const handleChangeReviewText = (e) => {
    console.log("Value", e.target.value);
    setReviewComment(e.target.value);
  };

  const handleChangeReportText = (e) => {
    console.log("Value", e.target.value);
    setReportComment(e.target.value);
  };

  const dateFormat = require("dateformat");
  dateFormat.i18n = {
    dayNames: [
      "อา.",
      "จ.",
      "อ.",
      "พ.",
      "พฤ.",
      "ศ.",
      "ส.",
      "อา.",
      "จ.",
      "อ.",
      "พ.",
      "พฤ.",
      "ศ.",
      "ส.",
    ],
    monthNames: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
  };
  // const [isVisible, setIsVisible] = useState(true)

  // import "jquery/dist/jquery.min.js"
  // import "popper.js/dist/umd/popper.min.js"
  // import "bootstrap/dist/js/bootstrap.min.js"

  const [showModalSendEmail, setShowModalSendEmail] = useState(false);
  const handleCloseModalSendEmail = () => setShowModalSendEmail(false);
  const handleShowModalSendEmail = () => setShowModalSendEmail(true);

  const [showModalJoin, setShowModalJoin] = useState(false);
  const handleCloseModalJoin = () => setShowModalJoin(false);
  const handleShowModalJoin = () => setShowModalJoin(true);

  const [showModalReport, setShowModalReport] = useState(false);
  const handleCloseModalReport = () => setShowModalReport(false);
  const handleShowModalReport = () => setShowModalReport(true);

  const [showModalReview, setShowModalReview] = useState(false);
  const handleCloseModalReview = () => setShowModalReview(false);
  const handleShowModalReview = () => setShowModalReview(true);

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);

  const [showAttendance, setShowAttendance] = useState(false);
  const handleCloseAttendance = () => setShowAttendance(false);
  const handleShowAttendance = () => setShowAttendance(true);

  // console.log("data:image/jpeg;base64," + base64encodedimg)

  const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
    variables: { postId },
    onCompleted: (data) => {
      if (data) {
        console.log(data.getOnePost);
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
        if (data.getOnePost.status == "closed") {
          setStatus("ปิดรับสมัคร");
        }
        if (data.getOnePost.status == "open") {
          setStatus("เปิดรับสมัคร");
        }
        if (user) {
          if (user.type == "admin") {
            setIsAdmin(true);
          }
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
        setShowModalJoin(false);
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
        setShowModalJoin(false);
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
        setShowModalReport(false);
        //Router.push("/activity");
      }
    },
  });

  const [review] = useMutation(REVIEW, {
    variables: { reviewPostId, reviewComment, reviewRate },
    //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setShowModalReview(false);
        //Router.push("/activity");
      }
    },
  });

  const [sendEmailInfo, setsendEmailInfo] = useState({
    subject: "",
    message: "",
  });

  const [sendEmail] = useMutation(SENDEMAIL, {
    variables: { postId, ...sendEmailInfo },
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setsendEmailInfo({
          subject: "",
          message: "",
        });
      }
      setShowModalSendEmail(false);
      console.log("Send Email Complete");
    },
  });

  const [deletePost] = useMutation(DELETEPOST, {
    variables: { postId },
    onCompleted: (data) => {
      if (data) {
        console.log(data);
      }
      Router.push("/profile");
      console.log("Detete Complete");
    },
  });

  console.log("postId", postId);

  const handleEmailSubmit = async () => {
    console.log("onclick submit");
    await sendEmail();
  };

  const handleEmailChange = (e) => {
    console.log("Value", e.target.value);
    setsendEmailInfo({
      ...sendEmailInfo,
      [e.target.name]: e.target.value,
    });
    console.log(sendEmailInfo);
  };

  const handleClickDelete = async () => {
    await deletePost();
  };

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
                <img
                  className="Activity-Info-Page-Card-Img"
                  src={data.getOnePost.photoHeader}
                />
                {/* <img className="Activity-Info-Page-Card-Img"  src={"data:image/jpeg;base64," + base64encodedimg} /> */}
                {/* <label className="Activity-Info-Page-Card-Status">
                  สถานะกิจกรรม :
                </label> 
                <label className="Activity-Info-Page-Card-Status">ปิด</label>*/}
              </div>
              <div className="Activity-Info-Page-Card-Right">
                <div className="Activity-Info-Page-Card-Top">
                  <label className="Activity-Info-Page-Card-Name">
                    {data.getOnePost.name}
                  </label>
                  <div className="Activity-Info-Page-Card-Date-Time">
                    <label className="Activity-Info-Page-Card-Date">
                      <img
                        className="Activity-Info-Page-Card-Icon-Size"
                        src={Day}
                      />
                      {dateFormat(data.getOnePost.dateStart, "d mmmm yyyy")}{" "}
                      {data.getOnePost.timeStart} น.
                      {/* <Moment format="D MMM YYYY">
                      {data.getOnePost.dateStart}
                    </Moment> */}
                      {/* <label className="Activity-Info-Page-Card-Time">
                      {data.getOnePost.timeStart} น.
                    </label> */}
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
                      src={Faculty}
                    />
                    หน่วยงาน
                    {data.getOnePost.major}
                  </label>
                  <label className="Activity-Info-Page-Card-Status">
                    <img
                      className="Activity-Info-Page-Card-Icon-Size"
                      src={Rate}
                    />
                    รีวิวเฉลี่ย
                    {data.getOnePost.avrRate} คะแนน
                  </label>
                  <label className="Activity-Info-Page-Card-Status">
                    <img
                      className="Activity-Info-Page-Card-Icon-Size"
                      src={CloseDate}
                    />
                    ปิดรับสมัคร{" "}
                    {dateFormat(data.getOnePost.dateCloseApply, "d mmmm yyyy")}
                  </label>
                  <label className="Activity-Info-Page-Card-Status">
                    <img
                      className="Activity-Info-Page-Card-Icon-Size"
                      src={Closed}
                    />
                    {Status}
                  </label>
                </div>
                <div className="Activity-Info-Page-Card-Bottom">
                  {user && !createUser && (
                    <>
                      <div className="Activity-Info-Page-Card-Box">
                        <button className="Activity-Info-Page-Card-Button-Like">
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
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="Activity-Info-Page-Card-Top-Div">
                {/* <button className="Activity-Info-Page-Card-Join"></button> */}

                {/* {user && !createUser && (
                  <>
                    <div className="Activity-Info-Page-Card-Box">
                      <img
                        className="Activity-Info-Page-Card-Join"
                        src={toggleJoin == "unjoin" ? Unjoin : Join}
                        onClick={() => handleShowModalJoin()}
                      ></img>
                      <label
                        className="Activity-Info-Page-Card-Join-Text"
                        onClick={() => handleShowModalJoin()}
                      >
                        {toggleJoin == "unjoin" ? "เข้าร่วม" : "ยกเลิก"}
                      </label>
                    </div>
                  </>
                )} */}

                {/* <button className="Activity-Info-Page-Card-Favorite"></button> */}

                {user && !createUser && canReview && (
                  <>
                    <div>
                      <button
                        className="Activity-Info-Page-Card-Button-Review"
                        onClick={() => handleShowModalReview()}
                      >
                        ให้คะแนน
                      </button>
                    </div>
                  </>
                )}
                {user && !createUser && !isAdmin && (
                  <>
                    <div>
                      <button
                        className="Activity-Info-Page-Card-Button-Report"
                        onClick={() => handleShowModalReport()}
                      >
                        รีพอร์ต
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="Activity-Info-Page-Card-Action Three-Btn">
              {createUser && (
                <>
                  {/* style={{ display: isVisible ? "block" : "none" }} */}
                  <div className="Activity-Info-Page-Card-Flex-Three-Btn">
                    <div>
                      {" "}
                      <Link
                        key="editActivity"
                        href="/editActivity/[activityId]"
                        as={`/editActivity/${data.getOnePost._id}`}
                      >
                        <button className="Activity-Info-Page-Card-Button-Edit">
                          แก้ไข
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link
                        key="attendanceCheck"
                        href="/attendanceCheck/[activityId]"
                        as={`/attendanceCheck/${postId}`}
                      >
                        <button className="Activity-Info-Page-Card-Button-Check">
                          เช็คชื่อ
                        </button>
                      </Link>
                    </div>
                    <div>
                      {" "}
                      <button
                        className="Activity-Info-Page-Card-Button-Mail"
                        onClick={handleShowModalSendEmail}
                      >
                        ส่งข้อมูล
                      </button>
                    </div>
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
            <div className="Activity-Info-Page-Card-Top-Div">
              {user && !createUser && (
                <>
                  <div className="Activity-Info-Page-Card-Box">
                    <button
                      className={
                        toggleJoin == "unjoin"
                          ? "Activity-Info-Page-Card-Button-Join"
                          : "Activity-Info-Page-Card-Button-Unjoin"
                      }
                    >
                      {/* <img
                        className="Activity-Info-Page-Card-Join"
                        src={toggleJoin == "unjoin" ? Unjoin : Join}
                        onClick={() => handleShowModalJoin()}
                      ></img> */}
                      <label
                        className="Activity-Info-Page-Card-Join-Text"
                        onClick={() => handleShowModalJoin()}
                      >
                        {toggleJoin == "unjoin" ? "เข้าร่วม" : "ยกเลิก"}
                      </label>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="Activity-Info-Page-Card-Action">
              {(createUser || isAdmin) && (
                <>
                  {/* style={{ display: isVisible ? "block" : "none" }} */}
                  <div className="Activity-Info-Page-Card-Flex-Three-Btn">
                    <button
                      className="Activity-Info-Page-Card-Button-Delete"
                      onClick={handleShowModalDelete}
                    >
                      ลบ
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div
        show={showAttendance}
        onHide={handleCloseAttendance}>
        <AttendanceCheck />
      </div> */}
      <div>
        <Modal
          show={showModalSendEmail}
          onHide={handleCloseModalSendEmail}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>กรอกรายละเอียดที่ต้องการแจ้ง</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ชื่อกิจกรรม : {data.getOnePost.name}
            <br></br>
            หัวข้อเรื่อง :
            <input
              type="text"
              name="subject"
              className="Post-Input-Fill-Data"
              onChange={handleEmailChange}
              value={sendEmailInfo.subject}
            />
            รายละเอียด :
            <textarea
              type="text"
              name="message"
              className="Post-Input-Fill-Data Post-Input-Large-Fill-Data"
              onChange={handleEmailChange}
              value={sendEmailInfo.message}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={handleCloseModalSendEmail}
            >
              ยกเลิก
            </Button>
            <Button variant="btn btn-info" onClick={handleEmailSubmit}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          show={showModalDelete}
          onHide={handleCloseModalDelete}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>คุณต้องการลบโพสต์กิจกรรม</Modal.Title>
          </Modal.Header>
          <Modal.Body>{data.getOnePost.name}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={handleCloseModalDelete}
            >
              ยกเลิก
            </Button>
            <Button variant="btn btn-info" onClick={handleClickDelete}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          show={showModalJoin}
          onHide={handleCloseModalJoin}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>เช็คชื่อผู้เข้าร่วมกิจกรรม</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ชื่อกิจกรรม : {data.getOnePost.name}
            <br></br>
            สถานที่ : {data.getOnePost.place}
            <br></br>
            คณะ/วิทยาลัย : {data.getOnePost.major}
            <br></br>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={handleCloseModalJoin}
            >
              ยกเลิก
            </Button>
            <Button variant="btn btn-info" onClick={handleClickJoin}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          show={showAttendance}
          onHide={handleCloseAttendance}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันสมัครเข้าร่วมกิจกรรม</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AttendanceCheck />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={handleCloseAttendance}
            >
              ปิด
            </Button> 
          </Modal.Footer>*/}
        </Modal>
      </div>
      <div>
        <Modal
          show={showModalReport}
          onHide={handleCloseModalReport}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="Activity-Info-Page-Card-Report-Title">
              ยืนยันการรีพอร์ต
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="Activity-Info-Page-Card-Report-Body">
            <div className="Activity-Info-Page-Card-Report-Name">ชื่อกิจกรรม : {data.getOnePost.name}</div>
            <div>
              ข้อความเพิ่มเติม :
              <textarea
                type="text"
                placeholder=""
                onChange={handleChangeReportText}
                className="Activity-Info-Page-Card-Report-Text"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={handleCloseModalReport}
            >
              ยกเลิก
            </Button>
            <Button variant="btn btn-info" onClick={handleClickReport}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          show={showModalReview}
          onHide={handleCloseModalReview}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="Activity-Info-Page-Card-Star-Rating-Title">
              รีวิวกิจกรรม
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="Activity-Info-Page-Card-Star-Rating-Body">
            <div className="Two-Row">
              {" "}
              <div className="Activity-Info-Page-Card-Star-Rating-Name">
                ชื่อกิจกรรม : {data.getOnePost.name}
              </div>
            </div>
            <div>
              <div className="Activity-Info-Page-Card-Star-Rating-Star-Div">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={40}
                  activeColor="#E9A605"
                  className="Activity-Info-Page-Card-Star-Rating-Star"
                />
                {/* <StarRatings
                rating={ReviewRate}
                starRatedColor="blue"
                changeRating={ratingChanged}
                numberOfStars={5}
                name="rating"
              /> */}
              </div>
            </div>
            <div className="Two-Row">
              {" "}
              <div className="Activity-Info-Page-Card-Star-Rating-Text-Area">
                เพิ่มเติม :{" "}
              </div>
              <div className="Activity-Info-Page-Card-Star-Rating-Text-Area">
                <textarea
                  type="text"
                  placeholder=""
                  onChange={handleChangeReviewText}
                  className="Activity-Info-Page-Card-Star-Rating-Text"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="btn btn-outline-danger"
              onClick={handleCloseModalReview}
            >
              ยกเลิก
            </Button>
            <Button variant="btn btn-info" onClick={handleClickReview}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* {showAttendance && <AttendanceCheck/>} */}
    </div>
  );
};

export default ActivityInfo;
