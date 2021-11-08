import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import StoryLoadingEffect from "components/skeletons/Story";
import useStoryListStyles from "components/StoryList/style";
import React, { useEffect, useState } from "react";
import { IStory } from "../../models/story";
import Story from "../Story";

interface IProps {
  stories: IStory[];
}

const StoryList: React.FC<IProps> = (props) => {
  const [isExist, setIsExist] = useState<boolean>(false);

  const style = useStoryListStyles();

  useEffect(() => {
    setIsExist(props.stories.length > 0);
  }, [props.stories]);

  return (
    <Box>
      {isExist ? (
        props.stories.map((item) => {
          let date = new Date(item.createdAt);
          return (
            <Story
              key={item._id}
              _id={item._id}
              imageUrl={item.imageUrl}
              createdAt={date}
              content={item.content}
              isPrivate={item.isPrivate ?? false}
              owner={item.owner}
              likeById={item.likeById}
              dislikeById={item.dislikeById}
            />
          );
        })
      ) : (
        <Box className={style.defaultCard}>
          <Typography variant="bold4" color="#959595">
            Haven't posted anything
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StoryList;
