import React from "react";
import CommentSkeleton from "./item";

export default function CommentLoadingEffect() {
  return (
    <>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </>
  );
}
