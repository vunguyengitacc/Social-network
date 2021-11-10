import { ImageList, ImageListItem, Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import useImageRenderStyles from "./style";

interface IProps {
  value: string[];
}

function srcset(
  image: string,
  size: number,
  rows = 1,
  cols = 1
): React.ImgHTMLAttributes<HTMLImageElement> {
  return {
    src: image,
    style: { height: `${cols * size}px`, width: `${rows * size}px` },
  };
}

const ImageRender: React.FC<IProps> = (props) => {
  const style = useImageRenderStyles();
  return (
    <>
      <ImageList sx={{ height: "auto" }} variant="quilted" cols={5}>
        {
          // eslint-disable-next-line
          props.value.map((item, idx) => {
            switch (true) {
              case props.value.length === 1:
                return (
                  <ImageListItem
                    sx={{ border: "1px solid #d1d1d1" }}
                    key={item}
                    cols={5}
                    rows={5}
                  >
                    <img {...srcset(item, 121, 5, 5)} alt="" loading="lazy" />
                  </ImageListItem>
                );
              case props.value.length > 1 && idx === 0:
                return (
                  <ImageListItem
                    sx={{ border: "1px solid #d1d1d1" }}
                    key={item}
                    cols={4}
                    rows={4}
                  >
                    <img {...srcset(item, 121, 4, 4)} alt="" loading="lazy" />
                  </ImageListItem>
                );

              case props.value.length > 1 &&
                props.value.length <= 5 &&
                idx <= 4 &&
                idx !== 0:
              case props.value.length > 5 && idx < 4 && idx !== 0:
                return (
                  <ImageListItem
                    sx={{ border: "1px solid #d1d1d1" }}
                    key={item}
                  >
                    <img {...srcset(item, 121)} alt="" loading="lazy" />
                  </ImageListItem>
                );
              case props.value.length > 5 && idx === 4:
                return (
                  <Button
                    key={item}
                    color="inherit"
                    sx={{
                      backgroundImage: `url(${props.value[4]})`,
                    }}
                    className={style.otherImage}
                  >
                    <AddCircleOutlineIcon />
                    <Typography>More</Typography>
                  </Button>
                );
            }
          })
        }
      </ImageList>
    </>
  );
};

export default ImageRender;
