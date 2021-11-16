import { TabList } from "@mui/lab";
import { Theme } from "@mui/material";
import { createStyles, makeStyles, withStyles } from "@mui/styles";

const personalPageStyle = makeStyles((theme: Theme) => {
  return createStyles({
    userHeaderSurface: {
      minHeight: "60vh",
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
      width: "300px",
      marginLeft: "calc(50vw - 150px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      width: "150px !important",
      height: "150px !important",
      zIndex: 1,
      cursor: "pointer",
      "&:hover ": {
        maskImage:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6))",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6))",
      },
    },
    btnChangeBackground: {
      marginLeft: "80% !important",
      marginTop: "-220px !important",
      width: "300px !important",
    },
    taskSurface: {
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80vw",
    },
  });
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
