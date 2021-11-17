import React from "react";
import StorySkeleton from "./Item";

interface IProps {
  amount: number;
}

const StoryLoadingEffect: React.FC<IProps> = ({ amount }) => {
  return (
    <>
      {[...Array(amount)].map((item, index) => (
        <StorySkeleton key={index} />
      ))}
    </>
  );
};
export default StoryLoadingEffect;
