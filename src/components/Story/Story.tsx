import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#F1EDED",
  minHeight: "100px",
  borderRadius: "10px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "30px",
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: "50px",
  },
  boxShadow:
    "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
}));

const useStyle = makeStyles({
  taskBtn: {
    float: "right",
  },
  titleField: {
    marginLeft: "2.5%",
    marginRight: "2.5%",
    paddingTop: "20px",
  },
  image: {
    maxWidth: "100%",
    minWidth: "50%",
  },
  groupTask: {
    marginTop: "20px",
  },
  feelingBtn: {
    width: "50%",
    height: "50px",
  },
});

const Story = () => {
  const style = useStyle();

  return (
    <Wrapper>
      <Box>
        <Box>
          <Box
            className={style.titleField}
            sx={{
              display: "flex",
              height: "40px",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                lineHeight: "40px",
                backgroundImage: "linear-gradient(#89f7fe, #66a6ff)",
                fontWeight: "bolder",
                textAlign: "center",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "20px",
              }}
            >
              12/2/2021
            </Typography>
            <IconButton className={style.taskBtn}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="Internet error"
              className={style.image}
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            ></img>
          </Box>
          <Box className={style.groupTask}>
            <Button className={style.feelingBtn}>
              <ThumbUpAltIcon />
            </Button>
            <Button className={style.feelingBtn}>
              <ThumbDownAltIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Story;
