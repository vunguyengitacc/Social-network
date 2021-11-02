import { Hidden, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { initialUser, IUser } from "../../../models/user";
import { AppDispatch, RootState } from "../../../app/store";
import userApi from "../../../api/userApi";
import AddImageDialog from "../../../components/AddImageDialog/AddImageDialog";
import StoryList from "../../../components/StoriesList/StoryList";
import Sidebar from "./Sidebar";
import {
  getMyStories,
  getStoriesByUserId,
  storiesSelector,
} from "../../../reduxSlice/storySlice";

export interface IStoryPageParams {
  user: string;
  option: string;
}

const UserRepository = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>(initialUser);
  const history = useHistory();

  const stories = useSelector(storiesSelector.selectAll);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const { user } = useParams<IStoryPageParams>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      if (user === "me") {
        setUserInfor(me);
        setIsMe(true);
        dispatch(getMyStories());
      } else {
        const response = await userApi.getById(user);
        setUserInfor(response.data.user);
        if (response.data.user?._id === me._id)
          history.push("/personal/stories/me");
        setIsMe(false);
        dispatch(getStoriesByUserId(user));
      }
    })();
  }, [user, me, history, dispatch]);

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
            <StoryList stories={stories} isMe={isMe} />
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default UserRepository;
