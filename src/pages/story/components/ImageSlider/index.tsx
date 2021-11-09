import { Box, Button } from "@mui/material";
import { IStory } from "models/story";
import React, { useLayoutEffect, useState } from "react";
import useImageSliderStyles from "./style";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import logo from "images/Logo.png";
import { useHistory } from "react-router";

interface IProps {
  value: IStory;
}

const ImageSlider: React.FC<IProps> = (props) => {
  const [index, setIndex] = useState<number>(0);
  const history = useHistory();

  const style = useImageSliderStyles();

  const setNextPicture = () => {
    console.log(index + 1);
    setIndex(index + 1);
  };

  const setBackPicture = () => {
    setIndex(index - 1);
  };

  useLayoutEffect(() => {
    if (index < 0) setIndex(props.value.imageUrl.length - 1);
    if (index >= props.value.imageUrl.length) setIndex(0);
    // eslint-disable-next-line
  }, [index]);

  return (
    <Box>
      <Box className={style.taskBar}>
        <Button className={style.back} onClick={() => history.push("/home")}>
          <ArrowBackIosIcon />
          <img className={style.logo} height={60} alt="" src={logo} />
        </Button>
      </Box>
      <Box className={style.imageSurface}>
        <Button className={style.button} onClick={setBackPicture}>
          <ArrowBackIosIcon />
        </Button>
        <img alt="" src={props.value.imageUrl[index]} />
        <Button className={style.button} onClick={setNextPicture}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ImageSlider;
