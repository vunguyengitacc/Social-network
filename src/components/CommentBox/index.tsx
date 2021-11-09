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

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const { data } = await commentApi.getByStoryId(props.storyId);
      setComments(data.comments);
      setIsloading(false);
    })();
  }, [props.storyId]);

  return (
    <Box className={style.surface}>
      {isLoading ? (
        <CommentLoadingEffect />
      ) : (
        <>
          <Typography>{comments?.length} comments</Typography>
          {comments?.map((item) => (
            <Comment value={item} />
          ))}
        </>
      )}

      <SendCommentForm storyId={props.storyId} />
    </Box>
  );
};

export default CommentBox;
