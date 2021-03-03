import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import Router from "next/router";

import { Button, Modal } from 'react-bootstrap';



// const ATTENDANCECHECK = gql`
//   mutation ATTENDANCECHECK($postId: String!,$checkedUsersId: [String!]){
//     attendanceCheck(input:{
//       postId:$postId,
//       checkedUsersId:$checkedUsersId
//     })
//     {
//       checkedUsers{
//         name
//       }
//     }
//   }
// `;

const QUERY_ACTIVITY = gql`
  query QUERY_ACTIVITY($postId: String!) {
    getOnePost(input: { postId: $postId }) {
      name
      _id
      joinUsers{_id,name,studentId}
      checkedUsers{_id, name}
    }
  }
`;

const AttendanceCheck = () => {

    const route = useRouter();
    console.log(route);
    const postId = route.query.activityId;
    const [attendCheck, setattendCheck] = useState("");

    console.log("attendCheck : ", attendCheck);

    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log("data1 : " + data.getOnePost.joinUsers[0].name)
                console.log("data2 : " + data.getOnePost.joinUsers[0].studentId)

            }
        },
    });
    if (error) return <p>Something went wrong, please try again.</p>;
    if (loading) return <p>Loading ...</p>;

    return (
        <div>
            Activities Page
            for web
            SAMS
            {data.getOnePost.joinUsers.map((prod) => (
                <div key={prod._id}>
                   {prod.name} 
                </div>
            ))}
            {/* {data.getOnePost.joinUsers[0].name} */}
        </div>
    );
};

export default AttendanceCheck;
