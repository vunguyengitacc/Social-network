import { TabList } from "@mui/lab";
import { Theme } from "@mui/material";
import { createStyles, makeStyles, withStyles } from "@mui/styles";

const userProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      [theme.breakpoints.down("sm")]: {
        margin: "3vh 0 3vh 0",
      },
      [theme.breakpoints.up("sm")]: {
        margin: "3vh 10vw 3vh 10vw",
        width: "80vw",
      },
      padding: "10px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      borderRadius: "5px",
      border: "1px solid rgb(232, 232, 232)",
    },
    saveField: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
  })
);

export const StyledListTab = withStyles({
  indicator: {
    backgroundColor: "#e7f3ff",
    opacity: ".6",
    color: "red",
    width: "100%",
    borderRadius: "10px",
  },
  "& .Mui-selected": {
    color: "black",
  },
})(TabList);

export default userProfileStyles;
