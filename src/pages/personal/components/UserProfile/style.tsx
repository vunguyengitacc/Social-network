import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const userProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      [theme.breakpoints.down("sm")]: {
        margin: "3vh 0 3vh 0",
      },
      [theme.breakpoints.up("sm")]: {
        margin: "3vh 15vw 3vh 15vw",
        width: "70vw",
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

export default userProfileStyles;
