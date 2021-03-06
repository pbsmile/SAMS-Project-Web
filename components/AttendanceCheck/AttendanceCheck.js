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

    const [value, setValue] = useState([]);
    const [v_id, setVId] = useState();
    const [show, setShow] = useState([]);
    const [showW, setShowW] = useState([]);

    const [btnGreen, setbtnGreen] = useState(
        {
            datac: [
                //         // {
                //         //     name: '',
                //         //     id: '',
                //         //     data: ''
                //         // }
            ]
        }
    );
    console.log(btnGreen)
    const [btnRed, setbtnRed] = useState({
        color: 'danger',
        data: ''
    });

    // const [active, setActive] = useState(true);
    const [word, setWord] = useState("")

    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log("data1 : " + data.getOnePost.joinUsers[0].name)
                console.log("data2 : " + data.getOnePost.joinUsers[0])
                console.log(data.getOnePost.joinUsers.length)
                for (var i = 0; i < data.getOnePost.joinUsers.length; i++) {
                    btnGreen.datac.push(
                        // {
                        // datac: [
                        {
                            name: data.getOnePost.joinUsers[i].name,
                            id: data.getOnePost.joinUsers[i]._id,
                            btnactive: true
                        },
                        // {
                        //     name: data.getOnePost.joinUsers[i].name,
                        //     id: data.getOnePost.joinUsers[i+1]._id,
                        //     data: ''
                        // },
                        //     ]
                        // }
                    )
                    show[i] = true
                }
                // for (var i=1; i<data.getOnePost.joinUsers.length; i++) {
                //     btnGreen.datac.push({
                //         name: data.getOnePost.joinUsers[i].name,
                //             id: data.getOnePost.joinUsers[i]._id,
                //             data: ''
                //     })
                // }

                console.log('btnG     :   ' + btnGreen.datac[0].name)
                console.log(show)
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

    const handleChange = (val) => {
        console.log(val)
        setValue(val);
        console.log(val)
        console.log(btnGreen.datac[v_id].btnactive)
        // setbtnGreen({
        //     datac: {
        //         btnactive : !btnactive
        //     }
        // })
        btnGreen.datac[v_id].btnactive = !btnGreen.datac[v_id].btnactive
        // setbtnGreen.datac[v_id]({btnactive : !btnactive})
        console.log(btnGreen.datac[v_id].btnactive)
        show[v_id] = btnGreen.datac[v_id].btnactive
        if (show[v_id] == true){

        }
        console.log(show)
        // console.log('btnGreen' + active)
        // console.log('btnGreen C ' + word)
        console.log('-----------------------------------')
        console.log("กด : " + btnGreen.datac[v_id].name)
        // console.log("กด : "+btnGreen.datac[0].datac[0].name)
    }

    const handleClick = () => {
        // const id = parseInt(e.target.getAttribute("data-id"));
        // console.log(id)
        // console.log("กด : "+btnGreen.datac[0].datac[0].name)
        console.log('-----------------------------------')
        // console.log("กด : "+btnGreen.datac[1].datac[0].name)


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
                    {prod.name} {prod._id} {id}

                    {/* <Button variant={btnGreen.color} onClick={handleRedClick(prod._id)}>เข้าร่วม</Button>{' '} */}
                    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                        <ToggleButton variant="outline-success" value={id} onClick={e => { setVId(id) }}>{show[id] == false ? "เช็คชื่อแล้ว" : "เช็คชื่อ"}</ToggleButton>
                    </ToggleButtonGroup>
                    {/* <Button variant={btnGreen.color} key={prod.name} name={prod.name} value={prod.name} onClick={handleRedClick}>Success</Button>{' '} */}
                    {/* {btnGreen.datac[id].btnactive == true ? "success" : "outline-seccess"} */}
                    {/* {btnGreen.true ? "success" : "outline-seccess"} */}
                </div>
            ))}
            {/* {data.getOnePost.joinUsers[0].name} */}
        </div>
    );
};

export default AttendanceCheck;
