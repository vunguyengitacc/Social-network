import { makeStyles } from "@mui/styles";

const useCommentBoxStyles = makeStyles({
  surface: {
    width: "100%",
    minHeight: "50px",
    padding: "2.5%",
  },
  commentContainer: {
    maxHeight: "80vh",
    overflowY: "scroll",
    overflow: "hidden",
  },
});

export default useCommentBoxStyles;
