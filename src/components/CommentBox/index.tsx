import { Box, Typography } from "@mui/material";
import commentApi from "api/commentApi";
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
  const style = useCommentBoxStyles();

  const fetchComment = async () => {
    const { data } = await commentApi.getByStoryId(props.storyId);
    setComments(data.comments);
  };

  useEffect(() => {
    setIsloading(true);
    fetchComment().then(() => setIsloading(false));
    // eslint-disable-next-line
  }, [props.storyId]);

  return (
    <Box className={style.surface}>
      {isLoading ? (
        <CommentLoadingEffect />
      ) : (
        <Box className={style.commentContainer}>
          <Typography variant="bold4">{comments?.length} comments</Typography>
          {comments?.map((item) => (
            <Comment key={item._id} reload={fetchComment} value={item} />
          ))}
        </Box>
      )}

      <SendCommentForm reload={fetchComment} storyId={props.storyId} />
    </Box>
  );
};

export default CommentBox;
