import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddImageDialog from "../../components/AddImageDialog/AddImageDialog";
import Header from "../../components/Header/Header";
import StoryList from "../../components/StoriesList/StoryList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getStories, storiesSelector } from "../../reduxSlice/storySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import homePageStyle from "./style";

const HomePage = () => {
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);

  const stories = useSelector(storiesSelector.selectAll);
  const dispatch = useDispatch<AppDispatch>();
  const style = homePageStyle();

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
        <Box sx={{ width: "60%" }}>
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
        <Box sx={{ width: "40%" }}>Friend</Box>
      </Box>
    </>
  );
};
export default HomePage;
