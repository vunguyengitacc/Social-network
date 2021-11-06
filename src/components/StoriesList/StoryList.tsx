import Box from "@mui/material/Box";
import React from "react";
import { IStory } from "../../models/story";
import Story from "../Story";

interface IProps {
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
