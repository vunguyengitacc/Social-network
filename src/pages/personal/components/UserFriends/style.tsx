import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const userFriendsStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      [theme.breakpoints.up("sm")]: {
        width: "80vw",
        margin: "3vh 10vw 0 10vw",
      },
      [theme.breakpoints.down("sm")]: {
        margin: "3vh 0 0 0",
      },
      boxShadow:
        "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
      padding: " 10px",
      backgroundColor: "white",
      borderRadius: "5px",
    },
    title: {
      margin: "10px",
    },
  })
);

export default userFriendsStyle;
