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
      boxShadow:
        "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
      padding: " 10px",
      backgroundColor: "white",
    },
  })
);
export default sidebarStyle;
