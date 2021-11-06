import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useAuthBasicStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      height: "100vh",
      overflow: "hidden",
      display: "flex",
    },
    itemSurface: {
      [theme.breakpoints.up("md")]: {
        width: "50vw",
      },
      [theme.breakpoints.down("md")]: {
        width: "100vw",
      },
    },
    authForm: {
      marginTop: "15vh",
      [theme.breakpoints.up("md")]: {
        width: "80%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      minHeight: "50px",
      borderRadius: "20px",
      backgroundColor: "#F1EDED",
      boxShadow: "0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)",
    },
    formTitle: {
      paddingTop: "30px",
      paddingBottom: "30px",
      justifyContent: "center !important",
    },
    switchField: {
      height: "50px",
      width: "100%",
      display: "flex",
    },
    fullWidthButton: {
      width: "100%",
    },
  })
);

export default useAuthBasicStyles;
