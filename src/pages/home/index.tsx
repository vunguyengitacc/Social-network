import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddImageDialog from "components/AddImageDialog";
import Header from "components/Header";
import StoryList from "components/StoriesList/StoryList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getStories, storiesSelector } from "reduxSlice/storySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import homePageStyles from "./style";
import FriendList from "./components/FriendList";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "app/theme";

const HomePage = () => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);

  const stories = useSelector(storiesSelector.selectAll);
  const dispatch = useDispatch<AppDispatch>();
  const style = homePageStyles(theme);
  const match = useMediaQuery(theme.breakpoints.up("sm"));
  console.log(match);

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    <>
      <AddImageDialog setOpen={setIsShowAdd} open={isShowAdd} />
      <Box>
        <Header />
      </Box>
      <Box className={style.surface}>
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
          <StoryList isMe={true} stories={stories} />
        </Box>
        {match && (
          <Box sx={{ width: "37%", marginLeft: "3%" }}>
            <FriendList />
          </Box>
        )}
      </Box>
    </>
  );
};
export default HomePage;
