import { Avatar, Box, Typography } from "@mui/material";
import { IComment } from "models/comment";
import React from "react";
import useCommentStyles from "./style";

interface IProps {
  value: IComment;
}

const Comment: React.FC<IProps> = (props) => {
  const { value } = props;
  const style = useCommentStyles();
  return (
    <Box className={style.surface}>
      <Avatar src={value.owner.avatarUri} />
      <Typography className={style.content}>{value.content}</Typography>
    </Box>
  );
};

export default Comment;
