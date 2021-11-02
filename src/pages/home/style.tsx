import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const homePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      marginTop: "60px",
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
      },
      [theme.breakpoints.up("sm")]: {
        width: "80vw",
        marginLeft: "10vw",
      },
    },
    storiesSurface: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "60%",
      },
    },
  })
);

export default homePageStyles;
