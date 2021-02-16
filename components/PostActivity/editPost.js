import React, { useEffect, useState, useContext, createContext } from "react";
import { AuthContext } from "../../appState/AuthProvider";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { Router, Route, Switch } from "react-router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";

import CreateAct from "../../Image/create.png"
import ImageLogo from "../../Image/img.png"
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";

const EDITPOST = gql`
mutation EDITPOST(
    $postId: String!,
    $photo: String, 
    $name: String, 
    $dateStart: Date, 
    $dateEnd: Date, 
    $timeStart: String, 
    $timeEnd: String, 
    $place: String, 
    $participantsNumber: Number, 
    $dateCloseApply: Date, 
    $major: String, 
    $description: String
    )
{
    editPost(input:{
        postId: $postId,
        photo: $photo, 
        name: $name, 
        dateStart: $dateStart, 
        dateEnd: $dateEnd , 
        timeStart: $timeStart ,
        timeEnd: $timeEnd, 
        place: $place, 
        participantsNumber: $participantsNumber, 
        dateCloseApply: $dateCloseApply, 
        major: $major, 
        description: $description })
    {
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
    }
  }
`;


const EditPost = () => {
    // const [major, setMajor] = useState(null);
    // const [status, setStatus] = useState(null)
    // const [radio, setRadio] = useState(null);
    // const [NumofPerson, setNumofPerson] = useState(null);

    const route = useRouter();
    console.log(route);
    const postId = route.query.activityId;
    const { data, loading, error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                // console.log("JOIN", data.getOnePost.canJoin);
                console.log(data.getOnePost.name);
                // userInfo()
                //Router.push("/activity");
            }
        },
    });

    console.log("postId", postId);

    // if (error) return <p>Something went wrong, please try again.</p>;

    if (loading) return <p>Loading ...</p>;


    const [userInfo, setUserInfo] = useState({
        photo: "",
        name: data.getOnePost.name,
        dateStart: "2020-12-10",
        dateEnd: "2020-12-20",
        timeStart: "12:00",
        timeEnd: "18:00",
        place: data.getOnePost.place,
        participantsNumber: data.getOnePost.participantsNumber,
        dateCloseApply: "2020-12-01",
        major: "",
        description: data.getOnePost.description,
    });

    const handleChange = e => {
        console.log("Value", e.target.value)
        setUserInfo({
            ...userInfo,

            [e.target.name]: e.target.value
        })
    }



    const [EditPost] = useMutation(EDITPOST, {
        variables: { postId, ...userInfo},
        //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
        onCompleted: (data2) => {
            if (data2) {
                console.log(data2);
                setUserInfo({
                    photo: "",
                    name: "",
                    dateStart: "",
                    dateEnd: "",
                    timeStart: "",
                    timeEnd: "",
                    place: "",
                    participantsNumber: "",
                    dateCloseApply: "",
                    major: "",
                    description: "",
                });
                // Router.push("/main")
            }
            console.log("on complete")
            console.log(userInfo)
        },
        
    })


    const handleSubmit = async e => {
        console.log(userInfo)
        console.log("handle submit")
        try {
            console.log("Doneeeeeeeeeee1")
            e.preventDefault();
            console.log("Doneeeeeeeeeee2")
            await EditPost();
            console.log("Doneeeeeeeeeee3")
            console.log(userInfo)
        } catch (error) {
            console.log(error);
        }
    };
    // const handleSubmit = async () => {
    //     console.log("handle submit")
    //     await editpost()
    // };


    return (
        <div className="Post-Page" >
            <form className="Post-Page" onSubmit={handleSubmit}>

                {/* <h3>{data.getOnePost.name}</h3>
                <h3>{data.getOnePost.name}</h3>
                <h3>{data.getOnePost.name}</h3>
                <h3>{data.getOnePost.name}</h3>
                <h3>{data.getOnePost.name}</h3> */}
                <input type="text" name="name" className="Post-Input-Fill-Data" placeholder="" value={userInfo.name} />
                <input type="text" name="name" className="Post-Input-Fill-Data" placeholder="" value={userInfo.name} onChange={handleChange} />
                <input type="date" name="dateStart" className="Post-Input-Fill-Data" placeholder="" value={userInfo.dateStart} />
                <input type="date" name="dateEnd" className="Post-Input-Fill-Data" placeholder="" value={userInfo.dateEnd} />
                <input type="text" name="place" className="Post-Input-Fill-Data" placeholder="" value={userInfo.place} onChange={handleChange} />
                <input type="text" name="participantsNumber" className="Post-Input-Fill-Data" placeholder="" value={userInfo.participantsNumber} onChange={handleChange} />
                <input type="text" name="description" className="Post-Input-Fill-Data" placeholder="" value={userInfo.description} onChange={handleChange} />
                <h2>{data.getOnePost.timeStart}</h2>
                <h2>{data.getOnePost.timeEnd}</h2>
                <div className="Post-Left-Button">
                    <button type="submit" name="button" className="Post-Submit-Button">บันทึก</button>
                </div>
            </form>

        </div>
    );
};

export default EditPost;
