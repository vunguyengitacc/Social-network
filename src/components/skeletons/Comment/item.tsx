import { Skeleton, Stack } from "@mui/material";
import React from "react";
import useCommentSkeletonStyles from "./style";

export default function CommentSkeleton() {
  const style = useCommentSkeletonStyles();
  return (
    <Stack spacing={2} direction="row" className={style.surface}>
      <Skeleton width={40} height={40} variant="circular" />
      <Skeleton
        className={style.content}
        width={500}
        height={60}
        variant="rectangular"
      />
    </Stack>
  );
}
