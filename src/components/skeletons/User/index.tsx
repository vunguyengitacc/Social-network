import { Box } from "@mui/material";
import React from "react";
import UserItemSkeleton from "./item";

interface IProps {
  amount: number;
}

const UserSkeleton: React.FC<IProps> = ({ amount }) => {
  return (
    <Box>
      {[...Array(amount)].map((i, id) => (
        <UserItemSkeleton key={id} />
      ))}
    </Box>
  );
};

export default UserSkeleton;
