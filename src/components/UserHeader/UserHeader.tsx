import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { IUser } from "../../models/user";
import { IStoryPageParams } from "../../pages/personal/components/UserRepo";

interface IProps {
  userInfor: IUser | undefined;
  isMe: boolean;
}

const UserHeader: React.FC<IProps> = ({ userInfor, isMe }) => {
  const { option, user } = useParams<IStoryPageParams>();
  const history = useHistory();
  const checkOption = (option: string, value: string) => {
    if (option === value) return "contained";
    else return "text";
  };

  return (
    <Paper
      sx={{
        height: "60vh",
        zIndex: 98,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "50vh",
        }}
      >
        <img
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%) !important",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%) !important",
            width: "80vw",
            height: "100%",
          }}
          src={userInfor?.backgroundUrl}
          alt=""
        />
        <Box
          sx={{
            position: "absolute",
            marginTop: "-230px",
            marginLeft: "calc(40vw - 75px)",
          }}
        >
          <Avatar
            sx={{
              width: "150px",
              height: "150px",
              zIndex: 1,
            }}
            src={userInfor?.avatarUri}
          />
          <Typography
            sx={{
              justifyContent: "center",
              height: "50px",
            }}
          >
            {userInfor?.fullname}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ width: "80vw" }} variant="middle" />
      <Box
        sx={{
          height: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "80vw",
        }}
      >
        <Button
          variant={`${checkOption(option, "stories")}`}
          sx={{ height: "5vh", marginRight: "20px" }}
          onClick={() => history.push(`/personal/stories/${user}`)}
        >
          Stories
        </Button>
        <Button
          variant={`${checkOption(option, "friends")}`}
          sx={{ height: "5vh", marginRight: "20px" }}
          onClick={() => history.push(`/personal/friends/${user}`)}
        >
          Friends
        </Button>
        {isMe && (
          <Button
            variant={`${checkOption(option, "profile")}`}
            sx={{ height: "5vh" }}
            onClick={() => history.push(`/personal/profile/me`)}
          >
            Edit profile
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default UserHeader;
