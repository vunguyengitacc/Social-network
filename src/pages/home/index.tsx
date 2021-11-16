import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddImageDialog from "components/AddImageDialog";
import Header from "components/Header";
import { getStories } from "reduxSlice/storySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import homePageStyles from "./style";
import FriendList from "./components/FriendList";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "app/theme";
import StoryLoadingEffect from "components/skeletons/Story";
import StoryList from "components/StoryList";
import HotList from "./components/HotList";
import AddStoryForm from "components/AddStoryForm";
import useVisible from "hooks/useVisible";

const HomePage = () => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // eslint-disable-next-line
  const [seed, setSeed] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const style = homePageStyles(theme);
  const match = useMediaQuery(theme.breakpoints.up("md"));
  const contentEl = useRef<Element>(null);
  const inViewPort = useVisible(contentEl, "0px");

  useEffect(() => {
    if (inViewPort && seed > 0) {
      dispatch(getStories(seed));
      setSeed(seed + 1);
    }
    // eslint-disable-next-line
  }, [inViewPort]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await dispatch(getStories(seed));
      setSeed(seed + 1);
      setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />
      <Box>
        <Header />
      </Box>
      <Box className={style.surface}>
        {match && (
          <Box className={style.something}>
            <HotList />
          </Box>
        )}
        <Box className={style.storiesSurface}>
          <AddStoryForm />
          {isLoading ? <StoryLoadingEffect /> : <StoryList />}
          <Box color="transparent" component="div" ref={contentEl}>
            Load more
          </Box>
        </Box>
        {match && (
          <Box className={style.friendSurface}>
            <FriendList />
          </Box>
        )}
      </Box>
    </>
  );
};
export default HomePage;
