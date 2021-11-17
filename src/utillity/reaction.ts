import Like from "images/gifs/like.gif";
import Haha from "images/gifs/haha.gif";
import Love from "images/gifs/love.gif";
import Angry from "images/gifs/angry.gif";
import StaticLike from "images/static/like.png";
import StaticHaha from "images/static/haha.png";
import StaticLove from "images/static/love.png";
import StaticAngry from "images/static/angry.png";
import StaticNone from "images/static/none.png";

const reactionUtilType = {
  LIKE: {
    value: 1,
    url: Like,
    static: StaticLike,
    text: "Like",
    color: "#558dff",
  },
  HAHA: {
    value: 2,
    url: Haha,
    static: StaticHaha,
    text: "Haha",
    color: "#ffda6a",
  },
  LOVE: {
    value: 3,
    url: Love,
    static: StaticLove,
    text: "Love",
    color: "#f55065",
  },
  ANGRY: {
    value: 4,
    url: Angry,
    static: StaticAngry,
    text: "Angry",
    color: "#f56266",
  },
  NONE: {
    value: 0,
    url: "",
    static: StaticNone,
    text: "Like",
    color: "gray",
  },
};

export const getReactionByValue = (type: number): string => {
  let result = "none";
  switch (type) {
    case reactionUtilType.LIKE.value:
      result = reactionUtilType.LIKE.url;
      break;
    case reactionUtilType.LOVE.value:
      result = reactionUtilType.LOVE.url;
      break;
    case reactionUtilType.HAHA.value:
      result = reactionUtilType.HAHA.url;
      break;
    case reactionUtilType.ANGRY.value:
      result = reactionUtilType.ANGRY.url;
      break;
    default:
      result = reactionUtilType.NONE.url;
      break;
  }
  return result;
};

export const getTextByValue = (type: number): string => {
  let result = "none";
  switch (type) {
    case reactionUtilType.LIKE.value:
      result = reactionUtilType.LIKE.text;
      break;
    case reactionUtilType.LOVE.value:
      result = reactionUtilType.LOVE.text;
      break;
    case reactionUtilType.HAHA.value:
      result = reactionUtilType.HAHA.text;
      break;
    case reactionUtilType.ANGRY.value:
      result = reactionUtilType.ANGRY.text;
      break;
    default:
      result = reactionUtilType.NONE.text;
      break;
  }
  return result;
};

export const getStaticByValue = (type: number): string => {
  let result = "none";
  switch (type) {
    case reactionUtilType.LIKE.value:
      result = reactionUtilType.LIKE.static;
      break;
    case reactionUtilType.LOVE.value:
      result = reactionUtilType.LOVE.static;
      break;
    case reactionUtilType.HAHA.value:
      result = reactionUtilType.HAHA.static;
      break;
    case reactionUtilType.ANGRY.value:
      result = reactionUtilType.ANGRY.static;
      break;
    default:
      result = reactionUtilType.NONE.static;
      break;
  }
  return result;
};

export const getTextColorByValue = (type: number): string => {
  let result = "none";
  switch (type) {
    case reactionUtilType.LIKE.value:
      result = reactionUtilType.LIKE.color;
      break;
    case reactionUtilType.LOVE.value:
      result = reactionUtilType.LOVE.color;
      break;
    case reactionUtilType.HAHA.value:
      result = reactionUtilType.HAHA.color;
      break;
    case reactionUtilType.ANGRY.value:
      result = reactionUtilType.ANGRY.color;
      break;
    default:
      result = reactionUtilType.NONE.color;
      break;
  }
  return result;
};

export default reactionUtilType;
