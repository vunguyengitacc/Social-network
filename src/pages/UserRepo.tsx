import { Hidden, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import AddImageDialog from "../components/AddImageDialog/AddImageDialog";
import Sidebar from "../components/Sidebar/Sidebar";
import StoryList from "../components/StoriesList/StoryList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { IUser } from "../models/user";
import { useHistory, useParams } from "react-router";
import userApi from "../api/userApi";

export interface IStoryPageParams {
  user: string;
  option: string;
}

const UserRepository = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>();
  const history = useHistory();

  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const { user } = useParams<IStoryPageParams>();

  useEffect(() => {
    (async () => {
      if (user === "me") {
        setUserInfor(me);
        setIsMe(true);
      } else {
        const response = await userApi.getById(user);
        setUserInfor(response.data.user);
        if (response.data.user?._id === me._id)
          history.push("/personal/stories/me");
        setIsMe(false);
      }
    })();
  }, [user, me, history]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {isMe && <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />}
      <Hidden smDown>
        <Box
          sx={{
            width: "80vw",
            paddingLeft: "10vw",
            display: "flex",
          }}
        >
          <Box sx={{ width: "30%", paddingTop: "3vh" }}>
            <Sidebar userInfor={userInfor} />
          </Box>
          <Box sx={{ marginLeft: "5%", width: "65%", paddingTop: "3vh" }}>
            {isMe && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginBottom: "20px", height: "50px" }}
                startIcon={<AddCircleIcon />}
                onClick={() => setIsShowAdd(true)}
              >
                Upload Image
              </Button>
            )}
            <StoryList />
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default UserRepository;
