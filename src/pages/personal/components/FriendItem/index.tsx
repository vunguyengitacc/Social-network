import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { IUser } from "../../../../models/user";
import FriendItemStyle from "./style";
import { useHistory } from "react-router";

interface IProps {
  value: IUser;
}

const FriendItem: React.FC<IProps> = ({ value }) => {
  const style = FriendItemStyle();
  const history = useHistory();
  return (
    <Box
      className={style.box}
      component="div"
      onClick={() => history.push(`/personal/${value._id}`)}
    >
      <Box className={style.avatarField}>
        <Avatar className={style.avatar} src={value.avatarUri} />
      </Box>

      <Typography className={style.name}>{value.fullname}</Typography>
    </Box>
  );
};

export default FriendItem;
