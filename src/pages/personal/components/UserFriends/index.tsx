import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { IUser } from "models/user";
import FriendItem from "../FriendItem";
import userFriendsStyle from "./style";
import theme from "app/theme";

interface IProps {
  userInfor?: IUser;
}

const UserFriends: React.FC<IProps> = (props) => {
  const style = userFriendsStyle(theme);

  useEffect(() => {}, [props.userInfor]);

  return (
    <Box className={style.surface}>
      <Box className={style.title}>
        <Typography variant="bold6">Friends</Typography>
      </Box>
      <Grid container spacing={1}>
        {props.userInfor?.friends?.map((item) => (
          <Grid key={item._id} item xs={12} sm={6}>
            <FriendItem value={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserFriends;
