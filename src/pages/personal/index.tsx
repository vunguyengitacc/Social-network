import { Avatar, Box, Divider, Paper, Typography, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import userApi from "../../api/userApi";
import { AppDispatch, RootState } from "../../app/store";
import AddImageDialog from "../../components/AddImageDialog/AddImageDialog";
import Header from "../../components/Header/Header";
import { IUser } from "../../models/user";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { addFriend, getMe, removeFriend } from "../../reduxSlice/authSlice";
import personalPageStyle, { StyledListTab } from "./style";
import UserFriends from "./components/UserFriends";
import UserProfile from "./components/UserProfile";
import UserRepository, { IStoryPageParams } from "./components/UserRepository";

const PersonalPage = () => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>();
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch<AppDispatch>();
  const style = personalPageStyle();

  const history = useHistory();
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
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
  }, [user, me, history]);

  useEffect(() => {
    setIsFriend(
      [...(me.friendId ?? [])].filter((i) => i === userInfor?._id).length > 0
    );
    setIsRequest(
      [...(me.friendWaitingId ?? [])].filter((i) => i === userInfor?._id)
        .length > 0
    );
  }, [userInfor, me]);

  const toggleFriend = () => {
    if (userInfor === undefined) return;

    if (isFriend || isRequest) dispatch(removeFriend(userInfor?._id));
    else if (!isFriend && !isRequest) dispatch(addFriend(userInfor._id));
    dispatch(getMe());
  };

  return (
    <React.Fragment>
      <TabContext value={value}>
        {isMe && <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />}
        <Header />
        <Paper className={style.userHeaderSurface}>
          <Box height="50vh">
            <img
              className={style.image}
              src={userInfor?.backgroundUrl}
              alt=""
            />
            <Box className={style.avatarSurface}>
              <Avatar
                className={style.avatar}
                src={userInfor?.avatarUri}
                component="div"
                onClick={() => alert("Change")}
              />
              <Typography variant="bold6" className={style.fullname}>
                {userInfor?.fullname}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ width: "80vw" }} variant="middle" />
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          <Box className={style.taskSurface}>
            <StyledListTab onChange={handleChange} aria-label="">
              <Tab label="Stories" value="1" />
              <Tab label="Friends" value="2" />
              {isMe && <Tab label="Profile" value="3" />}
            </StyledListTab>
            <Box>
              {!isMe &&
                !isRequest &&
                (isFriend === true ? (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={toggleFriend}
                    startIcon={<PersonRemoveAlt1Icon />}
                  >
                    Remove friend
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={toggleFriend}
                    startIcon={<PersonAddAlt1Icon />}
                  >
                    Add friend
                  </Button>
                ))}
              {!isMe &&
                isRequest &&
                (isFriend === false ? (
                  <Button
                    color="info"
                    variant="contained"
                    onClick={toggleFriend}
                    startIcon={<PersonRemoveAlt1Icon />}
                  >
                    Wating for accept
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={toggleFriend}
                    startIcon={<PersonAddAlt1Icon />}
                  >
                    Add friend
                  </Button>
                ))}
            </Box>
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
