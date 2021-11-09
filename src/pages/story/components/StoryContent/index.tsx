import { Avatar, Box, Typography } from "@mui/material";
import CommentBox from "components/CommentBox";
import { IStory } from "models/story";
import React from "react";
import { useHistory } from "react-router";
import useStoryContentStyles from "./style";

interface IProps {
  value: IStory;
}
const StoryContent: React.FC<IProps> = (props) => {
  const { owner } = props.value;
  const history = useHistory();
  const style = useStoryContentStyles();
  return (
    <Box className={style.surface}>
      <Box className={style.userInfor}>
        <Avatar
          className={style.avatar}
          src={owner?.avatarUri}
          onClick={() => history.goBack()}
        />
        <Typography variant="bold6">{owner?.fullname}</Typography>
      </Box>
      <Box className={style.storyMsg}>
        <Typography>{props.value.content}</Typography>
      </Box>
      <CommentBox storyId={props.value._id} />
    </Box>
  );
};

export default StoryContent;
