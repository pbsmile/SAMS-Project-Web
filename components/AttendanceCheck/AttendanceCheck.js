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
    const [btnGreen, setbtnGreen] = useState({
        color: 'success',
        data: ''
    })
    const [btnRed, setbtnRed] = useState({
        edit: false,
        color: 'danger',
        data: ''
    })


    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log("data1 : " + data.getOnePost.joinUsers[0].name)
                console.log("data2 : " + data.getOnePost.joinUsers[0])

            }
        },
    });

    const handleGreenClick = e => {
        if (btnGreen.color == 'success') {
            setbtnGreen({
                color: 'outline-success',
                // data: prod
            })
        }
        else if (btnGreen.color == 'outline-success') {
            setbtnGreen({
                color: 'success',
                // data: prod
            })
        }
    }

    if (error) return <p>Something went wrong, please try again.</p>;
    if (loading) return <p>Loading ...</p>;



    return (
        <div>
            Activities Page
            for web
            SAMS
            {data.getOnePost.joinUsers.map((prod, id) => (
                <div key={prod._id}>
                    {prod.name} {prod._id}
                    {id}
                    {/* <Button variant={btnGreen.color} onClick={handleRedClick(prod._id)}>เข้าร่วม</Button>{' '} */}
                    <Button variant={btnGreen.color} name={prod._id} onClick={handleGreenClick}>Success</Button>{' '}
                </div>
            ))}
            {/* {data.getOnePost.joinUsers[0].name} */}
        </div>
    );
};

export default AttendanceCheck;
