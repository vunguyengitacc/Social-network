import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { IUser } from "../../../models/user";

interface IProps {
  userInfor?: IUser;
}

const UserFriend: React.FC<IProps> = (props) => {
  useEffect(() => {}, [props.userInfor]);
  return (
    <Box
      sx={{
        width: "80vw",
        margin: "3vh 10vw 0 10vw",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
        padding: " 10px",
        backgroundColor: "white",
        borderRadius: "5px",
      }}
    >
      <Box>
        <Typography variant="bold6">Friends</Typography>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default UserFriend;
