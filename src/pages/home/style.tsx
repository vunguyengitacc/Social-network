import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const homePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      marginTop: "60px",
      display: "flex",
      [theme.breakpoints.down("md")]: {},
      [theme.breakpoints.up("md")]: {
        padding: "0 40px 0 40px",
      },
    },
    something: {
      width: "20%",
    },
    storiesSurface: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "56%",
        margin: "0 2% 0 2%",
      },
    },
    friendSurface: {
      width: "20%",
    },
  })
);

export default homePageStyles;
