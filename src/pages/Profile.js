import React from "react";
import Card from "@mui/material/Card";
import { useAuth } from "../context/AuthContextProvider";
import { CardContent, Typography, Paper, Grid } from "@mui/material";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile-mainDiv">
      <Grid container>
        <Paper className="profile-paper">
          <Card className="profileRoot">
            <img
              style={{
                "border-radius": "50%",
                margin: "0 auto",
                width: "50%",
                padding: "10px",
              }}
              src={currentUser.photoURL}
              alt={"profile"}
            />
            <CardContent>
              <Typography
                className="profile-title"
                color={"secondary"}
                gutterBottom
              >
                Display Name
              </Typography>
              <Typography variant="h5" component="h2">
                {currentUser?.displayName || "Not found"}
              </Typography>
              <Typography
                className="profile-email"
                color={"secondary"}
                gutterBottom
              >
                Email
              </Typography>
              <Typography variant="body2" component="p">
                {currentUser?.email || "Not found"}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </div>
  );
};

export default Profile;
