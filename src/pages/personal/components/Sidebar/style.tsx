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
      border: "1px solid rgb(232, 232, 232)",
      padding: " 10px",
      backgroundColor: "white",
    },
  })
);
export default sidebarStyle;
