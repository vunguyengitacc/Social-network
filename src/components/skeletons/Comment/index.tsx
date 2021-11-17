import React from "react";
import CommentSkeleton from "./item";

interface IProps {
  amount: number;
}

const CommentLoadingEffect: React.FC<IProps> = ({ amount }) => {
  return (
    <>
      {[...Array(amount)].map((i, id) => (
        <CommentSkeleton key={id} />
      ))}
    </>
  );
};

export default CommentLoadingEffect;
