import { Skeleton, Stack } from "@mui/material";
import React from "react";
import useStorySkeletonStyles from "./style";

export default function StorySkeleton() {
  const style = useStorySkeletonStyles();
  return (
    <Stack spacing={2} className={style.surface}>
      <Stack direction="row" spacing={2}>
        <Skeleton width={50} height={50} variant="circular" />
        <Skeleton width={50} variant="text" />
        <Skeleton width={50} variant="text" />
      </Stack>
      <Skeleton height={30} variant="text" />
      <Skeleton height={300} variant="rectangular" />
    </Stack>
  );
}
