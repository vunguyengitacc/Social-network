import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { IUser } from "../../models/user";
import IconText from "../TextKeyValue/IconText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface IProps {
  userInfor: IUser | undefined;
}

const Sidebar: React.FC<IProps> = (props) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: "80px",
        marginTop: "0",
        height: "5vh",
      }}
    >
      <Box
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
          padding: " 10px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="bold6" sx={{ margin: "10px" }}>
          Profile Information
        </Typography>
        <Divider variant="middle" />
        <IconText
          startIcon={<AccountCircleIcon />}
          value={props.userInfor?.fullname}
        />
        <IconText
          startIcon={<AccountCircleIcon />}
          value={props.userInfor?.fullname}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
