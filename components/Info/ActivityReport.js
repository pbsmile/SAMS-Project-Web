import React, { useEffect, useState } from "react";
import Trend from "../../Image/trend.png";
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
        postName
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
      console.log(data.getAllReportsFromThisPost.reports[0].postName);
    },
  });
  console.log(data);
  //console.log(result.data.getAllPostsByAuthen.posts)

  return (
    <div className="Report-Info-Card-Div">
      <div className="Report-Info-Card-Fixed-Bg">
        <nav className="Report-Info-Card-Nav">
          <img className="Report-Info-Card-Nav-Img" src={Trend} />
          <p className="Report-Info-Card-Nav-Activity">
            รายละเอียดกิจกรรมที่ถูกรายงาน
          </p>
        </nav>
      </div>

      <div className="Report-Info-Card-List">
        {data && (
          <>
            {/* <div><h4>{data.getAllReportsFromThisPost.reports.reportPostId.name}</h4></div> */}
            <div className="Report-Info-Card-Nav-Popular">
              กิจกรรม {data.getAllReportsFromThisPost.reports[0].postName}
            </div>
            <Link
              key={postId}
              href="/activity/[activityId]"
              as={`/activity/${postId}`}
            >
              <button>ตรวจสอบกิจกรรม</button>
            </Link>
            <div className="Report-Info-Card-Nav-Text"> เหตุผลของการรายงาน</div>
            {data.getAllReportsFromThisPost.reports.map((prod) => (
              <div className="Report-Info-Card-Nav-Comment" key={prod._id}>
                {/* <h4>{prod._id}</h4> */}
                {prod.comment}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityReport;
