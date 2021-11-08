import React from "react";
import StorySkeleton from "./Item";

export default function StoryLoadingEffect() {
  return (
    <>
      <StorySkeleton />
      <StorySkeleton />
      <StorySkeleton />
    </>
  );
}
