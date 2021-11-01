import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../app/store";
import { IStory } from "../../models/story";
import { IStoryPageParams } from "../../pages/personal/components/UserRepo";
import {
  getMyStories,
  getStoriesByUserId,
  storiesSelector,
} from "../../reduxSlice/storySlice";
import Story from "../Story/Story";

interface IProps {
  isMe: boolean;
  stories: IStory[];
}

const StoryList: React.FC<IProps> = (props) => {
  return (
    <Box>
      {props.stories.map((item) => {
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
            likeById={item.likeById}
            dislikeById={item.dislikeById}
          />
        );
      })}
    </Box>
  );
};

export default StoryList;
