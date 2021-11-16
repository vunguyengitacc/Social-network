import { Skeleton, Stack } from "@mui/material";
import React from "react";
import useStorySkeletonStyles from "./style";

export default function StorySkeleton() {
  const style = useStorySkeletonStyles();
  return (
    <Stack spacing={2} className={style.surface}>
      <Stack direction="row" spacing={2}>
        <Skeleton width={50} height={50} variant="circular" />
        <Stack direction="column">
          <Skeleton width={200} height={30} variant="text" />
          <Skeleton width={200} height={20} variant="text" />
        </Stack>
      </Stack>
      <Skeleton height={30} variant="text" />
      <Skeleton height={300} variant="rectangular" />
    </Stack>
  );
}
