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
      boxShadow: "0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)",
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
