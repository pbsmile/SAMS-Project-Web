import React, { useEffect, useState } from "react";
import Report from "../../Image/report.png";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";

const QUERY_ALLREPORTS = gql`
  query {
    getAllPostsThatHaveReport {
      postId
      postName
      numberOfReport
      creatorName
    }
  }
`;

const ReportViewCard = () => {
  const { data } = useQuery(QUERY_ALLREPORTS, {
    pollInterval: 3000,
    onCompleted: (data) => {
      console.log(data.reports);
    },
  });
  console.log(data);
  //console.log(result.data.getAllPostsByAuthen.posts)

  const [toggleJoin, setToggleJoin] = useState("unjoin");
  console.log("Join>>", toggleJoin);
  const [toggleFav, setToggleFav] = useState("unfav");
  console.log("Fav>>", toggleFav);

  const handleClickJoin = () => {
    if (toggleJoin == "unjoin") {
      setToggleJoin("join");
    }
    if (toggleJoin == "join") {
      setToggleJoin("unjoin");
    }
  };

  const handleClickFav = () => {
    if (toggleFav == "unfav") {
      setToggleFav("fav");
    }
    if (toggleFav == "fav") {
      setToggleFav("unfav");
    }
  };
  return (
    <div className="Report-View-Card-Div">
      <div className="Report-View-Card-Fixed-Bg">
        <nav className="Report-View-Card-Nav">
        <img className="Report-View-Card-Nav-Img" src={Report} />
          <p className="Report-View-Card-Nav-Activity">
            กิจกรรมที่ถูกรายงาน
          </p>
        </nav>
      </div>

      <div className="Report-View-Card-List">
        {data && (
          <>
            {/* {data.getAllPostsByAuthen.posts.map((prod) => (
              <div key={prod._id}>
                <h4>{prod.name}</h4>
              </div>
            ))} */}
            {data.getAllPostsThatHaveReport.map((prod) => (
              <div
                className="Report-View-Card-List-Text"
                key={prod.postId}
              >
                <div className="Report-View-Card-List-Text-Title">
                  กิจกรรม{" "}
                  <Link
                    key={prod.postName}
                    href="/reportInfo/[activityId]"
                    as={`/reportInfo/${prod.postId}`}
                  >
                    {prod.postName}
                  </Link>
                </div>
                <div className="Report-View-Card-List-Text-Number">
                  {" "}
                  ถูกรายงานรวม <b>{prod.numberOfReport}</b>  ครั้ง
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReportViewCard;
