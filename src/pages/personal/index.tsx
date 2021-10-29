import { Avatar, Box, Divider, Paper, Typography, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
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
import UserProfile from "./components/UserProfile";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import UserRepository, { IStoryPageParams } from "./components/UserRepo";
import { addFriend, removeFriend } from "../../reduxSlice/authSlice";

const PersonalPage = () => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>();
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const { user } = useParams<IStoryPageParams>();

  let isFriend =
    [...(me.friendId ?? [])].filter((i) => i === userInfor?._id).length > 0;

  let isRequest =
    [...(me.friendWaitingId ?? [])].filter((i) => i === userInfor?._id).length >
    0;

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
    console.log(isMe, isRequest, isFriend);
  }, [user, me, history]);

  const toggleFriend = () => {
    if (userInfor === undefined) return;

    if (isFriend || isRequest) dispatch(removeFriend(userInfor?._id));
    else if (!isFriend && !isRequest) dispatch(addFriend(userInfor._id));
  };

  return (
    <React.Fragment>
      <TabContext value={value}>
        {isMe && <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />}
        <Header />
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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          <Box
            sx={{
              height: "10vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80vw",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Stories" value="1" />
              <Tab label="Friends" value="2" />
              {isMe && <Tab label="Profile" value="3" />}
            </TabList>
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
        <TabPanel value="1">
          <UserRepository />
        </TabPanel>
        <TabPanel value="2">
          friend <span>{me.friendId.length}</span>
        </TabPanel>
        {isMe && (
          <TabPanel value="3">
            <UserProfile />
          </TabPanel>
        )}
      </TabContext>
    </React.Fragment>
  );
};

export default PersonalPage;
