import { Skeleton, Stack } from "@mui/material";
import React from "react";

const UserItemSkeleton = () => {
  return (
    <Stack direction="row" alignItems="center" gap="10px" padding="10px">
      <Skeleton variant="circular" width={30} height={30} />
      <Skeleton variant="text" width="-webkit-fill-available" height={50} />
    </Stack>
  );
};

export default UserItemSkeleton;
