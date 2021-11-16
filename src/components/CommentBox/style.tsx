import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useCommentBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    surface: {
      minHeight: "50px",
      padding: "2.5%",
      [theme.breakpoints.down("md")]: {
        width: "95%",
      },
    },
    commentContainer: {
      maxHeight: "80vh",
      overflowY: "scroll",
      overflow: "hidden",
    },
  })
);

export default useCommentBoxStyles;
