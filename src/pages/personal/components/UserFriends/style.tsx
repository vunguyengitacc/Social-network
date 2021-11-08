import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const userFriendsStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      [theme.breakpoints.up("sm")]: {
        width: "70vw",
        margin: "3vh 15vw 0 15vw",
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
  })
);

export default userFriendsStyle;
