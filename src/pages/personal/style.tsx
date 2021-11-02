import { TabList } from "@mui/lab";
import { makeStyles, withStyles } from "@mui/styles";

const personalPageStyle = makeStyles({
  userHeaderSurface: {
    height: "60vh",
    zIndex: 98,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    maskImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 30%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 30%, transparent 100%)",
    width: "80vw",
    height: "100%",
  },
  fullname: {
    justifyContent: "center !important",
    height: "50px",
  },
  avatarSurface: {
    position: "absolute",
    marginTop: "-230px",
    marginLeft: "calc(40vw - 75px)",
  },
  avatar: {
    width: "150px !important",
    height: "150px !important",
    zIndex: 1,
    cursor: "pointer",
  },
  taskSurface: {
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80vw",
  },
});

export const StyledListTab = withStyles({
  indicator: {
    backgroundColor: "#1876f2",
    opacity: ".6",
    color: "red",
    width: "100%",
    borderRadius: "10px",
  },
  "& .Mui-selected": {
    color: "black",
  },
})(TabList);

export default personalPageStyle;
