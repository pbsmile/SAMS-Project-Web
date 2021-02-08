import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import apolloClient from "../../apollo/apolloclient";

export const QUERY_USERPROFILE = gql`
  query {
    getOneUser {
      name
      email
      studentId
      major
      phoneNumber
    }
  }
`;

const ProfileCard = () => {
  const { data, loading, error } = useQuery(QUERY_USERPROFILE);
  if (error)
    return <p>Ooobs...something went wrong, please try again later.</p>;
  if (loading) return <p>Loading...</p>;
  console.log(data.getOneUser);

  return (
    <div className="Profile-Card-Div">
      <div className="Profile-Card-Div-Topic">
        <p className="Profile-Card-Topic">ชื่อ นามสกุล</p>
        <p className="Profile-Card-Topic">อีเมล</p>
        <p className="Profile-Card-Topic">รหัสศึกษา</p>
        <p className="Profile-Card-Topic">คณะ/วิทยาลัย</p>
        <p className="Profile-Card-Topic">เบอร์โทรศัพท์</p>
      </div>

      <div className="Profile-Card-Div-Space">
        <p className="Profile-Card-Space">:</p>
        <p className="Profile-Card-Space">:</p>
        <p className="Profile-Card-Space">:</p>
        <p className="Profile-Card-Space">:</p>
        <p className="Profile-Card-Space">:</p>
      </div>

      <div className="Profile-Card-Div-Details">
        <p className="Profile-Card-Name">{data.getOneUser.name}</p>
        <p className="Profile-Card-Email">{data.getOneUser.email}</p>
        <p className="Profile-Card-Code">{data.getOneUser.studentId}</p>
        <p className="Profile-Card-Department">{data.getOneUser.major}</p>
        <p className="Profile-Card-Phonenumber">
          {data.getOneUser.phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
