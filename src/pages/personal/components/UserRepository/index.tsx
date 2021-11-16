import { Box, Grid, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { initialUser, IUser } from "models/user";
import { AppDispatch, RootState } from "app/store";
import userApi from "api/userApi";
import AddImageDialog from "components/AddImageDialog";
import { getMyStories, getStoriesByUserId } from "reduxSlice/storySlice";
import userRepositoryStyles from "./style";
import theme from "app/theme";
import Sidebar from "../Sidebar";
import StoryLoadingEffect from "components/skeletons/Story";
import StoryList from "components/StoryList";
import AddStoryForm from "components/AddStoryForm";
import useVisible from "hooks/useVisible";

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
  const me = useSelector((state: RootState) => state.auth.currentUser) as IUser;
  const { user } = useParams<IStoryPageParams>();
  const dispatch = useDispatch<AppDispatch>();
  const style = userRepositoryStyles(theme);
  const match = useMediaQuery(theme.breakpoints.up("sm"));
  const contentEl = useRef<Element>(null);
  const inViewPort = useVisible(contentEl, "0px");

  useEffect(() => {
    if (inViewPort && seed > 0) {
      if (user === "me") {
        dispatch(getMyStories(seed));
      } else {
        dispatch(getStoriesByUserId({ id: user, seed }));
      }
      setSeed(seed + 1);
    }
    // eslint-disable-next-line
  }, [inViewPort]);

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
        if (response.data.user?._id === me._id) history.push("/personal/me");
        setIsMe(false);
        await dispatch(getStoriesByUserId({ id: user }));
      }
      await setIsLoading(false);
      setSeed(seed + 1);
    })();
    // eslint-disable-next-line
  }, [user]);

  return (
    <Box>
      {isMe && <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />}
      <Box display="flex" className={style.surface}>
        <Grid
          container={match}
          spacing={match === true ? 4 : undefined}
          sx={{ width: "100vw" }}
        >
          <Grid paddingTop="3vh" item className={style.grid} sm={12} lg={4}>
            <Sidebar userInfor={userInfor} />
          </Grid>
          <Grid paddingTop="3vh" item className={style.grid} lg={8} sm={12}>
            <Box>
              {isMe && <AddStoryForm />}
              {isLoading === true ? (
                <StoryLoadingEffect amount={3} />
              ) : (
                <StoryList />
              )}
              <Box color="transparent" ref={contentEl}>
                <StoryLoadingEffect amount={1} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserRepository;
