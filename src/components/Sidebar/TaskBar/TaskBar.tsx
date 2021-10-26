import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { logout } from "../../../reduxSlice/authSlice";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { initialUser, IUser } from "../../../models/user";
import AddImageDialog from "../../AddImageDialog/AddImageDialog";
import GroupsIcon from "@mui/icons-material/Groups";

const Wrapper = styled("div")(({ theme }) => ({
  height: "100%",
}));

const useStyle = makeStyles({
  taskField: {
    backgroundColor: "#F1EDED",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  avatar: {
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    borderRadius: "20px",
    maxWidth: "80%",
  },
  taskBtn: {
    width: "100%",
    height: "50px",
    display: "flex !important",
    paddingLeft: "10% !important",
    justifyContent: "flex-start !important",
  },
});

interface IStoryPageParams {
  user: string;
}

const Taskbar = () => {
  const style = useStyle();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useParams<IStoryPageParams>();
  const me = useSelector((state: RootState) => state.auth.currentUser);
  const [userInfor, setUserInfor] = useState<IUser>(initialUser);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (user === "me") setUserInfor(me);
      else {
        console.log(user);
        const response = await userApi.getById(user);
        setUserInfor(response.data.user);
      }
    })();
  }, [user, me]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <Box className={style.taskField}>
        <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />
        <Box
          sx={{
            width: "90%",
            padding: "5%",
          }}
        >
          <img alt="" className={style.avatar} src={userInfor.avatarUri} />
        </Box>
        <Box>
          <Typography sx={{ paddingBottom: "30px" }} variant="h5">
            {userInfor.fullname}
          </Typography>
        </Box>
        {userInfor._id === me._id && (
          <Box>
            <Divider variant="middle" />
            <CopyToClipboard text={userInfor._id}>
              <Button
                className={style.taskBtn}
                variant="text"
                startIcon={<ContentCopyIcon />}
              >
                Get your ID
              </Button>
            </CopyToClipboard>
            <Button
              className={style.taskBtn}
              variant="text"
              color="warning"
              startIcon={<GroupsIcon />}
            >
              Friends
            </Button>
            <Button
              className={style.taskBtn}
              variant="text"
              startIcon={<FileUploadIcon />}
              color="success"
              onClick={() => setIsShowAdd(true)}
            >
              Upload image
            </Button>
            <Button
              className={style.taskBtn}
              variant="text"
              startIcon={<LogoutIcon />}
              color="error"
              onClick={logoutHandler}
            >
              Log out
            </Button>
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};

export default Taskbar;
