import { Grid } from "@mui/material";
import storyApi from "api/storyApi";
import { IStory } from "models/story";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageSlider from "./components/ImageSlider";
import StoryContent from "./components/StoryContent";

interface IParams {
  storyId: string;
}

export default function StoryPage() {
  const { storyId } = useParams<IParams>();
  const [story, setStory] = useState<IStory>();
  useEffect(() => {
    (async () => {
      const { data } = await storyApi.getById(storyId);
      setStory(data.story);
      console.log(data);
    })();
  }, [storyId]);
  return story ? (
    <Grid container sx={{ width: "100vw", overflow: "hidden" }}>
      <Grid item xs={12} md={9}>
        <ImageSlider value={story} />
      </Grid>
      <Grid item xs={12} md={3}>
        <StoryContent value={story} />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
