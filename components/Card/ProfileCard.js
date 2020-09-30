import React from 'react'
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
      <nav className="Profile-Card-Nav">
        <h1 className="Profile-Card-Nav-Popular">ประวัติส่วนตัว</h1>
      </nav>
      <Card className="Profile-Card">
        <CardActionArea className="Profile-Card-Area">
          <CardMedia
            className="Profile-Card-Media"
            image=""
            title="Activity"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              60010549
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              เนตรชนก ปิยะพันธุ์
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              วิศวกรรมศาสตร์
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
    )
}

export default ProfileCard
