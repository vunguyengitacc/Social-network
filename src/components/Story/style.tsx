import { makeStyles, styled } from "@mui/styles";
import theme from "app/theme";

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
  },
  feelingBtn: {
    width: "50%",
    height: "50px",
  },
  privateIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center !important",
    marginLeft: "20px !important",
  },
  date: {
    display: "flex",
    lineHeight: "40px",
    backgroundImage: "linear-gradient(#89f7fe, #66a6ff)",
    fontWeight: "bolder",
    textAlign: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "20px",
    marginRight: "20px !important",
  },
  time: {
    display: "flex",
    lineHeight: "40px",
    backgroundImage: "linear-gradient(#D38312, #A83279)",
    fontWeight: "bolder",
    textAlign: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    borderRadius: "20px",
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
  [theme.breakpoints.down("md")]: {
    marginBottom: "30px",
  },
  [theme.breakpoints.up("md")]: {
    marginBottom: "50px",
  },
  boxShadow: "0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)",
}));

export default useStoryStyles;
