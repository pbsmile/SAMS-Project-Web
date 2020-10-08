import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ProfileCard = () => {
  return (
    <div className="Profile-Card-Div">
      <p className="Profile-Card-Code">60010549</p>
      <p className="Profile-Card-Name">เนตรชนก ปิยะพันธุ์</p>
      <p className="Profile-Card-Department">วิศวกรรมศาสตร์</p>
    </div>
  );
};

export default ProfileCard;
