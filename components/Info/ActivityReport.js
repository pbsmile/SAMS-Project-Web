import React, { useEffect, useState } from "react";
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
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import { useRouter } from "next/router";

const QUERY_REPORTINFO = gql`
  query QUERY_REPORTINFO($postId: String!) {
    getAllReportsFromThisPost(input: { postId: $postId }) {
      reports {
        _id
        comment
        reportPostId {
          name
        }
      }
    }
  }
`;

const ActivityReport = () => {
  const route = useRouter();
  console.log(route);
  const postId = route.query.activityId;
  const { data } = useQuery(QUERY_REPORTINFO, {
    variables: { postId },
    pollInterval: 3000,
    onCompleted: (data) => {
      console.log(data.getAllReportsFromThisPost);
    },
  });
  console.log(data);
  //console.log(result.data.getAllPostsByAuthen.posts)

  return (
    <div className="Activity-Page-Card-Div">
      <div className="Activity-Page-Fixed-Bg">
        <nav className="Activity-Page-Card-Nav">
          <p className="Activity-Page-Card-Nav-Popular">กิจกรรมที่ถูกรายงาน</p>
        </nav>
      </div>

      <div className="Activity-Page-Card-List">
      
        {data && (
          <>
            {/* <div><h4>{data.getAllReportsFromThisPost.reports.reportPostId.name}</h4></div> */}
            {data.getAllReportsFromThisPost.reports.map((prod) => (
              <div key={prod._id}>
                {/* <h4>{prod._id}</h4> */}
                <h4>{prod.comment}</h4>
                <h4>{prod.reportPostId.name}</h4>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityReport;
