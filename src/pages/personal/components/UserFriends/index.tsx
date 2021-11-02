import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { IUser } from "models/user";
import FriendItem from "../FriendItem";
import userFriendsStyle from "./style";

interface IProps {
  userInfor?: IUser;
}

const UserFriends: React.FC<IProps> = (props) => {
  const style = userFriendsStyle();

  useEffect(() => {}, [props.userInfor]);

  return (
    <Box className={style.surface}>
      <Box className={style.title}>
        <Typography variant="bold6">Friends</Typography>
      </Box>
      <Grid container spacing={1}>
        {props.userInfor?.friends?.map((item) => (
          <Grid item xs={6}>
            <FriendItem key={item._id} value={item} />
          </Grid>
        ))}
        {props.userInfor?.friends?.map((item) => (
          <Grid item xs={6}>
            <FriendItem key={item._id} value={item} />
          </Grid>
        ))}
        {props.userInfor?.friends?.map((item) => (
          <Grid item xs={6}>
            <FriendItem key={item._id} value={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserFriends;
