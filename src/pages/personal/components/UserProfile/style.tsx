import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

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
      boxShadow: "0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)",
    },
    saveField: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
  })
);

export default userProfileStyles;
