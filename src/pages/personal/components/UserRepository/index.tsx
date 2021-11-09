import { Box, Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { initialUser, IUser } from "models/user";
import { AppDispatch, RootState } from "app/store";
import userApi from "api/userApi";
import AddImageDialog from "components/AddImageDialog";
import {
  getMyStories,
  getStoriesByUserId,
  storiesSelector,
} from "reduxSlice/storySlice";
import userRepositoryStyles from "./style";
import theme from "app/theme";
import Sidebar from "../Sidebar";
import StoryLoadingEffect from "components/skeletons/Story";
import StoryList from "components/StoryList";
import AddStoryForm from "components/AddStoryForm";

export interface IStoryPageParams {
  user: string;
  option: string;
}

const UserRepository = () => {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [userInfor, setUserInfor] = useState<IUser>(initialUser);
  // eslint-disable-next-line
  const [seed, setSeed] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const history = useHistory();

  const stories = useSelector(storiesSelector.selectAll);
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const { user } = useParams<IStoryPageParams>();
  const dispatch = useDispatch<AppDispatch>();
  const style = userRepositoryStyles(theme);
  const match = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    (async () => {
      await setIsLoading(true);
      if (user === "me") {
        setUserInfor(me);
        setIsMe(true);
        await dispatch(getMyStories(seed));
      } else {
        const response = await userApi.getById(user);
        setUserInfor(response.data.user);
        if (response.data.user?._id === me._id)
          history.push("/personal/stories/me");
        setIsMe(false);
        await dispatch(getStoriesByUserId(user));
      }
      await setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, [user, me, history, dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {isMe && <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />}
      <Box className={style.surface}>
        <Grid container={match} spacing={match === true ? 4 : undefined}>
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
              {isMe && <AddStoryForm />}
              {isLoading === true ? (
                <StoryLoadingEffect />
              ) : (
                <StoryList stories={stories} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserRepository;
