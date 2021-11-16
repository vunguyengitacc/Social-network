import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const userRepositoryStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      [theme.breakpoints.up("sm")]: {
        width: "80vw",
        margin: "3vh 10vw 0 10vw",
      },
      [theme.breakpoints.down("sm")]: {},

      marginTop: "3vh",
    },
    grid: {
      width: "100%",
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.down("sm")]: {
        padding: " 0 0 3vh 0 !important",
      },
    },
  })
);

export default userRepositoryStyles;
