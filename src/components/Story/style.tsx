import { makeStyles, styled } from "@mui/styles";
import { Box } from "@mui/material";

export const Puller = styled(Box)({
  width: 30,
  height: 6,
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  backgroundColor: "#c9c5c5",
});

const useStoryStyles = makeStyles({
  taskBtn: {
    float: "right",
  },
  titleField: {
    marginLeft: "2.5%",
    marginRight: "2.5%",
    paddingTop: "20px",
    display: "flex",
    height: "40px",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  imageSurface: {
    width: "100%  ",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgb(239 233 233)",
  },
  image: {
    maxWidth: "100%",
    minWidth: "50%",
  },
  groupTask: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  feelingBtn: {
    width: "33%",
    height: "50px",
    justifyContent: "flex-start !important",
    gap: "10px",
  },
  commentBtn: {
    width: "33%",
    height: "50px",
    gap: "10px",
  },
  privateIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center !important",
    marginLeft: "20px !important",
  },
  avatar: {
    marginRight: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuSurface: {
    display: "flex",
    flexDirection: "column",
    minWidth: "200px",
  },
});

export const Wrapper = styled("div")(({ theme: Theme }) => ({
  backgroundColor: "white",
  minHeight: "100px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 1px 2px rgb(0,0,0, 0.2)",
  border: "1px solid #e8e8e8",
}));

export default useStoryStyles;
