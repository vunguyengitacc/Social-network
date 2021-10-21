import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { getMyStories, storiesSelector } from "../../reduxSlice/storySlice";
import Story from "../Story/Story";

const StoryList = () => {
  const stories = useSelector(storiesSelector.selectAll);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMyStories());
  }, [dispatch]);

  return (
    <Box>
      {stories.map((item) => {
        let date = new Date(item.createdAt);
        return (
          <Story
            key={item._id}
            imageUrl={item.imageUrl}
            createdAt={date}
            content={item.content}
          />
        );
      })}
    </Box>
  );
};

export default StoryList;
