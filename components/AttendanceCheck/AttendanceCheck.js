import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import Router from "next/router";

import { Button, Modal } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { FlashOnTwoTone } from "@material-ui/icons";



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
    

    const [btnGreen, setbtnGreen] = useState({
        active: 'true',
        color: 'success',
        data: ''
    });
    console.log(btnGreen)
    const [btnRed, setbtnRed] = useState({
        color: 'danger',
        data: ''
    });

    const [active, setActive] = useState(true);
    const [word, setWord] = useState("")

    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log("data1 : " + data.getOnePost.joinUsers[0].name)
                console.log("data2 : " + data.getOnePost.joinUsers[0])

            }
        },
    });

    // const handleGreenClick = e => {
    //     if (btnGreen.color == 'success') {
    //         setbtnGreen({
    //             color: 'outline-success',
    //             // data: prod
    //         })
    //     }
    //     else if (btnGreen.color == 'outline-success') {
    //         setbtnGreen({
    //             color: 'success',
    //             // data: prod
    //         })
    //     }
    // }


    // const handleRedClick = (name) => {
    //     const id = parseInt(e.target.getAttribute("data-id"));
    //     setbtnGreen({
    //         active: true,
    //         color: 'outline-success'
    //     })
    //     if (btnGreen.active == true) {
    //         setbtnGreen({
    //             active: false,
    //             color: 'success'
    //         })
    //     };

        // const id = parseInt(e.target.getAttribute("data-id"));
        // console.log('id : ' + id)
        // console.log('check btn ' + btnGreen.color)
        // console.log(e.target.name)
        // if (btnGreen.color == 'success') {
        //     setbtnGreen({
        //         color: 'outline-success',
        //         // data: prod
        //     })
        // }
        // else if (btnGreen.color == 'outline-success') {
        //     setbtnGreen({
        //         color: 'success',
        //         // data: prod
        //     })
        // }
    // }

    const [value, setValue] = useState([1,]);
    const handleChange = (val) => {
        setValue(val);
        setWord("เช็คชื่อแล้ว")
        setActive(!active)
        console.log('btnGreen' + active)
        console.log('btnGreen C ' + word)
    }

    // const toggle = e => {
    //     if (btnGreen.active == 'true') {
    //         setbtnGreen({
    //             color: 'เช็คชื่อแล้ว'
    //         })
    //     }
    //     else {
    //         setbtnGreen({
    //             color: 'ยังไม่เช็คชื่อ'
    //         })
    //     }
    // }
    if (error) return <p>Something went wrong, please try again.</p>;
    if (loading) return <p>Loading ...</p>;



    return (
        <div>
            Activities Page
            for web
            SAMS
            {data.getOnePost.joinUsers.map((prod, id) => (

                <div key={prod.name}>
                    {prod.name} {prod._id}

                    {/* <Button variant={btnGreen.color} onClick={handleRedClick(prod._id)}>เข้าร่วม</Button>{' '} */}
                    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                        <ToggleButton variant="outline-success" value={id}>เช็คชื่อ</ToggleButton>
                    </ToggleButtonGroup>
                    {/* <Button variant={btnGreen.color} key={prod.name} name={prod.name} value={prod.name} onClick={handleRedClick}>Success</Button>{' '} */}
                    {/* {btnGreen.true ? "success" : "outline-seccess"} */}
                </div>
            ))}
            {/* {data.getOnePost.joinUsers[0].name} */}
        </div>
    );
};

export default AttendanceCheck;
