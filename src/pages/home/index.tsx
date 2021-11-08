import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddImageDialog from "components/AddImageDialog";
import Header from "components/Header";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getStories, storiesSelector } from "reduxSlice/storySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import homePageStyles from "./style";
import FriendList from "./components/FriendList";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "app/theme";
import StoryLoadingEffect from "components/skeletons/Story";
import StoryList from "components/StoryList";
import HotList from "./components/HotList";

const HomePage = () => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [seed, setSeed] = useState<number>(0);
  const stories = useSelector(storiesSelector.selectAll);
  const dispatch = useDispatch<AppDispatch>();
  const style = homePageStyles(theme);
  const match = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(match);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await dispatch(getStories(seed));
      setIsLoading(false);
    })();
  }, [dispatch]);

  return (
    <>
      <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />
      <Box>
        <Header />
      </Box>
      <Box className={style.surface}>
        <Box className={style.something}>
          <HotList />
        </Box>
        <Box className={style.storiesSurface}>
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
          {isLoading ? <StoryLoadingEffect /> : <StoryList stories={stories} />}
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
