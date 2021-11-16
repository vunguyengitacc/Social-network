import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { socketClient } from "app/socket";
import { AppDispatch, RootState } from "app/store";
import useStoryListStyles from "components/StoryList/style";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeStoryFromState,
  storiesSelector,
  updateStory,
} from "reduxSlice/storySlice";
import Story from "../Story";

const StoryList: React.FC = (props) => {
  const [isExist, setIsExist] = useState<boolean>(false);
  const stories = useSelector(storiesSelector.selectAll);
  const me = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const style = useStoryListStyles();

  useEffect(() => {
    setIsExist(stories.length > 0);
  }, [stories]);

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
      {isExist ? (
        stories.map((item) => {
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
              likeById={item.likeById}
              dislikeById={item.dislikeById}
            />
          );
        })
      ) : (
        <Box className={style.defaultCard}>
          <Typography variant="bold4" color="#959595">
            Haven't posted anything
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StoryList;
