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
      border: "1px solid rgb(232, 232, 232)",
      padding: " 10px",
      backgroundColor: "white",
      borderRadius: "5px",
    },
    title: {
      margin: "10px",
    },
    defaultCard: {
      backgroundColor: "#e5e5e5",
      padding: "10px",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
  })
);

export default userFriendsStyle;
