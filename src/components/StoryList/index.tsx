import Box from "@mui/material/Box";
import { socketClient } from "app/socket";
import { AppDispatch, RootState } from "app/store";
// import useStoryListStyles from "components/StoryList/style";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeStoryFromState,
  storiesSelector,
  updateStory,
} from "reduxSlice/storySlice";
import Story from "../Story";

const StoryList: React.FC = (props) => {
  const stories = useSelector(storiesSelector.selectAll);
  const me = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  // const style = useStoryListStyles();

  useEffect(() => {
    socketClient.on("story/reaction", (data) => {
      if (data.userId !== me._id) dispatch(updateStory(data.story));
    });
    socketClient.on("story/delete", (data) => {
      dispatch(removeStoryFromState(data.storyId));
    });
  });

  return (
    <Box>
      {stories.map((item) => {
        let date = new Date(item.createdAt);
        return (
          <Story
            key={item._id}
            _id={item._id}
            imageUrl={item.imageUrl}
            createdAt={date}
            content={item.content}
            isPrivate={item.isPrivate ?? false}
            owner={item.owner}
            includeImage={item.includeImage}
          />
        );
      })}
    </Box>
  );
};

export default StoryList;
