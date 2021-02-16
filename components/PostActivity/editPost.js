import React, { useEffect, useState, useContext, createContext } from "react";
import { AuthContext } from "../../appState/AuthProvider";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";

import CreateAct from "../../Image/create.png"
import ImageLogo from "../../Image/img.png"
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";

// const EDITPOST = gql`
// mutation EDITPOST(
//     $postId: String!,
//     $photo: String, 
//     $name: String!, 
//     $dateStart: Date!, 
//     $dateEnd: Date!, 
//     $timeStart: String!, 
//     $timeEnd: String!, 
//     $place: String!, 
//     $participantsNumber: Number!, 
//     $dateCloseApply: Date!, 
//     $major: String!, 
//     $description: String
//     )
// {
//     editPost(input:{
//         postId: $postId,
//         photo: $photo, 
//         name: $name, 
//         dateStart: $dateStart, 
//         dateEnd: $dateEnd , 
//         timeStart: $timeStart ,
//         timeEnd: $timeEnd, 
//         place: $place, 
//         participantsNumber: $participantsNumber, 
//         dateCloseApply: $dateCloseApply, 
//         major: $major, 
//         description: $description })
//     {
//         name
//     }
// }
// `;

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
            major
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
    const { user, signout } = useContext(AuthContext);
    const { data,loading,error } = useQuery(QUERY_ACTIVITY, {
        variables: { postId },
        onCompleted: (data) => {
            if (data) {
                console.log("JOIN", data.getOnePost.canJoin);
                console.log(data.getOnePost);
                //Router.push("/activity");
            }
        },
    });

    console.log("postId", postId);

    // if (error) return <p>Something went wrong, please try again.</p>;

    if (loading) return <p>Loading ...</p>;


    // const [userInfo, setUserInfo] = useState({
    //     photo: "",
    //     name: data.getOnePost.name,
    //     dateStart: "2020-12-10",
    //     dateEnd: "2020-12-11",
    //     timeStart: "12:00",
    //     timeEnd: "18:00",
    //     place: data.getOnePost.place,
    //     participantsNumber: data.getOnePost.participantsNumber,
    //     dateCloseApply: "2020-12-01T23:59",
    //     major: "",
    //     description: data.getOnePost.description,
    // });

    // const [editpost] = useMutation(EDITPOST, {
    //     variables: { postId },
    //     //เมื่อสำเร็จแล้วจะส่ง data เอามาใช้ได้
    //     onCompleted: (data2) => {
    //         if (data2) {
    //             console.log(data2);
    //             setUserInfo({
    //                 photo: "",
    //                 name: "",
    //                 dateStart: "",
    //                 dateEnd: "",
    //                 timeStart: "",
    //                 timeEnd: "",
    //                 place: "",
    //                 participantsNumber: "",
    //                 dateCloseApply: "",
    //                 major: "",
    //                 description: "",
    //             });
    //             Router.push("/activity")
    //         }
    //     },
    // })

    // const handleSubmit = async () => {
    //     console.log("handle submit")
    //     await editpost()
    // };

   
    return (
        <div className="Post-Page" >
            {/* <form className="Post-Page" onSubmit={handleSubmit}> */}

                <input type="text" name="name" className="Post-Input-Fill-Data" placeholder="" />
                <input type="text" name="name" className="Post-Input-Fill-Data" placeholder="" />
                <input type="text" name="dateStart" className="Post-Input-Fill-Data" placeholder="" />
                <input type="text" name="dateEnd" className="Post-Input-Fill-Data" placeholder="" />
                <input type="text" name="place" className="Post-Input-Fill-Data" placeholder="" />
                <input type="text" name="participantsNumber" className="Post-Input-Fill-Data" placeholder="" />
                <input type="text" name="description:" className="Post-Input-Fill-Data" placeholder="" />

            {/* </form> */}
            
        </div>
    );
};

export default EditPost;
