import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../app/store";
import { IStoryPageParams } from "../../pages/UserRepo";
import {
  getMyStories,
  getStoriesByUserId,
  storiesSelector,
} from "../../reduxSlice/storySlice";
import Story from "../Story/Story";

interface IProps {
  isMe: boolean;
}

const StoryList: React.FC<IProps> = (props) => {
  const stories = useSelector(storiesSelector.selectAll);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useParams<IStoryPageParams>();

  useEffect(() => {
    if (user && user !== "me") dispatch(getStoriesByUserId(user));
    else dispatch(getMyStories());
  }, [dispatch, user]);

  useEffect(() => {
    console.log(stories);
  }, [stories]);

  return (
    <Box>
      {stories.map((item) => {
        let date = new Date(item.createdAt);
        return (
          <Story
            key={item._id}
            _id={item._id}
            isMe={props.isMe}
            imageUrl={item.imageUrl}
            createdAt={date}
            content={item.content}
            isPrivate={item.isPrivate ?? false}
            owner={item.owner}
          />
        );
      })}
    </Box>
  );
};

export default StoryList;
