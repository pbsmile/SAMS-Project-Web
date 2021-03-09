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



const ATTENDANCECHECK = gql`
  mutation ATTENDANCECHECK($postId: String!,$checkedUsersId: [String!]){
    attendanceCheck(input:{
      postId:$postId,
      checkedUsersId:$checkedUsersId
    })
    {
      checkedUsers{
        name
      }
    }
  }
`;

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

    const [checkInfo, setcheckInfo] = useState({
        checkedUsersId: []
    })

    // const [active, setActive] = useState(true);
    const [word, setWord] = useState("")

    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log("data1 : " + data.getOnePost.joinUsers[0].name)
                console.log("data2 : " + data.getOnePost.joinUsers[0])
                console.log(data.getOnePost.joinUsers.length)
                var len_checked = data.getOnePost.checkedUsers.length
                var len_join = data.getOnePost.joinUsers.length
                console.log('len-c :' + len_checked)
                console.log('len-j :' + len_join)
                console.log(value)
                // for (const j in data.getOnePost.checkedUsers){
                //     console.log('jjj : '+j)
                // }
                console.log(showW)
                if (len_checked > 0) {
                    for (var i = 0; i < len_checked; i++) {
                        console.log('i' + i)
                        for (var j = 0; j < len_join; j++) {
                            console.log('เทียบ ' + data.getOnePost.checkedUsers[i]._id)
                            console.log('กับ ' + data.getOnePost.joinUsers[j]._id)

                            console.log(i + ' ' + j)
                            // if (data.getOnePost.joinUsers[i]._id in data.getOnePost.checkedUsersId._id) {
                            if (data.getOnePost.joinUsers[j]._id == data.getOnePost.checkedUsers[i]._id) {
                                console.log('เทียบ ' + data.getOnePost.checkedUsers[i]._id + ' กับ ' + data.getOnePost.joinUsers[j]._id)
                                btnGreen.datac.push(
                                    // {
                                    // datac: [
                                    {
                                        name: data.getOnePost.joinUsers[j].name,
                                        id: data.getOnePost.joinUsers[j]._id,
                                        btnactive: false
                                    },
                                    // {
                                    //     name: data.getOnePost.joinUsers[i].name,
                                    //     id: data.getOnePost.joinUsers[i+1]._id,
                                    //     data: ''
                                    // },
                                    //     ]
                                    // }
                                )
                                console.log('i: ' + j)
                                console.log('bf : ' + value)

                                value.push(j)
                                show[j] = false
                                //setShow[j](false)
                                // showW[j] = 'เช็คชื่อแล้ว'
                                console.log('sh :' + show[j])
                                // setValue(i)
                                console.log('af : ' + value)
                                // i =data.getOnePost.joinUsers.length-1
                                if (i + 1 < len_checked) {
                                    i += 1
                                }
                                // if (j + 1 < data.getOnePost.joinUsers.length-1) {
                                //     j += 1
                                // }
                                // checkInfo.checkedUsersId.push(data.getOnePost.joinUsers[i]._id)
                                // console.log('UserInfo Start : ' + checkInfo.checkedUsersId)
                                // value[i] = 1
                            }
                            else if (data.getOnePost.joinUsers[j]._id != data.getOnePost.checkedUsers[i]._id) {
                                btnGreen.datac.push(
                                    // {
                                    // datac: [
                                    {
                                        name: data.getOnePost.joinUsers[j].name,
                                        id: data.getOnePost.joinUsers[j]._id,
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
                                show[j] = true

                                console.log('sh :' + show[j])
                                // showW[j] = 'เช็คชื่อ'

                                // value[i] = 0
                            }

                            // }

                        }
                    }
                }
                else {
                    for (let i = 0; i < len_join; i++) {
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
                }
                //  setValue(showW)

                // for (var i=1; i<data.getOnePost.joinUsers.length; i++) {
                //     btnGreen.datac.push({
                //         name: data.getOnePost.joinUsers[i].name,
                //             id: data.getOnePost.joinUsers[i]._id,
                //             data: ''
                //     })
                // }

                // console.log('btnG     :   ' + btnGreen.datac[0].name)
                setShowW(show)
                // console.log(show)
                console.log(showW)

                console.log(value)
            }
        },
    });

    const [AttendanceCheck] = useMutation(ATTENDANCECHECK, {
        variables: { postId, ...checkInfo },
        onCompleted: (data) => {
            setcheckInfo({
                checkedUsersId: []
            })
            // Router.push('/activity/' + postId);
            console.log("on complete")
        }

    })

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
        // console.log(val)
        console.log('bf set val ' + val)
        setValue(val);
        console.log('val: ' + val)
        console.log(val)
        console.log('BFclick : ' + btnGreen.datac[v_id].btnactive)
        // setbtnGreen({
        //     datac: {
        //         btnactive : !btnactive
        //     }
        // })
        btnGreen.datac[v_id].btnactive = !btnGreen.datac[v_id].btnactive
        // if(btnGreen.datac[v_id].btnactive == true){
        //     console.log('change to false')
        //     btnGreen.datac[v_id].btnactive = false
        // }
        // else if(btnGreen.datac[v_id].btnactive == false){
        //     console.log('change to true')
        //     btnGreen.datac[v_id].btnactive = true
        // }
        // btnGreen.datac[v_id].btnactive = !btnGreen.datac[v_id].btnactive
        // setbtnGreen.datac[v_id]({btnactive : !btnactive})
        console.log('click : ' + btnGreen.datac[v_id].btnactive)
        showW[v_id] = btnGreen.datac[v_id].btnactive
        console.log(showW)
        // console.log(showW)
        // console.log('btnGreen' + active)
        // console.log('btnGreen C ' + word)
        console.log('-----------------------------------')
        console.log("กด : " + btnGreen.datac[v_id].name)
        // console.log("กด : "+btnGreen.datac[0].datac[0].name)
        // var len_checked = checkInfo.checkedUsersId.length;
        // checkInfo.checkedUsersId.push(btnGreen.datac[v_id].id)

        // checkInfo.checkedUsersId.push(btnGreen.datac[v_id].id)


        // for (i in len_checked){
        //     if(btnGreen.datac[v_id].id != checkInfo.checkedUsersId[i]){
        //         checkInfo.checkedUsersId.push(btnGreen.datac[v_id].id)
        //         len_checked+=1
        //     }
        //     else {
        //         console.log('else')
        //     }
        // }
        console.log("Info : " + checkInfo.checkedUsersId)
        // for (var i = 0; i <len_checked; i++){

        // }
        // if(btnGreen.datac[v_id].btnactive == false){
        //     showW[v_id] = 'เช็คชื่อแล้ว'
        // }
        // else{
        //     showW[v_id] = 'เช็คชื่อ'
        // }

    }

    const submitBtn = async e => {
        for (var i = 0; i < btnGreen.datac.length; i++) {
            if (showW[i] == false) {
                    checkInfo.checkedUsersId.push(btnGreen.datac[i].id)
                console.log(btnGreen.datac[i].id)
            }
            // console.log(i)
            // else if(show[i] == true){

            // }
        }
        // const id = parseInt(e.target.getAttribute("data-id"));
        // console.log(id)
        // console.log("กด : "+btnGreen.datac[0].datac[0].name)
        console.log('onsubmit ' + checkInfo.checkedUsersId)

        // if(show[0]==false){
        //     checkInfo.checkedUsersId.push(btnGreen.datac[v_id].id)
        // }
        // console.log("กด : "+btnGreen.datac[1].datac[0].name)

        await AttendanceCheck();
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
                    {prod.name} {show} {prod._id}  {id}

                    {/* <Button variant={btnGreen.color} onClick={handleRedClick(prod._id)}>เข้าร่วม</Button>{' '} */}
                    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                        <ToggleButton variant="outline-success" value={id} onClick={e => { setVId(id) }}>{showW[id] == false ? "เช็คชื่อแล้ว" : "เช็คชื่อ"}</ToggleButton>
                    </ToggleButtonGroup>

                    {/* <Button variant={btnGreen.color} key={prod.name} name={prod.name} value={prod.name} onClick={handleRedClick}>Success</Button>{' '} */}
                    {/* {btnGreen.datac[id].btnactive == true ? "success" : "outline-seccess"} */}
                    {/* {btnGreen.true ? "success" : "outline-seccess"} */}
                    {/* {show[id] == true ? "เช็คชื่อ" : "เช็คชื่อแล้ว"} */}
                </div>
            ))}
            <Button variant="danger" onClick={submitBtn}>บันทึก</Button>
            {/* {data.getOnePost.joinUsers[0].name} */}
        </div>
    );
};

export default AttendanceCheck;
