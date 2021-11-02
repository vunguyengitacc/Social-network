import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const userProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      [theme.breakpoints.down("sm")]: {
        margin: "3vh 0 0 0",
      },
      [theme.breakpoints.up("sm")]: {
        margin: "3vh 10vw 0 10vw",
        width: "80vw",
      },
      padding: "10px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      borderRadius: "5px",
      boxShadow:
        "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
    },
  })
);

export default userProfileStyles;
