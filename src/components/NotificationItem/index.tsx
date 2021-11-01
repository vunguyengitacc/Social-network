import { Avatar, Button, Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import userApi from "../../api/userApi";
import { AppDispatch } from "../../app/store";
import { INotification } from "../../models/notification";
import { getMe } from "../../reduxSlice/authSlice";

interface IProps {
  notification: INotification;
}

const NotificationItem: React.FC<IProps> = ({ notification }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeny = async () => {
    await userApi.denyRequest(notification.from._id);
    dispatch(getMe());
  };

  const handleAccept = async () => {
    await userApi.acceptRequest(notification.from._id);
    dispatch(getMe());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ marginRight: "20px" }}>
        <Avatar
          sx={{ width: "50px", height: "50px" }}
          src={notification.from.avatarUri}
        />
      </Box>
      <Box>
        <Box>
          <Typography variant="bold3">{notification.from.fullname}</Typography>
          <Typography variant="body1">{notification.message} to you</Typography>
        </Box>
        <Box>
          <Button onClick={handleAccept}>Accept</Button>
          <Button color="error" onClick={handleDeny}>
            Deny
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationItem;
