import { Box } from "@mui/material";
import React from "react";
import { IUser } from "../../../models/user";

interface IProps {
  userInfor: IUser;
}

const UserItem: React.FC<IProps> = ({ userInfor }) => {
  return (
    <Box>
      <img src={userInfor.avatarUri} alt="failed" />
    </Box>
  );
};

export default UserItem;
