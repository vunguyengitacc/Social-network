import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const homePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      marginTop: "60px",
      display: "flex",
      [theme.breakpoints.down("sm")]: {},
      [theme.breakpoints.up("sm")]: {
        padding: "0 40px 0 40px",
      },
    },
    something: {
      width: "20%",
    },
    storiesSurface: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
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
