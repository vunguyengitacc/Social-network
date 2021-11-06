import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const sidebarStyle = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      position: "sticky",
      top: "80px",
      marginTop: "0",
      width: "100%",
    },
    contentSurface: {
      borderRadius: "5px",
      boxShadow: "0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)",
      padding: " 10px",
      backgroundColor: "white",
    },
  })
);
export default sidebarStyle;
