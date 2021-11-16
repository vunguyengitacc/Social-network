import { Box, Typography } from "@mui/material";
import commentApi from "api/commentApi";
import { socketClient } from "app/socket";
import theme from "app/theme";
import Comment from "components/Comment";
import SendCommentForm from "components/SendCommentForm";
import CommentLoadingEffect from "components/skeletons/Comment";
import { IComment } from "models/comment";
import React, { useEffect, useState } from "react";
import useCommentBoxStyles from "./style";

interface IProps {
  storyId: string;
}

const CommentBox: React.FC<IProps> = (props) => {
  const [comments, setComments] = useState<IComment[]>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const style = useCommentBoxStyles(theme);

  const fetchComment = async () => {
    const { data } = await commentApi.getByStoryId(props.storyId);
    setComments(data.comments);
  };

  useEffect(() => {
    setIsloading(true);
    fetchComment().then(() => setIsloading(false));
    // eslint-disable-next-line
  }, [props.storyId]);

  useEffect(() => {
    socketClient.on("comment/add", (data) => {
      let comment = data.comment as IComment;
      if (props.storyId === comment.storyId)
        setComments([...(comments ?? []), comment]);
    });
    socketClient.on("comment/delete", (data) => {
      let cmts = comments?.filter((i) => i._id !== data.commentId);
      setComments(cmts);
    });
  });

  return (
    <Box className={style.surface}>
      {isLoading ? (
        <CommentLoadingEffect />
      ) : (
        <Box className={style.commentContainer}>
          <Typography variant="bold4">{comments?.length} comments</Typography>
          {comments?.map((item) => (
            <Comment key={item._id} value={item} />
          ))}
        </Box>
      )}
      <SendCommentForm reload={fetchComment} storyId={props.storyId} />
    </Box>
  );
};

export default CommentBox;
