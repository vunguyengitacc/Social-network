import { Button, Stack } from "@mui/material";
import Like from "images/gifs/like.gif";
import Haha from "images/gifs/haha.gif";
import Angry from "images/gifs/angry.gif";
import Love from "images/gifs/love.gif";
import React from "react";
import reactionApi from "api/reactionApi";

interface IProps {
  storyId: string;
}

const Reaction: React.FC<IProps> = ({ storyId }) => {
  const handleReact = (type: number) => {
    reactionApi.reactToStory({ storyId, type });
  };

  return (
    <Stack direction="row">
      <Button onClick={() => handleReact(1)}>
        <img width="50px" src={Like} alt="" />
      </Button>
      <Button onClick={() => handleReact(2)}>
        <img width="50px" src={Haha} alt="" />
      </Button>
      <Button onClick={() => handleReact(3)}>
        <img width="50px" src={Love} alt="" />
      </Button>
      <Button onClick={() => handleReact(4)}>
        <img width="50px" src={Angry} alt="" />
      </Button>
    </Stack>
  );
};

export default Reaction;
