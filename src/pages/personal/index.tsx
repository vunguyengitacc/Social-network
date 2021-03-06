import {
  Avatar,
  Box,
  Divider,
  Paper,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import userApi from "api/userApi";
import { AppDispatch, RootState } from "app/store";
import Header from "components/Header";
import { IUser } from "models/user";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import {
  addFriend,
  removeFriend,
  updateAvatar,
  updateBackground,
} from "reduxSlice/authSlice";
import personalPageStyle, { StyledListTab } from "./style";
import UserFriends from "./components/UserFriends";
import UserProfile from "./components/UserProfile";
import UserRepository, { IStoryPageParams } from "./components/UserRepository";
import toast from "react-hot-toast";
import { unwrapResult } from "@reduxjs/toolkit";
import theme from "app/theme";

const PersonalPage = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>();
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch<AppDispatch>();
  const style = personalPageStyle(theme);
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();
  const me = useSelector((state: RootState) => state.auth.currentUser);
  const { user } = useParams<IStoryPageParams>();
  const [isFriend, setIsFriend] = useState<boolean>(
    [...(me.friendId ?? [])].filter((i) => i === userInfor?._id).length > 0
  );

  const [isRequest, setIsRequest] = useState<boolean>(
    [...(me.friendWaitingId ?? [])].filter((i) => i === userInfor?._id).length >
      0
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      if (user === "me") {
        setUserInfor(me);
        setIsMe(true);
      } else if (user !== undefined) {
        const response = await userApi.getById(user);
        setUserInfor(response.data.user);
        if (response.data.user?._id === me._id) history.push("/personal/me");
        else setIsMe(false);
      }
    })();
    // eslint-disable-next-line
  }, [user, me]);

  useEffect(() => {
    setIsFriend(
      [...(me.friendId ?? [])].filter((i) => i === userInfor?._id).length > 0
    );
    setIsRequest(
      [...(me.friendWaitingId ?? [])].filter((i) => i === userInfor?._id)
        .length > 0
    );
  }, [me, userInfor]);

  const toggleFriend = async () => {
    if (userInfor === undefined) return;
    if (isFriend || isRequest) dispatch(removeFriend(userInfor?._id));
    else if (!isFriend && !isRequest) dispatch(addFriend(userInfor._id));
  };

  const changeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.currentTarget.files?.item(0);
    const toastId = toast.loading("Loading");
    try {
      await dispatch(updateAvatar(file)).then(unwrapResult);

      toast.success("Success", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  const changeBackground = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.currentTarget.files?.item(0);
    const toastId = toast.loading("Loading");
    try {
      await dispatch(updateBackground(file)).then(unwrapResult);
      toast.success("Success", { id: toastId });
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <React.Fragment>
      <TabContext value={value}>
        <Header />
        <Paper className={style.userHeaderSurface}>
          <Box height="50vh" width="100%">
            <img
              className={style.image}
              src={userInfor?.backgroundUrl}
              alt=""
            />
            <Box className={style.avatarSurface}>
              <input
                onChange={changeAvatar}
                type="file"
                style={{ display: "none" }}
                id="avatarFile"
              />
              <Avatar
                className={style.avatar}
                src={userInfor?.avatarUri}
                component="label"
                htmlFor={`${isMe && "avatarFile"}`}
              />
              <Typography variant="bold6" className={style.fullname}>
                {userInfor?.fullname}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ width: "80vw" }} variant="middle" />
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          <Box
            className={style.taskSurface}
            flexDirection={matchMd ? "row" : "column-reverse"}
            marginTop={matchMd ? "0" : "50px"}
            gap="20px"
          >
            <StyledListTab onChange={handleChange} aria-label="">
              <Tab
                label={<Typography variant="bold4">Stories</Typography>}
                value="1"
              />
              <Tab
                label={<Typography variant="bold4">Friends</Typography>}
                value="2"
              />
              {isMe && (
                <Tab
                  label={<Typography variant="bold4">Profiles</Typography>}
                  value="3"
                />
              )}
            </StyledListTab>
            {!isMe && (
              <Box>
                {!isRequest && isFriend && (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={toggleFriend}
                    startIcon={<PersonRemoveAlt1Icon />}
                  >
                    Remove friend
                  </Button>
                )}
                {isRequest && !isFriend && (
                  <Button
                    color="info"
                    variant="contained"
                    onClick={toggleFriend}
                    startIcon={<PersonRemoveAlt1Icon />}
                  >
                    Waiting for accept
                  </Button>
                )}
                {!isRequest && !isFriend && (
                  <Button
                    variant="contained"
                    onClick={toggleFriend}
                    startIcon={<PersonAddAlt1Icon />}
                  >
                    Add friend
                  </Button>
                )}
              </Box>
            )}
            {isMe && (
              <>
                <Button variant="contained">
                  <label htmlFor="backgroundFile">Change Background</label>
                </Button>
                <input
                  onChange={changeBackground}
                  type="file"
                  style={{ display: "none" }}
                  id="backgroundFile"
                />
              </>
            )}
          </Box>
        </Paper>
        <TabPanel sx={{ padding: "0" }} value="1">
          <UserRepository />
        </TabPanel>
        <TabPanel sx={{ padding: "0" }} value="2">
          <UserFriends userInfor={userInfor} />
        </TabPanel>
        {isMe && (
          <TabPanel sx={{ padding: "0" }} value="3">
            <UserProfile />
          </TabPanel>
        )}
      </TabContext>
    </React.Fragment>
  );
};

export default PersonalPage;
