import { Button, Box, Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { initialUser, IUser } from "models/user";
import { AppDispatch, RootState } from "app/store";
import userApi from "api/userApi";
import AddImageDialog from "components/AddImageDialog";
import StoryList from "components/StoriesList/StoryList";
import {
  getMyStories,
  getStoriesByUserId,
  storiesSelector,
} from "reduxSlice/storySlice";
import userRepositoryStyles from "./style";
import theme from "app/theme";
import Sidebar from "../Sidebar";

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
  const style = userRepositoryStyles(theme);
  const match = useMediaQuery(theme.breakpoints.up("sm"));

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
      <Box className={style.surface}>
        <Grid container={match} spacing={match === true ? 12 : undefined}>
          <Grid
            item
            className={style.grid}
            sx={{ paddingTop: "3vh" }}
            sm={12}
            lg={4}
          >
            <Sidebar userInfor={userInfor} />
          </Grid>
          <Grid
            item
            className={style.grid}
            sx={{ paddingTop: "3vh" }}
            lg={8}
            sm={12}
          >
            <Box>
              {isMe && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginBottom: "20px", height: "50px" }}
                  fullWidth
                  startIcon={<AddCircleIcon />}
                  onClick={() => setIsShowAdd(true)}
                >
                  Upload Image
                </Button>
              )}
              <StoryList stories={stories} isMe={isMe} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserRepository;
